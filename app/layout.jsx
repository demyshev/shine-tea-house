import "./globals.css";

export const metadata = {
  title: "Shine Tea House",
  description: "Premium teas sourced in collaboration with Beijing Yabaolou Tea House.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }} className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
