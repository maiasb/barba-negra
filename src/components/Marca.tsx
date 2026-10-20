import { MARCA_BENEFICIOS } from "@/data/site";

export function Marca() {
  return (
    <section className="section section--dark marca">
      <div className="wrap">
        <p className="marca__mark" aria-hidden>BARBA NEGRA</p>
        <h2 className="title title--light" data-reveal>
          A Barba Negra é pra você que <span>quer:</span>
        </h2>
        <ul className="timeline">
          {MARCA_BENEFICIOS.map((b) => <li key={b} data-reveal>{b}</li>)}
        </ul>
        <p className="marca__end" data-reveal>Seu estilo, sua marca, seu melhor todos os dias. Vem pra Barba Negra!</p>
      </div>
    </section>
  );
}
