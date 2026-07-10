import defaultStyles from "./ProductDetail.module.css";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  items: Stat[];
  customStyles?: any;
}

export default function ProductDetailStats({ items, customStyles }: StatsBarProps) {
  const styles = customStyles || defaultStyles;
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
