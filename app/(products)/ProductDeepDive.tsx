import styles from "./ProductDeepDive.module.css";

interface StatItem {
  value: string;
  label: string;
}

interface FeatureItem {
  title: string;
  subtitle: string;
  image: string | null;
}

interface PerformanceSection {
  heading: string;
  description: string;
  primaryButton: { label: string; url: string };
  secondaryButton: { label: string; url: string };
}

interface ProductDeepDiveProps {
  data: {
    stats: StatItem[];
    features: FeatureItem[];
    performance: PerformanceSection;
  };
}

export default function ProductDeepDive({ data }: ProductDeepDiveProps) {
  if (!data) return null;

  return (
    <section className={styles.section} aria-label="Product Deep Dive">
      <div className={styles.container}>
        {/* ── Stats Bar ── */}
        {data.stats && data.stats.length > 0 && (
          <div className={styles.statsWrapper}>
            <div className={styles.statsContainer}>
              {data.stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Core Features ── */}
        {data.features && data.features.length > 0 && (
          <div className={styles.featuresSection}>
            <h2 className={styles.featuresHeading}>Core Features</h2>
            <div className={styles.featuresGrid}>
              {data.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureImagePlaceholder}>
                    {feature.image && (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className={styles.featureImage}
                      />
                    )}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureSubtitle}>{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Built for Scale and Performance ── */}
        {data.performance && (
          <div className={styles.performanceSection}>
            <h2 className={styles.performanceHeading}>
              {data.performance.heading}
            </h2>
            <p className={styles.performanceDescription}>
              {data.performance.description}
            </p>
            <div className={styles.performanceActions}>
              <a
                href={data.performance.primaryButton.url}
                className={styles.btnPrimary}
              >
                {data.performance.primaryButton.label}
              </a>
              <a
                href={data.performance.secondaryButton.url}
                className={styles.btnSecondary}
              >
                {data.performance.secondaryButton.label}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
