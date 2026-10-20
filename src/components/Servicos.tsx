"use client";

import Image from "next/image";
import { useState } from "react";
import { SERVICOS, SITE } from "@/data/site";

const Scissors = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" /></svg>
);
const ArrowUR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export function Servicos() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="section section--light">
      <div className="wrap unit__wrap">
        <header className="unit__head" data-reveal>
          <p className="unit__eyebrow">O que fazemos</p>
          <h2 className="unit__title">Serviços</h2>
          <div className="unit__orn" aria-hidden="true"><i /><Scissors /><i /></div>
        </header>

        <div className="srv" data-reveal>
          <figure className="srv__media">
            {SERVICOS.map((s, i) => (
              <Image key={s.id} src={s.img} alt={s.nome} width={640} height={640} sizes="(max-width:900px) 100vw, 40vw" className={i === active ? "is-on" : undefined} />
            ))}
            <figcaption>
              {SERVICOS.map((s, i) => (
                <span key={s.id} className={i === active ? "is-on" : undefined} aria-hidden={i !== active}>
                  <small>{s.sub}</small>
                  <span>{s.texto}</span>
                </span>
              ))}
            </figcaption>
          </figure>

          <ol className="srv__list">
            {SERVICOS.map((s, i) => (
              <li key={s.id} className={i === active ? "is-on" : undefined} onMouseEnter={() => setActive(i)}>
                <button type="button" className="srv__row" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-pressed={i === active}>
                  <span className="srv__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="srv__txt">
                    <strong>{s.nome}</strong>
                    <small>{s.sub}</small>
                  </span>
                </button>
                <a className="srv__go" href={SITE.agendamentoOnline} target="_blank" rel="noopener noreferrer" aria-label={`Agendar ${s.nome}`}><ArrowUR /></a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
