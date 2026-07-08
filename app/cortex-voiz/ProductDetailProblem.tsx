import styles from "./ProductDetailProblem.module.css";

interface Stat {
  value: string;
  label: string;
}

interface ProblemSectionData {
  label: string;
  heading: string;
  subtitle: string;
  body: string;
  demoCaption: string;
  videoImage: string | null;
  stats: Stat[];
}

interface ProblemSectionProps {
  problemSection: ProblemSectionData;
}

export default function ProductDetailProblem({ problemSection }: ProblemSectionProps) {
  return (
    <section className={styles.section} aria-label={problemSection.heading}>
      <div className={styles.container}>

        {/* ── Text Block ── */}
        <div className={styles.textBlock}>
          <p className={styles.label}>{problemSection.label}</p>
          <h2 className={styles.heading}>{problemSection.heading}</h2>
          <p className={styles.subtitle}>{problemSection.subtitle}</p>
          <p className={styles.body}>{problemSection.body}</p>
        </div>

        {/* ── Full-Width Video Card ── */}
        <div className={styles.videoCard}>
          <div 
            className={styles.videoGradient} 
            style={problemSection.videoImage ? { backgroundImage: `url(${problemSection.videoImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            <button className={styles.playBtn} aria-label="Play Demo Video">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M8 5V19L19 12L8 5Z" fill="#111111" />
              </svg>
            </button>
            <p className={styles.demoCaption}>{problemSection.demoCaption}</p>
          </div>
        </div>

        {/* ── Stats Bar — Detached from the video card ── */}
        <div className={styles.statsRow}>
          {problemSection.stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
