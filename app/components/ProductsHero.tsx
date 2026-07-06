import styles from "./ProductsHero.module.css";

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
          {/* Neural Network Illustration */}
          <img
            src={hero.heroImage ?? "/assets/images/Neural Network Illustration.png"}
            alt="Neural Network Pattern"
            className={styles.graphImage}
          />

          {/* White card in front */}
          <div className={styles.graphCard} />
        </div>
      </div>
    </section>
  );
}
