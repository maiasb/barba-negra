"use client";

import Image from "next/image";
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

  const pronto = servicos.length > 0 && dia && hora && nome.trim() !== "";

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
      `• Nome: ${nome.trim()}`,
      "",
      "Podem confirmar a disponibilidade?",
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  };

  return (
    <section id="agendar" className="section section--dark agenda">
      <div className="agenda__img" aria-hidden="true">
        <Image src="/img/form.jpeg" alt="" fill sizes="50vw" />
      </div>
      <div className="wrap agenda__grid">
        <header className="agenda__head" data-reveal>
          <h2 className="agenda__title">Agendamento Online</h2>
          <p>Monte seu atendimento em 4 passos. Enviamos tudo pronto no WhatsApp.</p>
        </header>

        <div className="book" data-reveal>
          <div className="book__form">
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
            <div className="chips chips--bar">
              {[{ id: SEM_PREF, nome: "Sem preferência" }, ...BARBEIROS].map((b) => (
                <button key={b.id} type="button" className="chip" aria-pressed={barbeiro === b.id} onClick={() => setBarbeiro(b.id)}>
                  {b.nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend><i>3</i> Dia <small>terça a sábado</small></legend>
            <div className="chips chips--day">
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
            <label htmlFor="a-nome">Seu nome</label>
            <input id="a-nome" required value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" />
            <a
              className={`btn btn--solid btn--lg${pronto ? "" : " is-disabled"}`}
              href={pronto ? waUrl(mensagem()) : undefined}
              aria-disabled={!pronto}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!pronto) e.preventDefault(); }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.5A9.94 9.94 0 1 0 12.04 2Zm5.8 14.05c-.25.7-1.45 1.34-2 1.4-.52.06-1.18.09-1.9-.12a17 17 0 0 1-1.72-.64c-3.02-1.3-4.99-4.34-5.14-4.54-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.04-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.02 2.12 1.34 2.42 1.5.3.14.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.17 1.42Z"/></svg>
              Enviar pelo WhatsApp
            </a>
            <p className="note">O horário fica reservado após a confirmação da barbearia no WhatsApp.</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
