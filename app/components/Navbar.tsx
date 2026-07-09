"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

interface NavLink {
  label: string;
  url: string;
  isActive: boolean;
}

interface NavbarProps {
  navbar: {
    logo: string | null;
    ctaLabel: string;
    ctaUrl: string;
    links: NavLink[];
  };
}

export default function Navbar({ navbar }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <a href="#" className={styles.logo} id="logo-link">
          <img
            src={navbar.logo ?? "/assets/images/logo.png"}
            alt="CortexCraft.AI Logo"
            height="42"
            style={{ objectFit: "contain" }}
          />
        </a>

        {/* Hamburger Menu Toggle */}
        <button 
          className={styles.hamburger} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`}></span>
        </button>

        {/* Nav Links */}
        <div className={`${styles.navContent} ${isOpen ? styles.navContentOpen : ""}`}>
          <ul className={styles.navLinks} role="list">
            {navbar.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                className={`${styles.navLink} ${link.isActive ? styles.navLinkActive : ""}`}
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            </li>
          ))}
          </ul>

          {/* CTA */}
          <a href={navbar.ctaUrl} className={styles.ctaBtn} id="nav-cta-btn">
            {navbar.ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
