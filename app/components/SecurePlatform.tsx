import styles from "./SecurePlatform.module.css";

interface PlatformFeature {
  title: string;
  description: string;
}

interface PlatformContent {
  label: string;
  heading: string;
  description: string;
  features: PlatformFeature[];
  tags: string[];
}

interface SecurePlatformProps {
  data: PlatformContent;
}

export default function SecurePlatform({ data }: SecurePlatformProps) {
  if (!data) return null;

  return (
    <section className={styles.section} aria-label="Secure Platform Section">
      <div className={styles.container}>
        {/* ── Top Header ── */}
        <p className={styles.label}>{data.label}</p>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>

        {/* ── Features Grid ── */}
        {data.features && data.features.length > 0 && (
          <div className={styles.featuresSection}>
            <hr className={styles.divider} />
            <div className={styles.featuresGrid}>
              {data.features.map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <h3 className={styles.featureTitle}>{feat.title}</h3>
                  <p className={styles.featureDescription}>
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
            <hr className={styles.divider} />
          </div>
        )}

        {/* ── Tags / Pills ── */}
        {data.tags && data.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {data.tags.map((tag, i) => (
              <span key={i} className={styles.tagPill}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
