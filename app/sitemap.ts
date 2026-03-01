import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { projects } from "@/data/projects";
import { awards } from "@/data/awards";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const awardRoutes = awards.map((a) => ({
    url: `${siteConfig.siteUrl}/awards/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const experienceRoutes = experience.map((e) => ({
    url: `${siteConfig.siteUrl}/experience/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const educationRoutes = education.map((e) => ({
    url: `${siteConfig.siteUrl}/education/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projectRoutes,
    ...awardRoutes,
    ...experienceRoutes,
    ...educationRoutes,
  ];
}
