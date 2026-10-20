import Image from "next/image";
import { SITE, MAPS_LINK } from "@/data/site";
import { StatusAberto } from "@/components/StatusAberto";

const ico = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const Pin = () => <svg {...ico}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
const Clock = () => <svg {...ico}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
const Chat = () => <svg {...ico}><path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" /></svg>;
const Insta = () => <svg {...ico}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>;
const Scissors = () => <svg {...ico}><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" /></svg>;
const Arrow = () => <svg {...ico}><path d="m3 11 18-8-8 18-2-8-8-2Z" /></svg>;

export function Unidade() {
  const e = SITE.endereco;
  const info = [
    { icon: <Pin />, label: "Endereço", valor: <>{e.rua} · {e.bairro}, {e.cidade} - {e.uf}</> },
    { icon: <Clock />, label: "Horário", valor: <>{SITE.horario.dias} · 9h às 20h</> },
    { icon: <Chat />, label: "WhatsApp", valor: <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">(91) 98610-7480</a> },
    { icon: <Insta />, label: "Instagram", valor: <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@barbanegracastanhal</a> },
  ];
  return (
    <section id="unidade" className="section section--paper">
      <div className="wrap unit__wrap">
        <header className="unit__head" data-reveal>
          <h2 className="unit__title">Nossa Unidade</h2>
          <div className="unit__orn" aria-hidden="true"><i /><Scissors /><i /></div>
        </header>

        <article className="unit" data-reveal>
          <Image src="/img/unidade.jpg" alt="Interior da Barba Negra em Castanhal, com barbeiros atendendo" fill sizes="(max-width:960px) 100vw, 960px" className="unit__bg" />
          <div className="unit__shade" aria-hidden="true" />
          <div className="unit__body">
            <StatusAberto />
            <h3>Centro · Castanhal</h3>
            <ul className="unit__info">
              {info.map((i) => (
                <li key={i.label}>
                  <span className="unit__ico">{i.icon}</span>
                  <span><small>{i.label}</small>{i.valor}</span>
                </li>
              ))}
            </ul>
            <div className="unit__btns">
              <a className="btn btn--steel" href={SITE.agendamentoOnline} target="_blank" rel="noopener noreferrer"><Scissors />Agendar horário</a>
              <a className="btn btn--ghost" href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><Arrow />Como chegar</a>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
