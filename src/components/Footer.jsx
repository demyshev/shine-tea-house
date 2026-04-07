export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-6 text-center text-sm"
      style={{
        backgroundColor: "var(--color-light-green)",
        color: "#555",
      }}
    >
      <p className="font-semibold tracking-wide" style={{ color: "#333" }}>
        Shine Tea House
      </p>
      <p className="mt-1">Los Angeles, CA</p>
    </footer>
  );
}
