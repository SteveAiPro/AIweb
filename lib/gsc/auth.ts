import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import https from "node:https";
import { HttpsProxyAgent } from "https-proxy-agent";

const ROOT = process.cwd();
const CREDENTIALS_PATH = join(ROOT, "credentials.json");
const TOKEN_PATH = join(ROOT, "data", "gsc-token.json");

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
const REDIRECT_URI = "http://localhost:8787";

// ---------- proxy support for CN networks ----------
function getProxyAgent(): HttpsProxyAgent<string> | undefined {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!proxy) return undefined;
  return new HttpsProxyAgent(proxy);
}

function gscRequest(
  url: string,
  method: string,
  headers: Record<string, string>,
  body?: string
): Promise<{ status: number; data: any; text: string }> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const agent = getProxyAgent();
    const req = https.request(
      {
        hostname: u.hostname,
        port: u.port || 443,
        path: u.pathname + u.search,
        method,
        headers: { ...headers, "Content-Length": body ? Buffer.byteLength(body).toString() : "0" },
        agent,
        timeout: 30000,
      },
      (res) => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          let data: any = null;
          try {
            data = JSON.parse(raw);
          } catch {}
          resolve({ status: res.statusCode ?? 0, data, text: raw });
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
    if (body) req.write(body);
    req.end();
  });
}

async function gscPost(
  url: string,
  body: string | URLSearchParams,
  extraHeaders?: Record<string, string>
): Promise<{ status: number; data: any; text: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...extraHeaders,
  };
  const bodyStr = body instanceof URLSearchParams ? body.toString() : body;
  return gscRequest(url, "POST", headers, bodyStr);
}

async function gscGet(
  url: string,
  extraHeaders?: Record<string, string>
): Promise<{ status: number; data: any; text: string }> {
  return gscRequest(url, "GET", extraHeaders ?? {});
}

export interface Credentials {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export interface Token {
  access_token: string;
  refresh_token?: string;
  expires_at?: number; // epoch ms
  token_type?: string;
  scope?: string;
}

export function loadCredentials(): Credentials {
  const raw = readFileSync(CREDENTIALS_PATH, "utf8");
  const parsed = JSON.parse(raw);
  const inst = parsed.installed ?? parsed.web ?? parsed;
  return {
    client_id: inst.client_id,
    client_secret: inst.client_secret,
    redirect_uri: inst.redirect_uris?.[0] ?? REDIRECT_URI,
  };
}

export function loadToken(): Token | null {
  if (!existsSync(TOKEN_PATH)) return null;
  try {
    return JSON.parse(readFileSync(TOKEN_PATH, "utf8")) as Token;
  } catch {
    return null;
  }
}

export function saveToken(token: Token): void {
  if (!existsSync(join(ROOT, "data"))) {
    mkdirSync(join(ROOT, "data"), { recursive: true });
  }
  writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2), "utf8");
}

export function buildAuthUrl(state = "state"): string {
  const c = loadCredentials();
  const params = new URLSearchParams({
    client_id: c.client_id,
    redirect_uri: c.redirect_uri,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<Token> {
  const c = loadCredentials();
  const res = await gscPost(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      client_id: c.client_id,
      client_secret: c.client_secret,
      code,
      grant_type: "authorization_code",
      redirect_uri: c.redirect_uri,
    })
  );
  if (!res.data || res.status >= 400) {
    throw new Error(`Token exchange failed: ${res.status} ${res.text}`);
  }
  const d = res.data as Omit<Token, "expires_at"> & { expires_in: number };
  return {
    access_token: d.access_token,
    refresh_token: d.refresh_token,
    token_type: d.token_type,
    scope: d.scope,
    expires_at: Date.now() + d.expires_in * 1000,
  };
}

export async function refreshAccessToken(token: Token): Promise<Token> {
  const c = loadCredentials();
  if (!token.refresh_token) throw new Error("No refresh_token available; re-run auth.");
  const res = await gscPost(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      client_id: c.client_id,
      client_secret: c.client_secret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    })
  );
  if (!res.data || res.status >= 400) {
    throw new Error(`Token refresh failed: ${res.status} ${res.text}`);
  }
  const d = res.data as { access_token: string; expires_in: number; token_type?: string };
  const next: Token = {
    ...token,
    access_token: d.access_token,
    expires_at: Date.now() + d.expires_in * 1000,
    token_type: d.token_type ?? token.token_type,
  };
  saveToken(next);
  return next;
}

// Returns a valid (refreshed if needed) token.
export async function getValidToken(): Promise<Token> {
  const token = loadToken();
  if (!token) {
    throw new Error(
      "No GSC token found. Run `node scripts/gsc-auth.mjs` to authorize first."
    );
  }
  if (!token.expires_at || token.expires_at - Date.now() < 60_000) {
    return refreshAccessToken(token);
  }
  return token;
}
