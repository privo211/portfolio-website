import { chromium } from "playwright";
import { spawn, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(ROOT, "Website_Screenshots");

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  "desktop-full": { width: 1440, height: 900 },
};

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "honors", label: "Honors" },
  { id: "testimonials", label: "Testimonials" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const TIMESTAMP = new Date()
  .toISOString()
  .replace(/[:.]/g, "-")
  .slice(0, 19);

let devServer = null;

// ---------------------------------------------------------------
// DEV SERVER
// ---------------------------------------------------------------

async function startDevServer() {
  // Kill any stale process on port 3000
  try {
    execSync("lsof -ti:3000 | xargs kill -9 2>/dev/null", {
      shell: true,
      stdio: "ignore",
    });
  } catch {
    /* ignore */
  }
  await sleep(500);

  return new Promise((resolve, reject) => {
    console.log("[server] Starting Next.js dev server...");

    devServer = spawn("npx", ["next", "dev", "--port", String(PORT)], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "development" },
    });

    devServer.stdout.on("data", (data) => {
      const msg = data.toString();
      if (msg.includes("Ready") || msg.includes("Local:")) {
        console.log("[server] Dev server ready");
        resolve();
      }
    });

    devServer.stderr.on("data", (data) => {
      const msg = data.toString();
      if (msg.includes("Ready") || msg.includes("Local:")) {
        console.log("[server] Dev server ready");
        resolve();
      }
    });

    devServer.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(new Error("next not found — run `npm install` first"));
      } else {
        reject(err);
      }
    });

    // safety timeout
    setTimeout(() => resolve(), 30000);
  });
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  console.log(`[server] Probing ${url} ...`);
  while (Date.now() - start < timeoutMs) {
    try {
      await httpGet(url);
      console.log("[server] Responding");
      return;
    } catch {
      await sleep(800);
    }
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) resolve();
        else reject(new Error(`HTTP ${res.statusCode}`));
      })
      .on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stopDevServer() {
  if (devServer) {
    console.log("[server] Stopping dev server...");
    devServer.kill("SIGTERM");
    devServer = null;
  }
}

// ---------------------------------------------------------------
// SCREENSHOT HELPERS
// ---------------------------------------------------------------

function outputPath(viewport, sectionId, suffix = "") {
  const dir = path.join(OUTPUT_DIR, TIMESTAMP, viewport);
  fs.mkdirSync(dir, { recursive: true });
  const file = suffix
    ? `${sectionId}_${suffix}.png`
    : `${sectionId}.png`;
  return path.join(dir, file);
}

async function dismissPreloader(page) {
  try {
    const preloader = page.locator(".fixed.inset-0.z-\\[100\\]");
    await preloader.waitFor({ state: "detached", timeout: 10_000 });
    console.log("  ✓ Preloader dismissed");
  } catch {
    console.log("  ⚠ Preloader not found or already gone");
  }
  // extra settle time for exit animations
  await sleep(1500);
}

async function disableLenisForScreenshots(page) {
  await page.evaluate(() => {
    if (window.__lenis) {
      window.__lenis.destroy();
      delete window.__lenis;
    }
    // remove the Lenis wrapper so native scroll works
    const html = document.documentElement;
    const wrapper = html.querySelector('[data-lenis-root]') || html;
    wrapper.style.overflow = "";
    wrapper.style.height = "";
    html.style.overflow = "auto";
    document.body.style.overflow = "auto";
  });
}

async function scrollToSection(page, sectionId) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, sectionId);
  // let scroll-triggered GSAP/motion animations fire
  await sleep(1200);
}

// ---------------------------------------------------------------
// CAPTURE PIPELINE
// ---------------------------------------------------------------

async function captureAllScreenshots(page, viewportName, viewport) {
  await page.setViewportSize(viewport);
  console.log(`\n--- Viewport: ${viewportName} (${viewport.width}x${viewport.height}) ---`);

  // Navigate and let page settle
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60_000 });
  await dismissPreloader(page);

  // Leave Lenis active so ScrollTrigger works normally
  // Let initial animations finish
  await sleep(2000);

  const captures = [];
  
  // Get total height of the page
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = viewport.height;
  
  let currentScrollY = 0;
  let step = 0;

  console.log(`  Scrolling down page (Total height: ${bodyHeight})...`);

  while (currentScrollY < bodyHeight) {
    // Scroll to current position
    await page.evaluate((y) => window.scrollTo(0, y), currentScrollY);
    
    // Wait for GSAP ScrollTriggers and Lenis to settle
    await sleep(1500);

    const vpPath = outputPath(viewportName, `scroll-step-${step}`);
    await page.screenshot({ path: vpPath, fullPage: false });
    console.log(`  ✓ Captured step ${step} at Y=${currentScrollY}`);
    
    captures.push({
      section: `step-${step}`,
      label: `Scroll Step ${step}`,
      viewport: viewportName,
      viewportDims: `${viewport.width}x${viewport.height}`,
      elementPath: vpPath,
      viewportPath: vpPath,
      fullPagePath: vpPath,
    });

    currentScrollY += Math.floor(viewportHeight * 0.8); // Overlap slightly
    step++;
    
    // Break if we've reached or passed the bottom
    if (currentScrollY + viewportHeight >= bodyHeight + viewportHeight * 0.8) {
        break;
    }
  }

  // Final screenshot at the absolute bottom just in case
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1500);
  const vpPath = outputPath(viewportName, `scroll-step-bottom`);
  await page.screenshot({ path: vpPath, fullPage: false });
  console.log(`  ✓ Captured bottom`);

  return captures;
}

