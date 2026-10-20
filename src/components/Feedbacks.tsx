import { SITE } from "@/data/site";

export function Feedbacks() {
  return (
    <section id="feedbacks" className="section section--light">
      <div className="wrap wrap--narrow">
        <h2 className="title">O que nossos clientes dizem</h2>
        <p className="lead" data-reveal>
          Os feedbacks de quem já passou pela cadeira ficam salvos nos destaques do nosso Instagram.
        </p>
        <p className="center" data-reveal>
          <a className="btn btn--steel" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Ver feedbacks no Instagram</a>
        </p>
      </div>
    </section>
  );
}
