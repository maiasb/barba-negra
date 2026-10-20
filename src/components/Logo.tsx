import Image from "next/image";

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <a href="#inicio" className="logo" aria-label="Barba Negra - Imagem Masculina">
      <Image src="/img/logo.png" alt="" width={size} height={size} className="logo__img" />
      <span className="logo__text">
        <strong>BARBA NEGRA</strong>
        <small>Imagem Masculina</small>
      </span>
    </a>
  );
}
