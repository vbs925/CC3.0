import styles from "./ProductDetail.module.css";
import NeuralAnimation from "../(products)/NeuralAnimation";

interface HeroButton {
  label: string;
  url: string;
}

interface HeroProps {
  hero: {
    categoryLabel: string;
    heading: string;
    description: string;
    primaryButton: HeroButton;
    secondaryButton: HeroButton;
  };
}

export default function ProductDetailHero({ hero }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Cortex Voiz Hero Section">
      {/* Neural network — top-right corner (partially off-screen) */}
      <NeuralAnimation className={styles.neuralTopRight} />

      {/* Neural network — bottom-left corner (mirrored) */}
      <NeuralAnimation className={styles.neuralBottomLeft} variant="static" />

      <div className={styles.heroContainer}>
        <p className={styles.heroLabel}>{hero.categoryLabel}</p>

        <h1 className={styles.heroHeading}>{hero.heading}</h1>

        <p className={styles.heroDescription}>{hero.description}</p>

        <div className={styles.heroActions}>
          <a
            href={hero.primaryButton.url}
            className={styles.btnPrimary}
            id="voiz-primary-btn"
          >
            {hero.primaryButton.label}
          </a>
          <a
            href={hero.secondaryButton.url}
            className={styles.btnSecondary}
            id="voiz-secondary-btn"
          >
            {hero.secondaryButton.label}
          </a>
        </div>
      </div>
    </section>
  );
}
