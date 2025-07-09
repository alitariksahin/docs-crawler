import { exec } from "child_process";

export default function handler(req, res) {
  const token = process.env.UPSTASH_SEARCH_REST_TOKEN;
  const url = process.env.UPSTASH_SEARCH_REST_URL;
  const docsUrl = process.env.DOCS_URL || "https://your-docs-url.com";
  const index = process.env.UPSTASH_INDEX || "default";

  const cmd = `npx @upstash/search-crawler --upstash-url ${url} --upstash-token ${token} --index-name ${index} --doc-url ${docsUrl}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
    } else {
      res.status(200).json({ output: stdout });
    }
  });
}