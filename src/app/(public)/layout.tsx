import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-navy/10 bg-surface/90" />
  );
}