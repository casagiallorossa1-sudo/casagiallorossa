import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Casa Giallorossa",
  description: "Ovunque sei, trovi romanisti veri. Scansiona una Porta, fai check-in, entra in chat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
