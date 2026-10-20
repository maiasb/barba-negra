"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

const ABRE = Number(SITE.horario.abre.slice(0, 2));
const FECHA = Number(SITE.horario.fecha.slice(0, 2));
const DIAS_ABERTOS = [2, 3, 4, 5, 6]; // terça a sábado
const NOMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

// Horário de Castanhal (UTC-3), independente do fuso de quem acessa.
function agoraEmBelem() {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Belem", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
  const wd = p.find((x) => x.type === "weekday")?.value ?? "";
  const h = Number(p.find((x) => x.type === "hour")?.value ?? 0) % 24;
  return { dia: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd), h };
}

function calcular() {
  const { dia, h } = agoraEmBelem();
  if (DIAS_ABERTOS.includes(dia) && h >= ABRE && h < FECHA) return { aberto: true, texto: `Aberto · fecha às ${FECHA}h` };
  if (DIAS_ABERTOS.includes(dia) && h < ABRE) return { aberto: false, texto: `Fechado · abre hoje às ${ABRE}h` };
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    if (DIAS_ABERTOS.includes(d)) return { aberto: false, texto: `Fechado · abre ${i === 1 ? "amanhã" : NOMES[d]} às ${ABRE}h` };
  }
  return { aberto: false, texto: "Fechado" };
}

// Calculado só no cliente para não divergir do HTML estático gerado no build.
export function StatusAberto() {
  const [s, setS] = useState<{ aberto: boolean; texto: string } | null>(null);
  useEffect(() => {
    setS(calcular());
    const t = setInterval(() => setS(calcular()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`unit__status${s?.aberto ? " is-open" : ""}`} aria-live="polite" style={s ? undefined : { visibility: "hidden" }}>
      <i aria-hidden="true" />{s?.texto ?? "Fechado"}
    </span>
  );
}
