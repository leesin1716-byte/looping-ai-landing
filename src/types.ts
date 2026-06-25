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
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type WhyPoint = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

export type SiteConfig = {
  brand: string;
  nav: NavLink[];
  hero: { headline: string; sub: string; cta: string; scrollCue: string };
  marquee: string[];
  socials: { label: string; href: string }[];
  contactEmail: string;
};
