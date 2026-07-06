import styles from "./StatsBar.module.css";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className={styles.statsBar} aria-label="Company Statistics">
      <div className={styles.inner}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
