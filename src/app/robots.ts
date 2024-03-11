import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const env = process.env.NODE_ENV;
  const siteUrl =
    env === "development"
      ? (process.env.NEXT_PUBLIC_URL as string)
      : "https://webstylers.bruceluo.site";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
