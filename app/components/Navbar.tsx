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
          <img src="/assets/images/logo.png" alt="CortexCraft.AI Logo" height="32" style={{ objectFit: 'contain' }} />
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
