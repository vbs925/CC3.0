import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface FooterOffice {
  name: string;
  address: string;
  email?: string;
}

interface FooterContent {
  brandDescription: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  offices: FooterOffice[];
  logo: string | null;
  termsUrl: string;
  privacyUrl: string;
  copyrightText: string;
}

interface FooterProps {
  footer: FooterContent;
}

// ── Icons ──────────────────────────────────────────────────────────────────

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    case "x":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l16 16M4 20L20 4" />
        </svg>
      );
    default:
      return null;
  }
};

// ── Component ──────────────────────────────────────────────────────────────

export default function Footer({ footer }: FooterProps) {
  if (!footer) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <h2 className={styles.brandTitle}>{footer.brandDescription}</h2>
            
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <div className={styles.socialRow}>
                {footer.socialLinks.map((social, i) => (
                  <a 
                    key={i}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={`Visit our ${social.platform}`}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links Columns */}
          {footer.columns && footer.columns.map((col, i) => (
            <div key={i} className={styles.linksCol}>
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <ul className={styles.linkList}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.url} className={styles.linkItem}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Offices Column */}
          {footer.offices && footer.offices.length > 0 && (
            <div className={styles.officesCol}>
              <h3 className={styles.colHeading}>OUR OFFICES</h3>
              <div className={styles.officesList}>
                {footer.offices.map((office, i) => (
                  <div key={i} className={styles.officeItem}>
                    <h4 className={styles.officeName}>{office.name}</h4>
                    <p className={styles.officeAddress}>{office.address}</p>
                    {office.email && (
                      <a href={`mailto:${office.email}`} className={styles.officeEmail}>
                        {office.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.logoWrap}>
            {footer.logo ? (
              <Image src={footer.logo} alt="CortexCraft.AI" width={300} height={100} style={{ objectFit: 'contain' }} />
            ) : (
              // Fallback logo if none is provided via CMS
              <div className={styles.fallbackLogo}>
                <Image src="/assets/images/CCAI logo 4.png" alt="CortexCraft.AI" width={450} height={150} style={{ objectFit: 'contain' }} />
              </div>
            )}
          </div>

          <div className={styles.bottomLinks}>
            <Link href={footer.termsUrl} className={styles.bottomLink}>{footer.termsUrl !== "#" ? "Terms & Conditions" : "Terms & Conditions"}</Link>
            <Link href={footer.privacyUrl} className={styles.bottomLink}>Privacy Policy</Link>
            <span className={styles.copyright}>{footer.copyrightText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
