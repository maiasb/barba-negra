import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif" });
const sans = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

const title = "Barba Negra";
const description =
  "Barbearia em Castanhal há 8 anos: corte de cabelo, barba, sobrancelha e hidratação. Agende seu horário pelo WhatsApp. Terça a sábado, 9h às 20h, no Centro.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "pt_BR", url: "/", images: ["/img/hero-banner.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca o html antes da primeira pintura: o CSS esconde os itens animados só quando há JS e movimento permitido. */}
        <script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')" }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
