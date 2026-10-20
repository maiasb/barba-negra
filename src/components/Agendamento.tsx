"use client";

import { useEffect, useMemo, useState } from "react";
import { BARBEIROS, SERVICOS, waUrl } from "@/data/site";

const SEM_PREF = "sem-preferencia";
const DIAS_ABERTOS = [2, 3, 4, 5, 6]; // terça a sábado
const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

// 09:00 até 19:30, de 30 em 30 minutos (fecha às 20h)
const HORARIOS = Array.from({ length: 22 }, (_, i) => {
  const m = 9 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});

type Dia = { iso: string; label: string; data: Date };

function proximosDias(qtd: number): Dia[] {
  const out: Dia[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < qtd) {
    if (DIAS_ABERTOS.includes(d.getDay())) {
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      out.push({ iso: `${d.getFullYear()}-${mm}-${dd}`, label: `${SEMANA[d.getDay()]}, ${dd}/${mm}`, data: new Date(d) });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function Agendamento() {
  const [servicos, setServicos] = useState<string[]>([]);
  const [barbeiro, setBarbeiro] = useState<string>(SEM_PREF);
  const [dias, setDias] = useState<Dia[]>([]);
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [nome, setNome] = useState("");

  // datas calculadas só no cliente para não divergir da renderização do servidor
  useEffect(() => setDias(proximosDias(10)), []);

  // pré-seleção vinda dos botões "Agendar" dos serviços e dos barbeiros
  useEffect(() => {
    const onServico = (e: Event) => setServicos((s) => { const id = (e as CustomEvent<string>).detail; return s.includes(id) ? s : [...s, id]; });
    const onClick = (e: MouseEvent) => {
      const id = (e.target as HTMLElement).closest<HTMLElement>("[data-barbeiro]")?.dataset.barbeiro;
      if (id) setBarbeiro(id);
    };
    window.addEventListener("bn:servico", onServico);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("bn:servico", onServico); document.removeEventListener("click", onClick); };
  }, []);

  const horarios = useMemo(() => {
    const d = dias.find((x) => x.iso === dia);
    if (!d) return HORARIOS;
    const agora = new Date();
    if (d.data.toDateString() !== agora.toDateString()) return HORARIOS;
    const min = agora.getHours() * 60 + agora.getMinutes() + 30;
    return HORARIOS.filter((h) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3)) >= min);
  }, [dia, dias]);

  const toggle = (id: string) =>
    setServicos((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const pronto = servicos.length > 0 && dia && hora;

  const mensagem = () => {
    const nomes = SERVICOS.filter((s) => servicos.includes(s.id)).map((s) => s.nome).join(", ");
    const b = BARBEIROS.find((x) => x.id === barbeiro)?.nome ?? "Sem preferência";
    const d = dias.find((x) => x.iso === dia)?.label ?? "";
    return [
      "Olá, Barba Negra! Gostaria de agendar:",
      `• Serviços: ${nomes}`,
      `• Barbeiro: ${b}`,
      `• Dia: ${d}`,
      `• Horário: ${hora}`,
      nome ? `• Nome: ${nome}` : "",
      "",
      "Podem confirmar a disponibilidade?",
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  };

  return (
    <section id="agendar" className="section section--light">
      <div className="wrap">
        <header data-reveal>
          <h2 className="title">Agendamento Online</h2>
          <p className="lead">Monte seu atendimento em 4 passos. Enviamos tudo pronto no WhatsApp.</p>
        </header>

        <div className="book" data-reveal>
          <fieldset className="step">
            <legend><i>1</i> Serviços</legend>
            <div className="chips">
              {SERVICOS.map((s) => (
                <button key={s.id} type="button" className="chip" aria-pressed={servicos.includes(s.id)} onClick={() => toggle(s.id)}>
                  {s.nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend><i>2</i> Barbeiro</legend>
            <div className="chips">
              {[{ id: SEM_PREF, nome: "Sem preferência" }, ...BARBEIROS].map((b) => (
                <button key={b.id} type="button" className="chip" aria-pressed={barbeiro === b.id} onClick={() => setBarbeiro(b.id)}>
                  {b.nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend><i>3</i> Dia <small>terça a sábado</small></legend>
            <div className="chips">
              {dias.map((d) => (
                <button key={d.iso} type="button" className="chip" aria-pressed={dia === d.iso} onClick={() => { setDia(d.iso); setHora(""); }}>
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend><i>4</i> Horário</legend>
            {dia ? (
              <div className="chips chips--time">
                {horarios.map((h) => (
                  <button key={h} type="button" className="chip" aria-pressed={hora === h} onClick={() => setHora(h)}>{h}</button>
                ))}
                {horarios.length === 0 && <p className="muted">Sem horários hoje. Escolha outro dia.</p>}
              </div>
            ) : (
              <p className="muted">Escolha um dia primeiro.</p>
            )}
          </fieldset>

          <div className="step step--end">
            <label htmlFor="a-nome">Seu nome (opcional)</label>
            <input id="a-nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" />
            <a
              className={`btn btn--solid btn--lg${pronto ? "" : " is-disabled"}`}
              href={pronto ? waUrl(mensagem()) : undefined}
              aria-disabled={!pronto}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!pronto) e.preventDefault(); }}
            >
              Enviar pelo WhatsApp
            </a>
            <p className="note">O horário fica reservado após a confirmação da barbearia no WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
