"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BARBEIROS, SITE } from "@/data/site";

export function Barbeiros() {
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const step = () => {
    const el = track.current?.firstElementChild as HTMLElement | undefined;
    return el ? el.offsetWidth + 24 : 300;
  };
  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) => track.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <section id="barbeiros" className="section section--paper">
      <div className="wrap">
        <h2 className="title">Nossos Barbeiros</h2>
        <p className="lead" data-reveal>Profissionais experientes. Escolha o seu no agendamento ou deixe a gente indicar.</p>
        <div className="carousel carousel--grid">
          <button className="carousel__arrow carousel__arrow--l" onClick={() => go(-1)} aria-label="Barbeiro anterior">❮</button>
          <div className="carousel__track" ref={track} onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / step()))} tabIndex={0} aria-label="Lista de barbeiros">
            {BARBEIROS.map((b) => (
              <article key={b.id} className="scard" data-reveal>
                <Image src={b.img} alt={`${b.nome} da Barba Negra`} width={480} height={360} sizes="(max-width:700px) 90vw, 33vw" />
                <div className="scard__body">
                  <h3>{b.nome}</h3>
                  <em>{b.funcao}</em>
                  <a className="btn btn--steel btn--sm" href={SITE.agendamentoOnline} target="_blank" rel="noopener noreferrer">Agendar</a>
                </div>
              </article>
            ))}
          </div>
          <button className="carousel__arrow carousel__arrow--r" onClick={() => go(1)} aria-label="Próximo barbeiro">❯</button>
        </div>
        <div className="dots carousel--grid__dots" aria-label="Navegação dos barbeiros">
          {BARBEIROS.map((b, i) => (
            <button key={b.id} className={i === idx ? "is-on" : undefined} onClick={() => goTo(i)} aria-label={`Ir para ${b.nome}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
