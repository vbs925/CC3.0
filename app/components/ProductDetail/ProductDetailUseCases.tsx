import Image from "next/image";
import defaultStyles from "./ProductDetailUseCases.module.css";

interface UseCaseItem {
  icon: string | null;
  title: string;
  description: string;
}

interface UseCasesCta {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}

interface UseCasesProps {
  data: {
    label: string;
    heading: string;
    items: UseCaseItem[];
    cta: UseCasesCta;
  };
  customStyles?: any;
}

export default function ProductDetailUseCases({ data, customStyles }: UseCasesProps) {
  const styles = customStyles || defaultStyles;
  if (!data) return null;

  return (
    <section className={styles.section} aria-label={data.label}>
      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.label}>{data.label}</span>
          <h2 className={styles.heading}>{data.heading}</h2>
        </div>

        {/* ── Cards Grid ── */}
        <div className={styles.grid}>
          {data.items.map((item, index) => (
            <div key={index} className={styles.card}>
              {/* Icon */}
              <div className={styles.iconWrap}>
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={56}
                    height={56}
                    className={styles.icon}
                  />
                ) : (
                  <div className={styles.iconPlaceholder} />
                )}
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className={styles.cta}>
          <h3 className={styles.ctaHeading}>{data.cta.heading}</h3>
          <p className={styles.ctaDescription}>{data.cta.description}</p>
          <a href={data.cta.buttonUrl} className={styles.ctaButton}>
            {data.cta.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
