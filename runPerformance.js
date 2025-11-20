// runner.js
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

export async function analyzeUrl(url) {
  console.log("Analyzing:", url);

  // launch Chrome
   const chrome = await launch({
    chromeFlags: ["--headless"]
  });
  const resp = await fetch(`http://localhost:${chrome.port}/json/version`);
  const data = await resp.json();
  const { webSocketDebuggerUrl } = data;

  // Puppeteer connect
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Screenshot for AI use
  const screenshot = await page.screenshot({ encoding: "base64" });

  // Lighthouse run
  const { lhr } = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance", "seo", "accessibility", "best-practices"]
  });

  await browser.close();
  await chrome.kill();

  return {
    url,
    screenshot,        // base64, no need S3 for MVP
    lighthouse: lhr    // structured audit results
  };
}
