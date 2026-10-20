const STATS = [
  { n: 8, label: "Anos de tradição" },
  { n: 6, label: "Serviços disponíveis" },
  { n: 5, label: "Dias de atendimento por semana" },
  { n: 4000, label: "Seguidores no Instagram" },
];

export function Sobre() {
  return (
    <section id="sobre" className="section section--light">
      <div className="wrap">
        <h2 className="title">Sobre Nós</h2>
        <p className="lead" data-reveal>
          Há 8 anos a Barba Negra cuida da imagem do homem de Castanhal, com atendimento individual,
          produtos de qualidade e acabamento na navalha.
        </p>
        <ul className="stats">
          {STATS.map((s) => (
            <li key={s.label} className="stat" data-reveal>
              <b>+ de <span data-count={s.n}>{s.n.toLocaleString("pt-BR")}</span></b>
              <i />
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
