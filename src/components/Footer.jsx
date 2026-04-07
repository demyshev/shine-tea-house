import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-green)",
        borderTop: "0.5px solid var(--color-border)",
      }}
      className="w-full px-6 py-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-orange-red)",
              fontSize: "1.1rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            Shine Tea House
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.1em",
              marginTop: "4px",
            }}
          >
            Los Angeles, CA
          </p>
        </div>

        <nav className="flex gap-6">
          {[["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
                fontSize: "0.7rem",
                fontWeight: 300,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          © {new Date().getFullYear()} Shine Tea House
        </p>
      </div>
    </footer>
  );
}
