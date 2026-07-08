import styles from "./ProductDetail.module.css";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  items: Stat[];
}

export default function ProductDetailStats({ items }: StatsBarProps) {
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
          <a href="/products" className={styles.productNavPrev}>
            ← All Products
          </a>
          <a href="/cortex-insights" className={styles.productNavNext}>
            Cortex Insights →
          </a>
        </div>
      </nav>
    </>
  );
}
