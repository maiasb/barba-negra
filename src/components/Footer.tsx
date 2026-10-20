import Image from "next/image";
import { SITE } from "@/data/site";

export function Footer() {
  const e = SITE.endereco;
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <a href="#inicio" className="logo" aria-label="Barba Negra">
            <Image src="/img/logo.png" alt="" width={56} height={56} className="logo__img" />
            <span className="logo__text"><strong>BARBA NEGRA</strong><small>Imagem Masculina</small></span>
          </a>
          <p className="footer__txt">Há {SITE.anos} anos cuidando da imagem do homem de Castanhal.</p>
        </div>
        <nav aria-label="Atalhos">
          <h4>Atalhos</h4>
          <a href="#sobre">Sobre nós</a>
          <a href="#servicos">Serviços</a>
          <a href="#barbeiros">Barbeiros</a>
          <a href="#agendar">Agendar</a>
          <a href="#unidade">Unidade</a>
        </nav>
        <div>
          <h4>Contato</h4>
          <p>{e.rua}, {e.bairro}<br />{e.cidade} - {e.uf}</p>
          <p>(91) 98610-7480</p>
          <p><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@barbanegracastanhal</a></p>
          <a href="#inicio">↑ Topo</a>
        </div>
      </div>
      <p className="footer__bar">Barba Negra - Imagem Masculina - {new Date().getFullYear()}, Todos os Direitos Reservados.</p>
    </footer>
  );
}
