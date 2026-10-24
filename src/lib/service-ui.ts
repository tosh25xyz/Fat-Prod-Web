const defaultFeatures = [
  "Free discussion before we start",
  "Clear plan and final price",
  "Revisions if needed",
  "Delivery on the agreed date",
];

const features: Record<string, string[]> = {
  "video-production": [
    "Script and concept planning",
    "Shooting and professional editing",
    "Color correction and sound mixing",
    "Final video for Facebook, YouTube and ads",
  ],
  "social-media-marketing": [
    "Monthly content plan",
    "Post design and captions",
    "Page management and replies",
    "Growth and reach report",
  ],
  "business-promotion": [
    "Business and audience review",
    "Custom promotion strategy",
    "Offline and online promotion ideas",
    "Progress follow-up",
  ],
  "ad-campaign-and-reach": [
    "Target audience research",
    "Ad creative and copy",
    "Campaign setup and budget control",
    "Result tracking and report",
  ],
};

export function getServiceFeatures(slug: string): string[] {
  return features[slug] ?? defaultFeatures;
}