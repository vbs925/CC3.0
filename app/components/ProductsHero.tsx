import styles from "./ProductsHero.module.css";

export default function ProductsHero() {
  return (
    <section className={styles.hero} aria-label="Products Hero Section">
      <div className={styles.container}>
        {/* ── Left: Text Content ── */}
        <div className={styles.content}>
          <p className={styles.label} id="hero-label">
            Enterprise Software Products
          </p>

          <h1 className={styles.heading}>
            Intelligent Products <br />
            That Transform <br />
            Operations
          </h1>

          <p className={styles.description}>
            From ERP platforms to AI voice agents and CRM systems, our products
            automate the work behind your business, cut operating cost, and deploy
            inside your stack in days and not quarters.
          </p>

          <div className={styles.actions}>
            <a href="#products" className={styles.btnPrimary} id="hero-view-products-btn">
              View Our Products
            </a>
            <a href="#demo" className={styles.btnSecondary} id="hero-schedule-demo-btn">
              Schedule a Demo
            </a>
          </div>
        </div>

        {/* ── Right: Geometric Node Graph ── */}
        <div className={styles.graphWrapper} aria-hidden="true">
          {/* Neural Network Illustration */}
          <img 
            src="/assets/images/Neural Network Illustration.png" 
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
