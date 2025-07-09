import { crawlAndIndex } from "@upstash/search-crawler";

export default async function handler(req, res) {
  const token = process.env.UPSTASH_SEARCH_REST_TOKEN;
  const url = process.env.UPSTASH_SEARCH_REST_URL;
  const docsUrl = process.env.DOCS_URL || "https://your-docs-url.com";
  const index = process.env.UPSTASH_INDEX || "default";

  const result = await crawlAndIndex({
    upstashUrl: url,
    upstashToken: token,
    indexName: index,
    docUrl: docsUrl,
  });

  if (result.success) {
    res.status(200).json({ output: result.output });
  } else {
    res.status(500).json({ error: result.error });
  }

}