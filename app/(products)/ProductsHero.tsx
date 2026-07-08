import styles from "./ProductsHero.module.css";
import NeuralAnimation from "./NeuralAnimation";

interface HeroButton {
  label: string;
  url: string;
}

interface HeroProps {
  hero: {
    label: string;
    heading: string;
    description: string;
    primaryButton: HeroButton;
    secondaryButton: HeroButton;
    heroImage: string | null;
  };
}

export default function ProductsHero({ hero }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Products Hero Section">
      <div className={styles.container}>
        {/* ── Left: Text Content ── */}
        <div className={styles.content}>
          <p className={styles.label} id="hero-label">
            {hero.label}
          </p>

          <h1 className={styles.heading}>
            {hero.heading}
          </h1>

          <p className={styles.description}>
            {hero.description}
          </p>

          <div className={styles.actions}>
            <a
              href={hero.primaryButton.url}
              className={styles.btnPrimary}
              id="hero-view-products-btn"
            >
              {hero.primaryButton.label}
            </a>
            <a
              href={hero.secondaryButton.url}
              className={styles.btnSecondary}
              id="hero-schedule-demo-btn"
            >
              {hero.secondaryButton.label}
            </a>
          </div>
        </div>

        {/* ── Right: Geometric Node Graph ── */}
        <div className={styles.graphWrapper} aria-hidden="true">
          {/* Neural Network Animation - placed on far right */}
          <NeuralAnimation className={styles.graphImage} />

          {/* White card in front */}
          <div className={styles.graphCard} />
        </div>
      </div>
    </section>
  );
}
