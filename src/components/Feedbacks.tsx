"use client";

import { useEffect, useState } from "react";
import { AVALIACOES, MAPS_LINK } from "@/data/site";

const INTERVALO_MS = 5000;

export function Feedbacks() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = AVALIACOES.length;

  useEffect(() => {
    if (total < 2 || pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAtual((i) => (i + 1) % total), INTERVALO_MS);
    return () => clearInterval(id);
  }, [total, pausado, atual]);

  return (
    <section id="feedbacks" className="section section--dark">
      <div className="wrap reviews">
        <h2 className="reviews__title">O que nossos clientes dizem</h2>
        <div
          className="reviews__list"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocus={() => setPausado(true)}
          onBlur={() => setPausado(false)}
        >
          <div className="reviews__stack" aria-live="off">
            {AVALIACOES.map((a, i) => (
              <figure key={a.id} className={`review${i === atual ? " is-on" : ""}`} aria-hidden={i !== atual}>
                <p>&ldquo;{a.texto}&rdquo;</p>
                <footer>
                  <span className="review__avatar" aria-hidden="true">{a.nome[0]}</span>
                  <div>
                    <b className="review__name">{a.nome}</b>
                    <span className="review__stars" aria-label={`${a.nota} de 5 estrelas`}>{"★".repeat(a.nota)}</span>
                    <span className="review__src">Google Review</span>
                  </div>
                </footer>
              </figure>
            ))}
          </div>
          {total > 1 && (
            <div className="dots">
              {AVALIACOES.map((a, i) => (
                <button key={a.id} type="button" className={i === atual ? "is-on" : ""} aria-label={`Ver avaliação de ${a.nome}`} onClick={() => setAtual(i)} />
              ))}
            </div>
          )}
          <p className="center">
            <a className="btn btn--steel btn--sm" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver avaliações no Google</a>
          </p>
        </div>
      </div>
    </section>
  );
}
