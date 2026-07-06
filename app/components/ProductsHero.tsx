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
          {/* White card behind graph */}
          <div className={styles.graphCard} />

          {/* SVG Node Network */}
          <svg
            className={styles.graphSvg}
            viewBox="0 0 520 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Edges / Lines */}
            <line x1="200" y1="60"  x2="370" y2="30"  stroke="#999" strokeWidth="1.2" />
            <line x1="370" y1="30"  x2="480" y2="180" stroke="#999" strokeWidth="1.2" />
            <line x1="480" y1="180" x2="400" y2="320" stroke="#999" strokeWidth="1.2" />
            <line x1="400" y1="320" x2="220" y2="380" stroke="#999" strokeWidth="1.2" />
            <line x1="220" y1="380" x2="100" y2="260" stroke="#999" strokeWidth="1.2" />
            <line x1="100" y1="260" x2="200" y2="60"  stroke="#999" strokeWidth="1.2" />
            {/* Inner diagonals */}
            <line x1="200" y1="60"  x2="480" y2="180" stroke="#bbb" strokeWidth="1" />
            <line x1="370" y1="30"  x2="400" y2="320" stroke="#bbb" strokeWidth="1" />
            <line x1="480" y1="180" x2="220" y2="380" stroke="#bbb" strokeWidth="1" />
            <line x1="100" y1="260" x2="400" y2="320" stroke="#bbb" strokeWidth="1" />

            {/* Nodes */}
            {[
              [200, 60],
              [370, 30],
              [480, 180],
              [400, 320],
              [220, 380],
              [100, 260],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="5"
                fill="#444"
                stroke="#f0ece4"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
