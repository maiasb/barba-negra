import Image from "next/image";

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
          <a href="#agendar" className="btn btn--steel btn--sm">Agendar</a>
        </nav>
      </div>
    </header>
  );
}
