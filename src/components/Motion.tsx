"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Anima só transform e opacity. Sem JS ou com prefers-reduced-motion, tudo fica visível.
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // O estado inicial (escondido) vem do CSS (.motion). Aqui só se anima até o estado final,
      // com fromTo para partir exatamente do mesmo estado e não haver salto. Nas palavras, y: 0 evita que o
      // GSAP herde em pixels o translateY(110%) do CSS e deixe o título preso fora da máscara.
      gsap.fromTo("[data-word]", { y: 0, yPercent: 110, opacity: 0 }, { y: 0, yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.07, delay: 0.1, immediateRender: false });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 95%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true, immediateRender: false }),
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const o = { v: 0 };
        const show = () => { el.textContent = Math.round(o.v).toLocaleString("pt-BR") + suffix; };
        ScrollTrigger.create({
          trigger: el, start: "top 95%", once: true,
          onEnter: () => {
            show();
            gsap.set(el, { opacity: 1 });
            gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: show });
          },
        });
      });

      gsap.to(".hero__bg", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
