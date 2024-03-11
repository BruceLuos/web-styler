import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const env = process.env.NODE_ENV;
  const siteUrl =
    env === "development"
      ? (process.env.NEXT_PUBLIC_URL as string)
      : "https://webstylers.bruceluo.site";

  const sitemapData = {
    url: siteUrl,
    lastModified: new Date().toISOString().split("T")[0],
  };
  return [sitemapData];
}
