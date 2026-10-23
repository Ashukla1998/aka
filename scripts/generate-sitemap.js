/*
 * Generates public/sitemap.xml from the static routes plus every project
 * and team member returned by the APIs. Runs automatically before `npm run build`.
 * Keep SITE_URL in sync with src/components/Seo.jsx.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.aka.net.in";
const PROJECTS_API = "https://www.lifepage.in/n/api/GetProjectData";
const MEMBERS_API = "https://www.lifepage.in/n/api/GetFilterMember";
const OUT_FILE = path.join(__dirname, "..", "public", "sitemap.xml");

const STATIC_ROUTES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/projects", priority: "0.9", changefreq: "weekly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact", priority: "0.7", changefreq: "yearly" },
  { loc: "/career", priority: "0.5", changefreq: "monthly" },
];

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

async function getProjectRoutes() {
  try {
    const res = await fetch(PROJECTS_API);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) throw new Error("Unexpected API response");

    return json.data
      .filter((p) => p.gallerypath)
      .map((p) => ({
        loc: `/projects/${encodeURIComponent(p.gallerypath)}`,
        priority: "0.8",
        changefreq: "monthly",
        image: p.cover,
        title: p.title,
      }));
  } catch (err) {
    // Don't fail the build if the API is down; ship the static routes only.
    console.warn(`[sitemap] Could not load projects: ${err.message}`);
    return [];
  }
}

// Keep in sync with memberSlug() in src/pages/TeamMember.jsx
const memberSlug = (m) =>
  String(m.name || m.memberid || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function getMemberRoutes() {
  try {
    const res = await fetch(MEMBERS_API);
    const json = await res.json();
    if (json.success !== 1 || !json.data || typeof json.data !== "object") throw new Error("Unexpected API response");

    return Object.values(json.data)
      .flat()
      .filter((m) => m.is_active !== false && memberSlug(m))
      .map((m) => ({
        loc: `/team/${memberSlug(m)}`,
        priority: "0.5",
        changefreq: "monthly",
        image: m.photo,
        title: m.name,
      }));
  } catch (err) {
    console.warn(`[sitemap] Could not load team members: ${err.message}`);
    return [];
  }
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const routes = [...STATIC_ROUTES, ...(await getProjectRoutes()), ...(await getMemberRoutes())];

  const urls = routes
    .map((r) => {
      const image = r.image
        ? `
    <image:image>
      <image:loc>${escapeXml(r.image)}</image:loc>
      <image:title>${escapeXml(r.title || "")}</image:title>
    </image:image>`
        : "";
      return `  <url>
    <loc>${escapeXml(SITE_URL + (r.loc === "/" ? "" : r.loc))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${image}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  fs.writeFileSync(OUT_FILE, xml);
  console.log(`[sitemap] Wrote ${routes.length} URLs to public/sitemap.xml`);
}

main();
