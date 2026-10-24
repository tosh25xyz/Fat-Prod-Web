import { cache } from "react";
import { db } from "@/lib/db";

export const getActiveServices = cache(async () => {
  return db.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
  const service = await db.service.findUnique({ where: { slug } });
  if (!service || !service.isActive) return null;
  return service;
});