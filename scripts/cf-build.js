/**
 * Custom Cloudflare build script for Windows + Node 24 compatibility.
 *
 * Background:
 * 1. Node 24 on Windows breaks the native SWC binary, so Next.js falls back to WASM.
 *    WASM mode only supports Webpack builds (not Turbopack).
 * 2. Next.js standalone file copier has a concurrent mkdir race condition on Windows.
 * 3. Next.js pre-renders static pages at build time by querying the local SQLite database (dev.db).
 *    This requires standard native Prisma client.
 * 4. Cloudflare D1 runtime requires WASM Prisma client.
 *    Running WASM client at build time fails because WASM doesn't support local file SQLite.
 *
 * Solution:
 * 1. Generate standard native Prisma client.
 * 2. Build Next.js with standalone mode. Static pages are pre-rendered successfully.
 * 3. Re-generate Prisma client with WASM engine enabled.
 * 4. Copy the WASM Prisma client files into `.next/standalone/node_modules/.prisma/client/`.
 * 5. Copy missing turbo runtime files to standalone next-server directory.
 * 6. Run OpenNext bundling (`opennextjs-cloudflare build --skipNextBuild`).
 * 7. Copy query_engine_bg.wasm and query_compiler_fast_bg.wasm into `.open-next/server-functions/default/node_modules/.prisma/client/`.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const TURBO_RUNTIME_FILES = [
  "app-page-turbo.runtime.prod.js",
  "app-page-turbo-experimental.runtime.prod.js",
  "app-route-turbo.runtime.prod.js",
  "app-route-turbo-experimental.runtime.prod.js",
  "pages-turbo.runtime.prod.js",
  "pages-api-turbo.runtime.prod.js",
];

const NEXT_SERVER_SUBPATH = path.join(
  "node_modules", "next", "dist", "compiled", "next-server"
);

function copyPrismaClientDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  let copied = 0;
  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    
    // Skip Windows-specific native binaries to save space
    if (entry.name.endsWith(".dll.node") || entry.name.includes(".tmp")) {
      continue;
    }
    
    fs.copyFileSync(path.join(src, entry.name), path.join(dest, entry.name));
    copied++;
  }
  return copied;
}

function ensureTurboRuntimesInStandalone() {
  const srcDir = path.join(ROOT, NEXT_SERVER_SUBPATH);
  if (!fs.existsSync(srcDir)) return;

  const standaloneNextServer = path.join(
    ROOT, ".next", "standalone", NEXT_SERVER_SUBPATH
  );

  if (!fs.existsSync(standaloneNextServer)) {
    fs.mkdirSync(standaloneNextServer, { recursive: true });
  }

  let copied = 0;
  for (const file of TURBO_RUNTIME_FILES) {
    const src = path.join(srcDir, file);
    const dest = path.join(standaloneNextServer, file);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      copied++;
    }
  }

  if (copied > 0) {
    console.log(`  Copied ${copied} turbo runtime file(s) to standalone output`);
  }
}

function copyWasmToOpenNext() {
  const srcDir = path.join(ROOT, "node_modules", ".prisma", "client");
  if (!fs.existsSync(srcDir)) return;

  const openNextBase = path.join(ROOT, ".open-next", "server-functions");
  if (!fs.existsSync(openNextBase)) return;

  const fnDirs = fs.readdirSync(openNextBase, { withFileTypes: true });
  for (const fnDir of fnDirs) {
    if (!fnDir.isDirectory()) continue;

    const destDir = path.join(
      openNextBase,
      fnDir.name,
      "node_modules",
      ".prisma",
      "client"
    );

    const copied = copyPrismaClientDir(srcDir, destDir);
    console.log(`  Copied ${copied} Prisma WASM files to OpenNext server function: ${fnDir.name}`);
  }
}

function patchPrismaLoaders() {
  const dir = path.join(ROOT, "node_modules", ".prisma", "client");
  
  const workerLoader = path.join(dir, "wasm-worker-loader.mjs");
  if (fs.existsSync(workerLoader)) {
    console.log("  Patching wasm-worker-loader.mjs to use static imports...");
    const content = `/* Patched by cf-build.js */\nimport wasmModule from './query_engine_bg.wasm';\nexport default Promise.resolve({ default: wasmModule });\n`;
    fs.writeFileSync(workerLoader, content, "utf8");
  }

  const edgeLoader = path.join(dir, "wasm-edge-light-loader.mjs");
  if (fs.existsSync(edgeLoader)) {
    console.log("  Patching wasm-edge-light-loader.mjs to use static imports...");
    const content = `/* Patched by cf-build.js */\nimport wasmModule from './query_engine_bg.wasm?module';\nexport default Promise.resolve({ default: wasmModule });\n`;
    fs.writeFileSync(edgeLoader, content, "utf8");
  }

  // Force WASM client resolution in package.json
  const pkgPath = path.join(dir, "package.json");
  if (fs.existsSync(pkgPath)) {
    console.log("  Force patching Prisma package.json to direct default resolves to wasm.js...");
    const content = fs.readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(content);
    
    pkg.main = "wasm.js";
    
    if (pkg.exports) {
      for (const key of Object.keys(pkg.exports)) {
        const exp = pkg.exports[key];
        if (typeof exp === "object") {
          if (exp.require && typeof exp.require === "object") {
            exp.require.node = "./wasm.js";
            exp.require.default = "./wasm.js";
          }
          if (exp.import && typeof exp.import === "object") {
            exp.import.node = "./wasm.js";
            exp.import.default = "./wasm.js";
          }
          if (exp.default === "./index.js") {
            exp.default = "./wasm.js";
          }
        } else if (exp === "./index.js") {
          pkg.exports[key] = "./wasm.js";
        }
      }
    }
    
    if (pkg.imports && pkg.imports["#main-entry-point"]) {
      const entry = pkg.imports["#main-entry-point"];
      if (entry.require) {
        entry.require.node = "./wasm.js";
        entry.require.default = "./wasm.js";
      }
      if (entry.import) {
        entry.import.node = "./wasm.js";
        entry.import.default = "./wasm.js";
      }
      if (entry.default === "./index.js") {
        entry.default = "./wasm.js";
      }
    }
    
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf-8");
  }
}

async function build() {
  // --- Step 1: Generate native Prisma client for build time ---
  console.log("=== Step 1/7: Generating native Prisma client ===\n");
  try {
    execSync("npx prisma generate", { cwd: ROOT, stdio: "inherit" });
  } catch (err) {
    console.warn("\n  ⚠️ [Warning] Native Prisma client generation failed (likely due to file locking on Windows).");
    console.warn("  Attempting to proceed with the build since the existing generated client is likely valid.\n");
  }

  // --- Step 2: Build Next.js app ---
  console.log("\n=== Step 2/7: Building Next.js app (standalone mode) ===\n");
  try {
    execSync("npm run build", {
      cwd: ROOT,
      stdio: "inherit",
      env: {
        ...process.env,
        NEXT_PRIVATE_STANDALONE: "true",
        NEXT_PRIVATE_OUTPUT_TRACE_ROOT: ROOT,
      },
    });
  } catch (err) {
    console.error("Next.js build failed!");
    process.exit(1);
  }

  // --- Step 3: Generate WASM Prisma client for runtime ---
  console.log("\n=== Step 3/7: Generating WASM Prisma client for Cloudflare ===\n");
  try {
    execSync("npx prisma generate", {
      cwd: ROOT,
      stdio: "inherit",
      env: {
        ...process.env,
        PRISMA_CLIENT_FORCE_WASM: "true",
      },
    });
  } catch (err) {
    console.warn("\n  ⚠️ [Warning] WASM Prisma client generation failed (likely due to file locking on Windows).");
    console.warn("  Attempting to proceed with the build since the existing generated client is likely valid.\n");
  }

  // --- Patching loaders to avoid dynamic WASM imports ---
  console.log("  Patching generated Prisma loader files...");
  patchPrismaLoaders();

  // --- Step 4: Copy WASM Prisma client to standalone output ---
  console.log("\n=== Step 4/7: Copying WASM Prisma client to standalone node_modules ===");
  const srcPrisma = path.join(ROOT, "node_modules", ".prisma", "client");
  const destPrisma = path.join(ROOT, ".next", "standalone", "node_modules", ".prisma", "client");
  const copiedCount = copyPrismaClientDir(srcPrisma, destPrisma);
  console.log(`  Copied ${copiedCount} files to standalone node_modules/.prisma/client`);

  // --- Step 5: Copy turbo runtime files to standalone ---
  console.log("\n=== Step 5/7: Patching standalone for webpack compatibility ===");
  ensureTurboRuntimesInStandalone();

  // --- Step 6: Run OpenNext build ---
  console.log("\n=== Step 6/7: Running OpenNext Cloudflare bundling ===\n");
  try {
    execSync("npx opennextjs-cloudflare build --skipNextBuild", {
      cwd: ROOT,
      stdio: "inherit",
    });
  } catch (err) {
    console.error("OpenNext Cloudflare build failed!");
    process.exit(1);
  }

  // --- Step 7: Inject WASM files to OpenNext output ---
  console.log("\n=== Step 7/7: Injecting Prisma WASM query engine to OpenNext server functions ===");
  copyWasmToOpenNext();

  console.log("\n=== Cloudflare build completed successfully ===");
}

build();