// ---------------------------------------------------------------
// HTML GALLERY GENERATOR
// ---------------------------------------------------------------

function generateGallery(allCaptures) {
  const galleryPath = path.join(OUTPUT_DIR, TIMESTAMP, "gallery.html");

  const bodyRows = allCaptures
    .map((c) => {
      const relEl = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), c.elementPath);
      const relVp = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), c.viewportPath);
      return `
        <tr>
          <td class="label">${c.label}</td>
          <td class="vp-label">${c.viewport} (${c.viewportDims})</td>
          <td class="img-cell">
            <a href="${relEl}" target="_blank">
              <img src="${relEl}" alt="${c.label} — element" loading="lazy" />
            </a>
            <span class="img-tag">element</span>
          </td>
          <td class="img-cell">
            <a href="${relVp}" target="_blank">
              <img src="${relVp}" alt="${c.label} — viewport" loading="lazy" />
            </a>
            <span class="img-tag">viewport</span>
          </td>
        </tr>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Screenshot Gallery — ${TIMESTAMP}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'SF Mono', 'JetBrains Mono', 'Consolas', monospace;
    background: #0a0a0f;
    color: #e0e0e0;
    padding: 32px;
  }
  h1 {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 2rem;
    color: #a855f7;
    margin-bottom: 4px;
  }
  .timestamp { color: #666; font-size: 0.85rem; margin-bottom: 32px; }
  .viewport-section { margin-bottom: 48px; }
  .viewport-section h2 {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 1.3rem;
    color: #22d3ee;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #222;
  }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; color: #888; font-size: 0.75rem; text-transform: uppercase; padding: 8px 12px; }
  td { vertical-align: top; padding: 12px; border-bottom: 1px solid #1a1a25; }
  .label { font-weight: 600; color: #e0e0e0; white-space: nowrap; font-size: 0.9rem; }
  .vp-label { color: #666; font-size: 0.8rem; white-space: nowrap; }
  .img-cell { position: relative; }
  .img-cell img {
    max-width: 400px;
    border-radius: 6px;
    border: 1px solid #222;
    transition: transform 0.15s ease, border-color 0.15s ease;
    cursor: pointer;
  }
  .img-cell img:hover { transform: scale(1.03); border-color: #a855f7; }
  .img-tag {
    display: block;
    font-size: 0.65rem;
    color: #555;
    text-transform: uppercase;
    margin-top: 4px;
  }
  a { text-decoration: none; }
</style>
</head>
<body>
<h1>Screenshot Gallery</h1>
<p class="timestamp">${TIMESTAMP} — ${allCaptures.length} captures</p>
${Object.entries(groupBy(allCaptures, (c) => c.viewport))
  .map(
    ([vp, captures]) => `
<div class="viewport-section">
  <h2>${vp.toUpperCase()} (${captures[0].viewportDims})</h2>
  <table>
    <thead><tr><th>Section</th><th>Viewport</th><th>Element</th><th>Viewport</th></tr></thead>
    <tbody>${captures
      .map(
        (c) => {
          const relEl = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), c.elementPath);
          const relVp = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), c.viewportPath);
          return `<tr>
          <td class="label">${c.label}</td>
          <td class="vp-label">${c.viewport}</td>
          <td class="img-cell">
            <a href="${relEl}" target="_blank"><img src="${relEl}" alt="${c.label} — element" loading="lazy" /></a>
            <span class="img-tag">element</span>
          </td>
          <td class="img-cell">
            <a href="${relVp}" target="_blank"><img src="${relVp}" alt="${c.label} — viewport" loading="lazy" /></a>
            <span class="img-tag">viewport</span>
          </td>
        </tr>`;
      }
    )
    .join("")}
  </tbody>
  </table>
</div>`
  )
  .join("")}
</body>
</html>`;

  fs.writeFileSync(galleryPath, html);
  console.log(`\n[gallery] Saved → ${galleryPath}`);
  return galleryPath;
}

function groupBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    (acc[key] ||= []).push(item);
    return acc;
  }, {});
}

// ---------------------------------------------------------------
// VISUAL REGRESSION (pixel-diff vs baseline)
// ---------------------------------------------------------------

async function compareWithBaseline(allCaptures) {
  const baselineDir = path.join(OUTPUT_DIR, "baseline");
  if (!fs.existsSync(baselineDir)) {
    console.log("\n[baseline] No baseline found. Current run will be SAVED as baseline.");
    saveAsBaseline(allCaptures);
    return;
  }

  console.log("\n[baseline] Comparing against stored baseline...");

  const { PNG } = await import("pngjs");
  const pixelmatch = (await import("pixelmatch")).default;

  const diffs = [];
  for (const cap of allCaptures) {
    const rel = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), cap.elementPath);
    const baselineFile = path.join(baselineDir, rel);
    const diffFile = baselineFile.replace(/\.png$/, "_diff.png");

    if (!fs.existsSync(baselineFile)) {
      console.log(`  ○ [${cap.label}] No baseline — skipping`);
      continue;
    }

    try {
      const current = PNG.sync.read(fs.readFileSync(cap.elementPath));
      const baseline = PNG.sync.read(fs.readFileSync(baselineFile));

      if (current.width !== baseline.width || current.height !== baseline.height) {
        console.log(
          `  ⚠ [${cap.label}] Size mismatch: current ${current.width}x${current.height} vs baseline ${baseline.width}x${baseline.height}`
        );
        diffs.push({ ...cap, diffPixels: null, reason: "size mismatch" });
        continue;
      }

      const diff = new PNG({ width: current.width, height: current.height });
      const diffPixels = pixelmatch(
        current.data,
        baseline.data,
        diff.data,
        current.width,
        current.height,
        { threshold: 0.1 }
      );

      if (diffPixels > 0) {
        const pct = ((diffPixels / (current.width * current.height)) * 100).toFixed(3);
        console.log(`  ✗ [${cap.label}] ${diffPixels} diff pixels (${pct}%)`);
        fs.mkdirSync(path.dirname(diffFile), { recursive: true });
        fs.writeFileSync(diffFile, PNG.sync.write(diff));
        diffs.push({ ...cap, diffPixels, diffPercent: pct, diffFile });
      } else {
        console.log(`  ✓ [${cap.label}] Pixel-perfect match`);
      }
    } catch (e) {
      console.log(`  ✗ [${cap.label}] Error: ${e.message}`);
    }
  }

  if (diffs.length > 0) {
    console.log(`\n[regression] ${diffs.length} difference(s) found.`);
  } else {
    console.log("\n[regression] All matched — no visual regressions.");
  }

  return diffs;
}

function saveAsBaseline(allCaptures) {
  const baselineDir = path.join(OUTPUT_DIR, "baseline");
  for (const cap of allCaptures) {
    const rel = path.relative(path.join(OUTPUT_DIR, TIMESTAMP), cap.elementPath);
    const dest = path.join(baselineDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(cap.elementPath, dest);
  }
  console.log(`[baseline] Saved ${allCaptures.length} files → ${baselineDir}`);
}

// ---------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const shouldCompare = args.includes("--compare");
  const saveOnly = args.includes("--save-baseline");
  const skipGallery = args.includes("--no-gallery");

  console.log("╔══════════════════════════════════╗");
  console.log("║   Portfolio Screenshot Capture  ║");
  console.log("╚══════════════════════════════════╝");
  console.log(`Output: ${OUTPUT_DIR}/${TIMESTAMP}`);

  // Ensure output root
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    // Start dev server
    await startDevServer();
    await waitForServer(BASE_URL);

    // Launch Playwright
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();

    const allCaptures = [];

    // Iterate viewports
    for (const [name, vp] of Object.entries(VIEWPORTS)) {
      const captures = await captureAllScreenshots(page, name, vp);
      allCaptures.push(...captures);
    }

    await browser.close();

    console.log(`\n✓ Total captures: ${allCaptures.length}`);

    // Generate HTML gallery
    if (!skipGallery) {
      generateGallery(allCaptures);
    }

    // Compare with baseline
    if (shouldCompare || saveOnly) {
      if (saveOnly) {
        saveAsBaseline(allCaptures);
      } else {
        await compareWithBaseline(allCaptures);
      }
    } else {
      console.log(
        "\n[tip] Run with --compare to diff against baseline, --save-baseline to store current run as baseline"
      );
    }

    console.log("\n✓ Done!");
  } catch (err) {
    console.error("\n✗ Fatal error:", err);
    process.exitCode = 1;
  } finally {
    stopDevServer();
  }
}

main();
