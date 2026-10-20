import Image from "next/image";
import { SITE } from "@/data/site";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#barbeiros", label: "Barbeiros" },
  { href: "#unidade", label: "Unidade" },
  { href: "#feedbacks", label: "Feedbacks" },
];

export function Header() {
  return (
    <header className="header">
      <div className="header__in">
        <a href="#inicio" className="logo" aria-label="Barba Negra - Imagem Masculina">
          <Image src="/img/logo.png" alt="" width={44} height={44} className="logo__img" />
          <span className="logo__text"><strong>BARBA NEGRA</strong><small>Imagem Masculina</small></span>
        </a>
        <nav className="nav" aria-label="Principal">
          {LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="social">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Barba Negra">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Barba Negra">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.5A9.94 9.94 0 1 0 12.04 2Zm5.8 14.05c-.25.7-1.45 1.34-2 1.4-.52.06-1.18.09-1.9-.12a17 17 0 0 1-1.72-.64c-3.02-1.3-4.99-4.34-5.14-4.54-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.04-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.02 2.12 1.34 2.42 1.5.3.14.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.17 1.42Z" /></svg>
          </a>
        </div>
      </div>
    </header>
  );
}
