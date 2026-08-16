// One-time GSC OAuth authorization. Run: node scripts/gsc-auth.mjs
// Opens a local server on http://localhost to catch the OAuth callback,
// then saves the refresh_token to data/gsc-token.json.
import { createServer } from "node:http";
import { buildAuthUrl, exchangeCodeForToken, saveToken } from "../lib/gsc/auth.ts";

const PORT = 8787; // matches REDIRECT_URI in lib/gsc/auth.ts

const authUrl = buildAuthUrl();
console.log("\nOpen this URL in your browser and authorize:\n");
console.log(authUrl);
console.log("\nWaiting for the callback on http://localhost ...\n");

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname !== "/" && url.pathname !== "/oauth2callback") {
      res.writeHead(404).end();
      return;
    }
    const code = url.searchParams.get("code");
    const err = url.searchParams.get("error");
    if (err) {
      res.writeHead(400).end(`Authorization failed: ${err}`);
      server.close();
      return;
    }
    if (!code) {
      res.writeHead(400).end("Missing code parameter.");
      return;
    }
    const token = await exchangeCodeForToken(code);
    saveToken(token);
    res.writeHead(200).end("GSC authorization complete. You can close this tab.");
    console.log("\n✅ Token saved to data/gsc-token.json");
    console.log("refresh_token present:", Boolean(token.refresh_token));
    server.close();
    process.exit(0);
  } catch (e) {
    console.error("Auth error:", e);
    res.writeHead(500).end("Internal error");
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost (port ${PORT})`);
});
