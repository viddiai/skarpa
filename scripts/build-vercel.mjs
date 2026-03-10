/**
 * Custom Vercel build script.
 *
 * 1. Builds the frontend with Vite → dist/public/
 * 2. Bundles the API function with esbuild → single file
 * 3. Assembles the .vercel/output/ directory (Build Output API v3)
 *
 * This avoids Vercel's @vercel/node runtime recompiling our .ts files
 * without bundling, which breaks ESM extensionless imports.
 */

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync } from "node:fs";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

// Step 1: Build frontend
run("npx vite build");

// Step 2: Bundle API with esbuild (ALL deps inlined except node: builtins)
mkdirSync(".vercel/output/functions/api.func", { recursive: true });
run(
  "npx esbuild api/index.ts" +
    " --bundle" +
    " --platform=node" +
    " --format=cjs" +
    " --outfile=.vercel/output/functions/api.func/index.js",
);

// Step 3: Function config
writeFileSync(
  ".vercel/output/functions/api.func/.vc-config.json",
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.default",
    launcherType: "Nodejs",
  }),
);

// Step 4: Copy static files
mkdirSync(".vercel/output/static", { recursive: true });
cpSync("dist/public", ".vercel/output/static", { recursive: true });

// Step 5: Output config with routing
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
