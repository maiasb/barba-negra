const FRASES = ["Barba", "Navalha", "Toalha quente", "Acabamento na régua", "Imagem masculina", "Castanhal"];

function Faixa({ oculta }: { oculta?: boolean }) {
  return (
    <ul className="marquee__set" aria-hidden={oculta || undefined}>
      {FRASES.map((f) => <li key={f}>{f}<i aria-hidden="true">✂</i></li>)}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-label="Barba, navalha, toalha quente e acabamento na régua">
      <div className="marquee__track">
        <Faixa />
        <Faixa oculta />
      </div>
    </div>
  );
}
