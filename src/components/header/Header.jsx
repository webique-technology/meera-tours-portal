"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteInfo } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href) {
    return pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src="/images/meera-brand-logo.png"
            alt="Meera Tours and Travels"
            className="img-fluid brand-logo"
          />
        </Link>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link${isActive(link.href) ? " is-active" : ""}`}
            >
              <span className="nav__icon" aria-hidden="true">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <Link href="/contact" className="header-help">
            Help
          </Link>
          <Link href="/contact" className="header-user">
            Hi, Guest
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <nav
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav__link${isActive(link.href) ? " is-active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {link.icon} {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav__link"
          onClick={() => setOpen(false)}
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
