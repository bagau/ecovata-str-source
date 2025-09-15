// Скрипт для экспорта всех WP страниц и постов в html и meta.json
// Запускать: node wp-html-export/export-wp.js

const fs = require("fs");
const path = require("path");

let fetch;
try {
  fetch = global.fetch || require("node-fetch");
} catch (e) {
  fetch = (...args) =>
    import("node-fetch").then(({ default: f }) => f(...args));
}

const GRAPHQL_URL = "http://localhost:8000/___graphql";
const EXPORT_DIR = path.join(__dirname);

const QUERY = `
{
  allWpPage { nodes { slug title date content uri status } }
  allWpPost { nodes { slug title date content excerpt uri status categories { nodes { name slug } } tags { nodes { name slug } } featuredImage { node { sourceUrl } } } }
}
`;

async function main() {
  if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR, { recursive: true });

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  });
  const json = await res.json();
  if (!json.data) {
    console.error("GraphQL response:", JSON.stringify(json, null, 2));
    throw new Error("No data from GraphQL");
  }
  const data = json.data;

  const all = [];
  const save = (item, type) => {
    if (!item.slug || !item.content) return;
    const htmlFile = path.join(EXPORT_DIR, `${item.slug}.html`);
    fs.writeFileSync(htmlFile, item.content, "utf8");
    all.push({ ...item, type });
  };

  data.allWpPage.nodes.forEach((n) => save(n, "page"));
  data.allWpPost.nodes.forEach((n) => save(n, "post"));

  fs.writeFileSync(
    path.join(EXPORT_DIR, "meta.json"),
    JSON.stringify(all, null, 2),
    "utf8"
  );
  console.log(`Exported ${all.length} items to ${EXPORT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
