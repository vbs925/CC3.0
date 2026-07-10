import defaultStyles from "./ProductDetail.module.css";

interface ProductNavProps {
  data: {
    prevLabel: string;
    prevUrl: string;
    nextLabel: string;
    nextUrl: string;
  };
  customStyles?: any;
}

export default function ProductDetailNavigation({ data, customStyles }: ProductNavProps) {
  const styles = customStyles || defaultStyles;
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
