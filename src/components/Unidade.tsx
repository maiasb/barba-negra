import Image from "next/image";
import { SITE, MAPS_LINK, waUrl } from "@/data/site";

export function Unidade() {
  const e = SITE.endereco;
  return (
    <section id="unidade" className="section section--paper">
      <div className="wrap">
        <h2 className="title">Nossa Unidade</h2>
        <article className="unit" data-reveal>
          <Image src="/img/post11.jpg" alt="Interior da Barba Negra em Castanhal" width={360} height={640} sizes="(max-width:700px) 90vw, 360px" />
          <div className="unit__body">
            <h3>Centro · Castanhal</h3>
            <ul>
              <li><b>Endereço:</b> {e.rua}, {e.bairro}, {e.cidade} - {e.uf}</li>
              <li><b>Horário:</b> {SITE.horario.dias}, 9h às 20h</li>
              <li><b>WhatsApp:</b> (91) 98610-7480</li>
              <li><b>Instagram:</b> <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@barbanegracastanhal</a></li>
            </ul>
            <div className="unit__btns">
              <a className="btn btn--steel" href={waUrl("Olá, Barba Negra! Gostaria de agendar um horário.")} target="_blank" rel="noopener noreferrer">Agendar Horário</a>
              <a className="btn btn--steel" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver no Mapa</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
