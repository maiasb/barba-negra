import Image from "next/image";
import { SITE, waUrl } from "@/data/site";

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <Image src="/img/hero-salao.jpg" alt="Barbeiros atendendo na Barba Negra, em Castanhal" fill priority sizes="100vw" className="hero__bg" />
      <div className="hero__shade" />
      <div className="hero__in">
        <h1 className="hero__mark" aria-label="Barba Negra - Barbearia em Castanhal">
          <span className="word"><span data-word>BARBA</span></span>{" "}
          <span className="word"><span data-word>NEGRA</span></span>
          <small>Barbearia em Castanhal · Imagem Masculina</small>
        </h1>
        <div className="hero__btns" data-reveal>
          <a href="#agendar" className="btn btn--steel">Agendamento Online</a>
          <a href={waUrl("Olá, Barba Negra! Gostaria de agendar um horário.")} target="_blank" rel="noopener noreferrer" className="btn btn--steel">Agendamento WhatsApp</a>
        </div>
        <p className="hero__tag" data-reveal>{SITE.anos} anos de tradição · Terça a sábado, 9h às 20h</p>
      </div>
    </section>
  );
}
