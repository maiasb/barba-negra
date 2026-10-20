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
      // Hero: cortina de aço sobe, o fundo faz zoom lento, as letras entram em sequência e um brilho percorre o título.
      const hero = gsap.timeline({ defaults: { immediateRender: false } });
      hero
        .to(".hero__curtain", { yPercent: -100, duration: 1.1, ease: "power4.inOut" })
        .fromTo(".hero__bg", { scale: 1.2 }, { scale: 1, duration: 2.8, ease: "power2.out", immediateRender: false }, 0)
        .fromTo("[data-word]", { y: 0, yPercent: 110, opacity: 0 }, { y: 0, yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 }, 0.65)
        .to("[data-word]", { color: "#fff", duration: 0.25, ease: "power1.in", yoyo: true, repeat: 1, stagger: 0.08 }, ">-0.2")
        .fromTo("[data-hero]", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.18 }, "<0.1");

      // Faixa: corre sempre e acelera (e inverte o sentido) com a rolagem.
      const loop = gsap.to(".marquee__track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          const dir = self.direction;
          gsap.to(loop, {
            timeScale: dir * (1 + Math.abs(self.getVelocity()) / 220), duration: 0.2, overwrite: true,
            onComplete: () => { gsap.to(loop, { timeScale: dir, duration: 1, overwrite: true }); },
          });
        },
      });

      // Fotos: a cortina abre de cima para baixo enquanto a imagem assenta (zoom de 1.25 para 1).
      // Observa o contêiner (a imagem recortada não conta como visível, então nunca carregaria). A foto da unidade
      // fica de fora: ela só entra com o reveal do cartão.
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          gsap.fromTo(en.target.querySelector("img"), { clipPath: "inset(0% 0% 100% 0%)", scale: 1.25 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, ease: "power3.out", clearProps: "scale", immediateRender: false });
        });
      }, { threshold: 0.35 });
      document.querySelectorAll(".scard").forEach((box) => io.observe(box));

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

      return () => io.disconnect();
    });

    return () => { mm.revert(); };
  }, []);

  return null;
}
