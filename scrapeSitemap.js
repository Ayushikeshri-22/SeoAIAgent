import axios from "axios";
import { parseStringPromise } from "xml2js";

export async function scrapeSitemap(sitemapUrl) {
  const xml = await axios.get(sitemapUrl).then(res => res.data);

  const parsed = await parseStringPromise(xml);

  const urls =
    parsed.urlset.url?.map((u) => u.loc[0]) ||
    parsed.sitemapindex.sitemap?.map((s) => s.loc[0]) ||
    [];

  return urls;
}

