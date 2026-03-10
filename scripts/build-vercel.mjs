/**
 * Custom Vercel build script.
 *
 * 1. Builds the frontend with Vite → dist/public/
 * 2. Bundles the API function with esbuild → single CJS file
 * 3. Assembles the .vercel/output/ directory (Build Output API v3)
 *
 * Uses CJS format with all dependencies inlined to avoid ESM issues.
 * A thin serverless wrapper ensures compatibility with Vercel's Node.js launcher.
 */

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync } from "node:fs";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

// Step 1: Build frontend
run("npx vite build");

// Step 2: Bundle API with esbuild (ALL deps inlined, CJS format)
const funcDir = ".vercel/output/functions/api.func";
mkdirSync(funcDir, { recursive: true });
run(
  "npx esbuild api/index.ts" +
    " --bundle" +
    " --platform=node" +
    " --format=cjs" +
    " --outfile=" + funcDir + "/index.js",
);

// Step 3: Write a serverless wrapper that adapts the Express app
// to a standard (req, res) serverless handler
writeFileSync(
  funcDir + "/handler.js",
  `const app = require('./index').default || require('./index');
module.exports = (req, res) => app(req, res);
`,
);

// Step 4: Function config — use raw Node.js with our wrapper as handler
writeFileSync(
  funcDir + "/.vc-config.json",
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "handler.js",
    launcherType: "Nodejs",
  }),
);

// Step 5: Copy static files
mkdirSync(".vercel/output/static", { recursive: true });
cpSync("dist/public", ".vercel/output/static", { recursive: true });

// Step 6: Output config with routing
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: "/api/(.*)", dest: "/api" },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" },
      ],
    },
    null,
    2,
  ),
);

console.log("✓ Vercel build output assembled");
