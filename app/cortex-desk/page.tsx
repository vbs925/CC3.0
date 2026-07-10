import pageStyles from "./Desk.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetailHero from "../components/ProductDetail/ProductDetailHero";
import ProductDetailStats from "../components/ProductDetail/ProductDetailStats";
import ProductDetailProblem from "../components/ProductDetail/ProductDetailProblem";
import ProductDetailCapabilities from "../components/ProductDetail/ProductDetailCapabilities";
import ProductDetailUseCases from "../components/ProductDetail/ProductDetailUseCases";
import SecurePlatform from "../(products)/SecurePlatform";
import InteractiveDemo from "../(products)/InteractiveDemo";
import ProductDetailExplore from "../components/ProductDetail/ProductDetailExplore";
import ProductDetailNavigation from "../components/ProductDetail/ProductDetailNavigation";
import type { Metadata } from "next";

// ── Types ──────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  url: string;
  isActive: boolean;
}

interface PageContent {
  hero: {
    categoryLabel: string;
    heading: string;
    description: string;
    primaryButton: { label: string; url: string };
    secondaryButton: { label: string; url: string };
  };
  capabilitiesSection: {
    label: string;
    heading: string;
    items: {
      title: string;
      description: string;
      image: string | null;
      bullets: string[];
    }[];
  };
  featuresSection?: {
    label: string;
    heading: string;
    items: { icon: string; title: string; description: string }[];
  };
  statsSection: {
    label: string;
    heading: string;
    items: { value: string; label: string }[];
  };
  problemSection: {
    label: string;
    heading: string;
    subtitle: string;
    body: string;
    demoCaption: string;
    videoImage: string | null;
    stats: { value: string; label: string }[];
  };
  useCasesSection: {
    label: string;
    heading: string;
    items: { icon: string | null; title: string; description: string }[];
    cta: {
      heading: string;
      description: string;
      buttonLabel: string;
      buttonUrl: string;
    };
  };
  platformSection: {
    label: string;
    heading: string;
    description: string;
    features: { title: string; description: string }[];
    tags: string[];
  };
  interactiveDemo: {
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
  };
  exploreSuiteSection?: {
    heading: string;
    cards: {
      tag: string;
      title: string;
      description: string;
      url: string;
    }[];
  };
  productNavigation: {
    prevLabel: string;
    prevUrl: string;
    nextLabel: string;
    nextUrl: string;
  };
}

interface NavbarContent {
  logo: string | null;
  ctaLabel: string;
  ctaUrl: string;
  links: NavLink[];
}

// ── Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Cortex Desk: The Intelligent Workspace — CortexCraft.AI",
  description:
    "Cortex Desk integrates your existing software stack into a single interface with built-in AI assistance for faster task execution and collaboration.",
};

// ── Data Fetchers ──────────────────────────────────────────────────────────

async function getPageContent(): Promise<PageContent | null> {
  try {
    const res = await fetch("http://localhost:8000/api/cms/product/cortex-desk/", {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[CMS] Cortex Desk API unavailable:", err);
    return null;
  }
}

async function getSiteContent(): Promise<{ navbar: NavbarContent; footer: any }> {
  try {
    const res = await fetch("http://localhost:8000/api/cms/content/", {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    return { navbar: data.navbar, footer: data.footer };
  } catch {
    return {
      navbar: {
        logo: null,
        ctaLabel: "Get in touch",
        ctaUrl: "#contact",
        links: [
          { label: "Services", url: "#", isActive: false },
          { label: "Products", url: "/", isActive: true },
          { label: "Works", url: "#", isActive: false },
          { label: "About", url: "#", isActive: false },
          { label: "Blogs", url: "#", isActive: false },
        ],
      },
      footer: null,
    };
  }
}

// ── Fallback content (shown if API is unavailable) ─────────────────────────

import fallbackData from "../../content/content.json";
const FALLBACK: PageContent = fallbackData.cortexDesk;

// ── Page ──────────────────────────────────────────────────────────────────

export default async function CortexDeskPage() {
  const [content, site] = await Promise.all([
    getPageContent(),
    getSiteContent(),
  ]);

  const pageContent = content ?? FALLBACK;

  return (
    <main>
      <Navbar navbar={site.navbar} />
      <ProductDetailHero hero={pageContent.hero} customStyles={pageStyles} />
      <ProductDetailStats items={pageContent.statsSection.items} customStyles={pageStyles} />
      <ProductDetailNavigation data={pageContent.productNavigation} customStyles={pageStyles} />
      <ProductDetailProblem problemSection={pageContent.problemSection} customStyles={pageStyles} />
      <ProductDetailCapabilities data={pageContent.capabilitiesSection} customStyles={pageStyles} />
      <ProductDetailUseCases data={pageContent.useCasesSection} customStyles={pageStyles} />
      <SecurePlatform data={pageContent.platformSection} />
      <InteractiveDemo data={pageContent.interactiveDemo} />
      {pageContent.exploreSuiteSection && <ProductDetailExplore data={pageContent.exploreSuiteSection} customStyles={pageStyles} />}
      <Footer footer={site.footer} />
    </main>
  );
}
