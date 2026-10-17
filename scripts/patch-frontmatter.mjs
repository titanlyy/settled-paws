import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "image-manifest.json"), "utf8")
);
const dir = path.join(root, "content/articles");

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const meta = manifest[slug];
  if (!meta) {
    console.warn("No manifest for", slug);
    continue;
  }
  const full = path.join(dir, file);
  let raw = fs.readFileSync(full, "utf8");
  if (!raw.startsWith("---")) continue;
  const end = raw.indexOf("---", 3);
  if (end === -1) continue;
  let fm = raw.slice(3, end);
  const body = raw.slice(end + 3);

  // Remove existing image/figures if re-running
  fm = fm.replace(/\nimage:.*\n/, "\n");
  fm = fm.replace(/\nfigures:\n(?:  - .*\n)*/, "\n");

  const figYaml = meta.figures.map((f) => `  - ${f}`).join("\n");
  const injection = `image: "${meta.image}"\nfigures:\n${figYaml}\n`;
  // Insert before closing — append at end of frontmatter
  fm = fm.trimEnd() + "\n" + injection;
  raw = `---${fm}---${body}`;
  fs.writeFileSync(full, raw);
  console.log("patched", slug);
}
