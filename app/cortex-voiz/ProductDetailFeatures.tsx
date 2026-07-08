import styles from "./ProductDetail.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  data: {
    label: string;
    heading: string;
    items: Feature[];
  };
}

export default function ProductDetailFeatures({ data }: FeaturesProps) {
  return (
    <section className={styles.featuresSection} aria-label="Features">
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>{data.heading}</h2>

        <div className={styles.featuresGrid}>
          {data.items.map((feature, i) => (
            <div key={i} className={styles.featureCard}>
              {feature.icon && (
                <div className={styles.featureIcon}>{feature.icon}</div>
              )}
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
