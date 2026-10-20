"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SERVICOS, SITE } from "@/data/site";

export function Servicos() {
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const step = () => {
    const el = track.current?.firstElementChild as HTMLElement | undefined;
    return el ? el.offsetWidth + 24 : 300;
  };
  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) => track.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <section id="servicos" className="section section--light">
      <div className="wrap">
        <h2 className="title">Serviços</h2>
        <div className="carousel">
          <button className="carousel__arrow carousel__arrow--l" onClick={() => go(-1)} aria-label="Serviço anterior">❮</button>
          <div className="carousel__track" ref={track} onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / step()))} tabIndex={0} aria-label="Lista de serviços">
            {SERVICOS.map((s) => (
              <article key={s.id} className="scard">
                <Image src={s.img} alt={s.nome} width={480} height={360} sizes="(max-width:700px) 90vw, 33vw" />
                <div className="scard__body">
                  <h3>{s.nome}</h3>
                  <em>{s.sub}</em>
                  <p>{s.texto}</p>
                  <a className="btn btn--steel btn--sm" href={SITE.agendamentoOnline} target="_blank" rel="noopener noreferrer">Agendar</a>
                </div>
              </article>
            ))}
          </div>
          <button className="carousel__arrow carousel__arrow--r" onClick={() => go(1)} aria-label="Próximo serviço">❯</button>
        </div>
        <div className="dots" role="tablist" aria-label="Navegação dos serviços">
          {SERVICOS.map((s, i) => (
            <button key={s.id} className={i === idx ? "is-on" : undefined} onClick={() => goTo(i)} aria-label={`Ir para ${s.nome}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
