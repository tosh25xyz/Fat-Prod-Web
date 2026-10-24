import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import {
  ServicesSection,
  ServicesSkeleton,
} from "@/components/home/ServicesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>
      <PortfolioSection />
      <ProcessSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}