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
      gsap.from("[data-word]", { yPercent: 110, opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.07, delay: 0.1 });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.from(els, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => gsap.to(o, {
            v: end, duration: 1.6, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("pt-BR") + suffix; },
          }),
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
