import type { MetadataRoute } from "next";

const baseUrl = "https://startflowhq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["/", "/services", "/pricing", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified
  }));
}
