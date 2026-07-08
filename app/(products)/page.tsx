import Navbar from "../components/Navbar";
import ProductsHero from "./ProductsHero";
import StatsBar from "./StatsBar";
import ProductSectionWrapper from "./ProductSectionWrapper";
import SecurePlatform from "./SecurePlatform";
import InteractiveDemo from "./InteractiveDemo";
import CtaSection from "./CtaSection";
import Footer from "../components/Footer";
import fallbackContent from "../../content/content.json";

// ── Types ──────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  url: string;
  isActive: boolean;
}

interface NavbarContent {
  logo: string | null;
  ctaLabel: string;
  ctaUrl: string;
  links: NavLink[];
}

interface HeroButton {
  label: string;
  url: string;
}

interface HeroContent {
  label: string;
  heading: string;
  description: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  heroImage: string | null;
}

interface StatItem {
  value: string;
  label: string;
}

interface Product {
  tabName: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  demoText: string;
  videoPlaceholder: string | null;
}

interface ShowcaseContent {
  label: string;
  description: string;
  products: Product[];
}

interface DeepDiveContent {
  stats: StatItem[];
  features: {
    title: string;
    subtitle: string;
    image: string | null;
  }[];
  performance: {
    heading: string;
    description: string;
    primaryButton: HeroButton;
    secondaryButton: HeroButton;
  };
}

interface PlatformContent {
  label: string;
  heading: string;
  description: string;
  features: { title: string; description: string }[];
  tags: string[];
}

interface InteractiveDemoContent {
  demo: {
    label: string;
    heading: string;
    description: string;
    note: string;
    useCases: string[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      useCaseLabel: string;
      agreementText: string;
      buttonLabel: string;
    };
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    statValue: string;
    statLabel: string;
  };
}

interface SiteContent {
  navbar: NavbarContent;
  hero: HeroContent;
  stats: StatItem[];
  showcase: ShowcaseContent;
  deepDive?: DeepDiveContent;
  platform?: PlatformContent;
  interactiveDemo?: InteractiveDemoContent;
  ctaSection?: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
}

// ── Content fetcher (SSR, with fallback) ──────────────────────────────────

async function getContent(): Promise<SiteContent> {
  try {
    const res = await fetch("http://localhost:8000/api/cms/content/", {
      next: { revalidate: 0 }, // Disable caching for active development
    });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    return await res.json();
  } catch (err) {
    // Backend is offline — use the local fallback JSON
    console.warn(
      "[CMS] Wagtail API unavailable, using fallback content.json:",
      err
    );
    return fallbackContent as SiteContent;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function ProductsPage() {
  const content = await getContent();

  return (
    <main>
      <Navbar navbar={content.navbar} />
      <ProductsHero hero={content.hero} />
      <StatsBar stats={content.stats} />
      <ProductSectionWrapper showcase={content.showcase as any} />
      {content.platform && <SecurePlatform data={content.platform} />}
      {content.interactiveDemo && <InteractiveDemo data={content.interactiveDemo} />}
      {content.ctaSection && <CtaSection data={content.ctaSection} />}
      <Footer footer={content.footer as any} />
    </main>
  );
}
