"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "var(--color-white)",
        borderBottom: "1px solid var(--color-light-green)",
      }}
      className="w-full px-6 py-4"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide"
          style={{ color: "var(--color-orange-red)" }}
        >
          Shine Tea House
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden sm:flex gap-8 list-none m-0 p-0">
          <li>
            <Link href="/" className="text-sm tracking-wide hover:opacity-70 transition-opacity" style={{ color: "#333" }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm tracking-wide hover:opacity-70 transition-opacity" style={{ color: "#333" }}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-sm tracking-wide hover:opacity-70 transition-opacity" style={{ color: "#333" }}>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          className="sm:hidden mt-3 flex flex-col gap-4 px-6 pb-4 list-none m-0 p-0"
          style={{ borderTop: "1px solid var(--color-light-green)" }}
        >
          <li className="pt-3">
            <Link href="/" className="text-sm tracking-wide" style={{ color: "#333" }} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm tracking-wide" style={{ color: "#333" }} onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-sm tracking-wide" style={{ color: "#333" }} onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
