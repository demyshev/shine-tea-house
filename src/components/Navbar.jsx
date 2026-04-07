"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "var(--color-bg)",
        borderBottom: "0.5px solid var(--color-border)",
      }}
      className="w-full px-6 py-5"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-orange-red)",
            fontSize: "1.25rem",
            fontWeight: 400,
            letterSpacing: "0.12em",
          }}
        >
          Shine Tea House
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden sm:flex gap-10 list-none m-0 p-0">
          {[["Home", "/"], ["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="nav-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5" style={{ height: "0.5px", backgroundColor: "var(--color-text-muted)" }} />
          <span className="block w-5" style={{ height: "0.5px", backgroundColor: "var(--color-text-muted)" }} />
          <span className="block w-5" style={{ height: "0.5px", backgroundColor: "var(--color-text-muted)" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          className="sm:hidden mt-4 flex flex-col gap-5 px-6 pb-5 list-none m-0 p-0"
          style={{ borderTop: "0.5px solid var(--color-border)" }}
        >
          {[["Home", "/"], ["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, href]) => (
            <li key={href} className="pt-4">
              <Link href={href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
