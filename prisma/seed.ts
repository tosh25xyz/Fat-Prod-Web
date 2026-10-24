import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const services = [
  {
    name: "Video Production",
    slug: "video-production",
    description: "Business promo, product ar brand video toiri.",
    price: 15000,
  },
  {
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Facebook, Instagram e content ar page management.",
    price: 8000,
  },
  {
    name: "Business Promotion",
    slug: "business-promotion",
    description: "Apnar business ke notun customer er kache pouchanor plan.",
    price: 10000,
  },
  {
    name: "Ad Campaign and Reach",
    slug: "ad-campaign-and-reach",
    description: "Paid ad campaign diye target audience e reach barano.",
    price: 12000,
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL ar ADMIN_PASSWORD .env e dite hobe");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { name: "Owner", email, passwordHash },
  });
  console.log("Admin ready:", email);

  for (const s of services) {
    await db.service.upsert({
      where: { slug: s.slug },
      update: { name: s.name, description: s.description, price: s.price },
      create: s,
    });
  }
  console.log(`${services.length} ta service ready`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());