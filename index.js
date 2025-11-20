import { scrapeSitemap } from "./scrapeSitemap.js";
import { analyzeUrl } from "./runPerformance.js";
import saveResults from "./helpers/saveFile.js"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function prepareFinalUrlList() {
  const allSitemapUrls = await scrapeSitemap("https://www.victoriassecret.com/sitemaps/en/us/product-1.xml");

  console.log("Fetching sitemap...");

  console.log("Total URLs:", allSitemapUrls.length);

  // Pick random 100
  const sample = allSitemapUrls.sort(() => Math.random() - 0.5).slice(0, 1);

  console.log("Selected URLs:", sample.length);

  const results = [];

  for (const url of sample) {
    try {
      const data = await analyzeUrl(url);
      results.push(data);
    } catch (err) {
      console.log("Failed:", url, err.message);
    }
  }

  console.log("Analysis complete!");
  console.log("Total successful:", results.length);

  saveResults(results)

  console.log("Saved results.json");
}

prepareFinalUrlList().then(console.log);
