import styles from "./ProductDetail.module.css";

interface ProductNavProps {
  data: {
    prevLabel: string;
    prevUrl: string;
    nextLabel: string;
    nextUrl: string;
  };
}

export default function ProductDetailNavigation({ data }: ProductNavProps) {
  return (
    <nav className={styles.productNav} aria-label="Product Navigation">
      <div className={styles.productNavInner}>
        <a href={data.prevUrl} className={styles.productNavPrev}>
          {data.prevLabel}
        </a>
        <a href={data.nextUrl} className={styles.productNavNext}>
          {data.nextLabel}
        </a>
      </div>
    </nav>
  );
}
