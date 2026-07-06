"use client";

import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Services", href: "#" },
  { label: "Expertise", href: "#" },
  { label: "Products", href: "#", active: true },
  { label: "Works", href: "#", underline: true },
  { label: "About", href: "#", underline: true },
  { label: "Blogs", href: "#" },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <a href="#" className={styles.logo} id="logo-link">
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#F5A623" />
              <path d="M8 10 L14 7 L20 10 L20 18 L14 21 L8 18 Z" stroke="#fff" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="14" r="3" fill="#fff" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoBrand}>CORTEX</span>
            <span className={styles.logoSub}>CRAFT.AI</span>
          </div>
        </a>

        {/* Nav Links */}
        <ul className={styles.navLinks} role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.navLink} ${link.active ? styles.navLinkActive : ""} ${link.underline ? styles.navLinkUnderline : ""}`}
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#" className={styles.ctaBtn} id="nav-cta-btn">
          Get in touch
        </a>
      </nav>
    </header>
  );
}
