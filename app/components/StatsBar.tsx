import styles from "./StatsBar.module.css";

const stats = [
  { value: "2014", label: "Building Since" },
  { value: "40+", label: "Products Shipped" },
  { value: "30+", label: "Major Clients" },
  { value: "ISO 27001", label: "Certified" },
  { value: "98%", label: "Customer Satisfaction" },
];

export default function StatsBar() {
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
