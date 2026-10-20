import { SITE } from "@/data/site";

const e = SITE.endereco;
const ITENS = [
  { q: "Qual o horário de funcionamento?", a: `Atendemos de ${SITE.horario.dias.toLowerCase()}, das 9h às 20h.` },
  { q: "Onde fica a Barba Negra?", a: `Na ${e.rua}, bairro ${e.bairro}, em ${e.cidade} - ${e.uf}.` },
  { q: "Como agendo meu horário?", a: "Escolha os serviços, o barbeiro, o dia e o horário na seção de agendamento. Enviamos tudo pronto para o nosso WhatsApp, e a equipe confirma a disponibilidade." },
  { q: "Posso escolher o barbeiro?", a: "Sim. No agendamento você escolhe o barbeiro ou marca “Sem preferência”." },
  { q: "Quais serviços vocês oferecem?", a: "Corte de cabelo, barba, sobrancelha, hidratação, higienização e depilação no ouvido." },
];

export function Faq() {
  return (
    <section className="section section--light">
      <div className="wrap wrap--narrow">
        <h2 className="title">Perguntas Frequentes</h2>
        <div className="faq">
          {ITENS.map((i) => (
            <details key={i.q} data-reveal>
              <summary>{i.q}</summary>
              <p>{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
