import { AVALIACOES, MAPS_LINK } from "@/data/site";

export function Feedbacks() {
  return (
    <section id="feedbacks" className="section section--dark">
      <div className="wrap reviews">
        <h2 className="reviews__title">O que nossos clientes dizem</h2>
        <div className="reviews__list">
          {AVALIACOES.map((a) => (
            <figure key={a.id} className="review" data-reveal style={{ margin: 0 }}>
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
          <p className="center">
            <a className="btn btn--steel btn--sm" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver avaliações no Google</a>
          </p>
        </div>
      </div>
    </section>
  );
}
