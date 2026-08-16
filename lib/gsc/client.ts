import { getValidToken } from "./auth.ts";
import https from "node:https";
import { HttpsProxyAgent } from "https-proxy-agent";

const HOST = "www.googleapis.com";
const SEARCHCONSOLE_HOST = "searchconsole.googleapis.com";
const WEBMASTERS_PREFIX = "/webmasters/v3";
const SEARCHCONSOLE_PREFIX = "/v1";

// ---------- proxy support for CN networks ----------
function getProxyAgent(): HttpsProxyAgent<string> | undefined {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!proxy) return undefined;
  return new HttpsProxyAgent(proxy);
}

interface GscResponse {
  status: number;
  data: any;
  text: string;
}

function gscRequest(
  prefix: string,
  path: string,
  method: string,
  headers: Record<string, string>,
  body?: string,
  host: string = HOST
): Promise<GscResponse> {
  return new Promise((resolve, reject) => {
    const agent = getProxyAgent();
    const req = https.request(
      {
        hostname: host,
        port: 443,
        path: `${prefix}${path}`,
        method,
        headers: {
          ...headers,
          ...(body ? { "Content-Length": Buffer.byteLength(body).toString() } : {}),
        },
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

async function authedFetch(
  prefix: string,
  path: string,
  method: string,
  body?: string,
  host: string = HOST
): Promise<any> {
  const token = await getValidToken();
  const res = await gscRequest(prefix, path, method, {
    Authorization: `Bearer ${token.access_token}`,
    "Content-Type": "application/json",
  }, body, host);
  if (res.status >= 400) {
    throw new Error(`GSC API error ${res.status}: ${res.text}`);
  }
  return res.data;
}

export interface SiteEntry {
  siteUrl: string;
  permissionLevel: string;
}

export interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsQuery {
  siteUrl: string;
  startDate: string;
  endDate: string;
  dimensions?: Array<"query" | "page" | "country" | "device" | "date">;
  dimensionFilterGroups?: unknown[];
  rowLimit?: number;
  startRow?: number;
}

export async function listSites(): Promise<SiteEntry[]> {
  const data = await authedFetch(WEBMASTERS_PREFIX, "/sites", "GET");
  return (data.siteEntry ?? []) as SiteEntry[];
}

export async function querySearchAnalytics(
  q: SearchAnalyticsQuery
): Promise<SearchAnalyticsRow[]> {
  const body = JSON.stringify({
    startDate: q.startDate,
    endDate: q.endDate,
    dimensions: q.dimensions ?? ["query"],
    dimensionFilterGroups: q.dimensionFilterGroups ?? [],
    rowLimit: q.rowLimit ?? 1000,
    startRow: q.startRow ?? 0,
  });
  const data = await authedFetch(
    WEBMASTERS_PREFIX,
    `/sites/${encodeURIComponent(q.siteUrl)}/searchAnalytics/query`,
    "POST",
    body
  );
  return (data.rows ?? []) as SearchAnalyticsRow[];
}

export interface SitemapEntry {
  path: string;
  lastSubmitted?: string;
  isPending?: boolean;
  lastDownloaded?: string;
  warnings?: number;
  errors?: number;
  contents?: Array<{ type: string; submitted: number; indexed: number }>;
}

export async function listSitemaps(siteUrl: string): Promise<SitemapEntry[]> {
  const data = await authedFetch(
    WEBMASTERS_PREFIX,
    `/sites/${encodeURIComponent(siteUrl)}/sitemaps`,
    "GET"
  );
  return (data.sitemap ?? []) as SitemapEntry[];
}

export async function getSitemap(
  siteUrl: string,
  feedpath: string
): Promise<SitemapEntry> {
  const data = await authedFetch(
    WEBMASTERS_PREFIX,
    `/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
    "GET"
  );
  return data as SitemapEntry;
}

// URL Inspection API (searchconsole v1)
export interface UrlInspectionResult {
  inspectionResultLink: string;
  indexingState?: string; // INDEXING_ALLOWED, BLOCKED_BY_HTTP_HEADER, etc.
  indexingStatus?: string; // indexing status reason
  pageFetchState?: string; // SUCCESSFUL, SOFT_404, NOT_FOUND, etc.
  pageFetchStatus?: string;
  crawledAs?: string; // DESKTOP, MOBILE
  googleCanonical?: string;
  userCanonical?: string;
  lastCrawlTime?: string;
  robotsTxtState?: string;
  coverageState?: string;
  sitemap?: string[];
  referringUrls?: string[];
  mobileUsability?: string;
  mobileUsabilityIssues?: unknown[];
  richResultsIssues?: unknown[];
}

export async function inspectUrl(
  siteUrl: string,
  inspectionUrl: string
): Promise<UrlInspectionResult> {
  const body = JSON.stringify({ siteUrl, inspectionUrl });
  const data = await authedFetch(
    SEARCHCONSOLE_PREFIX,
    "/urlInspection/index:inspect",
    "POST",
    body,
    SEARCHCONSOLE_HOST
  );
  return data.inspectionResult as UrlInspectionResult;
}
