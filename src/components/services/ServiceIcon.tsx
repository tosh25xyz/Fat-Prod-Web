import { Video, Share2, Megaphone, BarChart3, Sparkles } from "lucide-react";
import type { LucideProps } from "lucide-react";

export function ServiceIcon({
  slug,
  ...props
}: { slug: string } & LucideProps) {
  switch (slug) {
    case "video-production":
      return <Video {...props} />;
    case "social-media-marketing":
      return <Share2 {...props} />;
    case "business-promotion":
      return <Megaphone {...props} />;
    case "ad-campaign-and-reach":
      return <BarChart3 {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}