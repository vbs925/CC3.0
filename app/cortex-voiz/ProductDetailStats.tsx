import styles from "./ProductDetail.module.css";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  items: Stat[];
  prevProduct?: { label: string; url: string } | null;
  nextProduct?: { label: string; url: string } | null;
}

export default function ProductDetailStats({ items, prevProduct, nextProduct }: StatsBarProps) {
  return (
    <>
      {/* ── Stats Bar ── */}
      <section className={styles.statsBar} aria-label="Product Stats">
        <div className={styles.statsBarInner}>
          {items.map((stat, i) => (
            <div key={i} className={styles.statsBarItem}>
              <span className={styles.statsBarValue}>{stat.value}</span>
              <span className={styles.statsBarLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Navigation ── */}
      <nav className={styles.productNav} aria-label="Product Navigation">
        <div className={styles.productNavInner}>
          {prevProduct ? (
            <a href={prevProduct.url} className={styles.productNavPrev}>
              ← {prevProduct.label}
            </a>
          ) : (
            <a href="/products" className={styles.productNavPrev}>
              ← All Products
            </a>
          )}

          {nextProduct && (
            <a href={nextProduct.url} className={styles.productNavNext}>
              {nextProduct.label} →
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
