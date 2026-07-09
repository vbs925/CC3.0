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
    </>
  );
}
