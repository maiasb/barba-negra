import Image from "next/image";
import { BARBEIROS } from "@/data/site";

export function Barbeiros() {
  return (
    <section id="barbeiros" className="section section--paper">
      <div className="wrap">
        <h2 className="title">Nossos Barbeiros</h2>
        <p className="lead" data-reveal>Profissionais experientes. Escolha o seu no agendamento ou deixe a gente indicar.</p>
        <div className="bgrid">
          {BARBEIROS.map((b) => (
            <article key={b.id} className="scard" data-reveal>
              <Image src={b.img} alt={`${b.nome} da Barba Negra`} width={480} height={360} sizes="(max-width:700px) 90vw, 33vw" />
              <div className="scard__body">
                <h3>{b.nome}</h3>
                <em>{b.funcao}</em>
                <a className="btn btn--steel btn--sm" href="#agendar" data-barbeiro={b.id}>Agendar</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
