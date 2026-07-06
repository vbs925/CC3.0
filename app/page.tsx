import Navbar from "./components/Navbar";
import ProductsHero from "./components/ProductsHero";
import StatsBar from "./components/StatsBar";
import ProductShowcase from "./components/ProductShowcase";
import fallbackContent from "../content/content.json";

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

interface SiteContent {
  navbar: NavbarContent;
  hero: HeroContent;
  stats: StatItem[];
  showcase: ShowcaseContent;
}

// ── Content fetcher (SSR, with fallback) ──────────────────────────────────

async function getContent(): Promise<SiteContent> {
  try {
    const res = await fetch("http://localhost:8000/api/cms/content/", {
      next: { revalidate: 60 }, // Re-fetch from Wagtail every 60 seconds
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
      <ProductShowcase showcase={content.showcase} />
    </main>
  );
}
