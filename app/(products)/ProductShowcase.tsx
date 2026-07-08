"use client";

import styles from "./ProductShowcase.module.css";

interface Product {
  tabName: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  demoText: string;
  videoPlaceholder: string | null;
}

interface ShowcaseProps {
  showcase: {
    label: string;
    description: string;
    products: Product[];
  };
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export default function ProductShowcase({ showcase, activeIndex, onTabChange }: ShowcaseProps) {

  // Fallback if no products are available
  if (!showcase.products || showcase.products.length === 0) {
    return null;
  }

  const activeProduct = showcase.products[activeIndex];

  return (
    <section className={styles.showcase} aria-label="Product Showcase">
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h3 className={styles.sectionLabel}>{showcase.label}</h3>
          <p className={styles.sectionDescription}>{showcase.description}</p>
        </div>

        {/* ── Tabs ── */}
        <div className={styles.tabBar} role="tablist">
          {showcase.products.map((product, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={product.tabName}
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                onClick={() => onTabChange(index)}
              >
                {product.tabName}
              </button>
            );
          })}
        </div>

        {/* ── Content Layout: Left text + Right video stacked ── */}
        <div className={styles.contentLayout}>

          {/* Left: Text Info */}
          <div className={styles.textBlock}>
            <p className={styles.categoryLabel}>{activeProduct.categoryLabel}</p>
            <h2 className={styles.productTitle}>{activeProduct.title}</h2>
            <p className={styles.productSubtitle}>{activeProduct.subtitle}</p>
            <div
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: activeProduct.description }}
            />
          </div>

        </div>

        {/* ── Full-width Video Card ── */}
        <div className={styles.videoCard}>
          <div className={styles.videoGradient}>
            <button className={styles.playBtn} aria-label="Play Demo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="#111111" />
              </svg>
            </button>
            <p className={styles.demoText}>{activeProduct.demoText}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
