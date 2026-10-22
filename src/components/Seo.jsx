import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* =========================================================
    SITE-WIDE SEO CONFIG
    Change SITE_URL if the site is served from a different domain/path.
========================================================= */
export const SITE_URL = "https://www.aka.net.in";
export const SITE_NAME = "Archana Kapil Associates";
export const DEFAULT_DESCRIPTION =
  "Archana Kapil Associates (AKA) is an architecture, interior design and landscape firm in Dehradun, Uttarakhand, designing hospitals, schools, housing, hospitality and commercial projects.";
export const DEFAULT_IMAGE = `${SITE_URL}/akaicon.png`;

/* Create or update a <meta>/<link> tag in <head> */
function upsertTag(tag, attr, key, props) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  Object.entries(props).forEach(([k, v]) => el.setAttribute(k, v));
}

const setMeta = (name, content) => upsertTag("meta", "name", name, { content });
const setProperty = (property, content) => upsertTag("meta", "property", property, { content });

/* =========================================================
    <Seo /> — drop into any page to set its head tags.
    Renders nothing.
========================================================= */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  schema,
}) {
  const { pathname } = useLocation();
  // Serialize so a schema object rebuilt on every render doesn't re-run the effect
  const schemaJson = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Architects in Dehradun`;
    const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    const desc = String(description || DEFAULT_DESCRIPTION).slice(0, 300);

    document.title = fullTitle;

    setMeta("description", desc);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertTag("link", "rel", "canonical", { href: url });

    setProperty("og:site_name", SITE_NAME);
    setProperty("og:type", type);
    setProperty("og:title", fullTitle);
    setProperty("og:description", desc);
    setProperty("og:url", url);
    setProperty("og:image", image);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", image);

    // Page-specific structured data (the organization schema lives in index.html)
    const SCRIPT_ID = "page-jsonld";
    document.getElementById(SCRIPT_ID)?.remove();
    if (schemaJson) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCRIPT_ID;
      script.textContent = schemaJson;
      document.head.appendChild(script);
    }
  }, [title, description, image, type, noindex, schemaJson, pathname]);

  return null;
}
