import styles from "./ProductDetailCapabilities.module.css";
import Image from "next/image";

interface CapabilityItem {
  title: string;
  description: string;
  image: string | null;
  bullets: string[];
}

interface CapabilitiesProps {
  data: {
    label: string;
    heading: string;
    items: CapabilityItem[];
  };
}

export default function ProductDetailCapabilities({ data }: CapabilitiesProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className={styles.section} aria-label={data.label}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{data.label}</span>
          <h2 className={styles.heading}>{data.heading}</h2>
        </div>

        <div className={styles.cardsList}>
          {data.items.map((item, index) => (
            <div 
              key={index} 
              className={styles.card} 
              style={{ "--index": index } as React.CSSProperties}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>

              <div className={styles.cardVisual}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}

                {item.bullets && item.bullets.length > 0 && (
                  <div className={styles.floatingBullets}>
                    <ul className={styles.bulletList}>
                      {item.bullets.map((bullet, bIndex) => (
                        <li key={bIndex} className={styles.bulletItem}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
