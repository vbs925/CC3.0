import styles from "./ProductDetail.module.css";

interface CtaProps {
  data: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
}

export default function ProductDetailCta({ data }: CtaProps) {
  return (
    <section className={styles.ctaSection} aria-label="Call to Action">
      <div className={styles.sectionContainer}>
        <h2 className={styles.ctaHeading}>{data.heading}</h2>
        <p className={styles.ctaDescription}>{data.description}</p>
        <div className={styles.ctaActions}>
          <a href={data.buttonUrl} className={styles.btnPrimary} id="voiz-cta-btn">
            {data.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
