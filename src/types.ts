export type NavLink = { label: string; href: string };

export type Service = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: string;
  image?: string;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  image?: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  desc: string;
  icon: string;
  deliverable?: string;
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating?: number; // 1–5, defaults to 5
};

export type WhyPoint = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type Guarantee = {
  icon: string;
  title: string;
  desc: string;
};

export type ComparisonRow = {
  feature: string;
  diy: string;
  agency: string;
  us: string;
};

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  icon: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
};

export type SiteConfig = {
  brand: string;
  nav: NavLink[];
  hero: { headline: string; sub: string; cta: string; scrollCue: string };
  marquee: string[];
  socials: { label: string; href: string }[];
  contactEmail: string;
};
