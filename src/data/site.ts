// Fonte única dos dados do negócio. Origem: perfil público @barbanegracastanhal.

export const SITE = {
  nome: "Barba Negra",
  slogan: "Imagem Masculina",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Número extraído do link wa.me/message/SS2CNSTGIUT7D1 da bio. Confirmar com o cliente.
  whatsapp: "559186107480",
  whatsappLink: "https://wa.me/message/SS2CNSTGIUT7D1",
  instagram: "https://www.instagram.com/barbanegracastanhal/",
  endereco: {
    rua: "Tv. Tiradente, 3059",
    bairro: "Bocaiuva",
    cidade: "Castanhal",
    uf: "PA",
  },
  horario: { dias: "Terça a sábado", abre: "09:00", fecha: "20:00" },
  anos: 8,
} as const;

export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Barba Negra Barbearia, Tv. Tiradente, 3059, Bocaiuva, Castanhal, PA");

// Serviços vindos dos destaques do Instagram. Sem preços: não constam no perfil.
export const SERVICOS = [
  { id: "cabelo", sub: "Para todos os estilos", nome: "Corte de cabelo", img: "/img/post14.jpg", texto: "Corte perfeito, estilo único. Acabamento na régua e visual sempre alinhado." },
  { id: "barba", sub: "Toalha quente e navalha", nome: "Barba", img: "/img/post13.jpg", texto: "Toalha quente, navalha e o cuidado que a sua barba merece." },
  { id: "sobrancelha", sub: "Acabamento na lâmina", nome: "Sobrancelha", img: "/img/post12.jpg", texto: "Design discreto que valoriza o olhar sem perder a naturalidade." },
  { id: "hidratacao", sub: "Cuidado e brilho", nome: "Hidratação", img: "/img/post16.jpg", texto: "Tempo para você: hidratação que devolve brilho e maciez." },
  { id: "higienizacao", sub: "Pele limpa e cuidada", nome: "Higienização", img: "/img/post11.jpg", texto: "Limpeza e cuidado com a pele para fechar o atendimento." },
  { id: "depilacao", sub: "Mais higiene e conforto", nome: "Depilação no ouvido", img: "/img/post1.jpg", texto: "Mais higiene, confiança e conforto, com método seguro." },
] as const;

// TODO (cliente): trocar pelos nomes e fotos reais. Os nomes não constam no Instagram.
export const BARBEIROS = [
  { id: "b1", nome: "Barbeiro 1", funcao: "Barbeiro", img: "/img/post7.jpg" },
  { id: "b2", nome: "Barbeiro 2", funcao: "Barbeiro", img: "/img/post8.jpg" },
  { id: "b3", nome: "Barbeiro 3", funcao: "Barbeiro", img: "/img/post9.jpg" },
] as const;

export const MARCA_BENEFICIOS = [
  "Manter seu visual sempre alinhado",
  "Mais confiança no dia a dia",
  "Mais higiene e conforto no atendimento",
  "Um método seguro, com acabamento na navalha",
  "Cuidado que se vê, confiança que fica",
] as const;

export function waUrl(texto: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
}

// Avaliações reais do Google. Para incluir outras, copie o texto e o nome exatamente como no Google.
export const AVALIACOES = [
  {
    id: "gustavo-sibuya",
    nome: "Gustavo Sibuya",
    nota: 5,
    texto:
      "Cortei com o Rafael. Muita qualidade! Diferenciado. Mostrei uma foto minha mais antiga e pedi pra fazer igual (já pedi pra outros barbeiros lá em SP nunca fizeram igual) e o Rafael fez igual, porém melhor, mais certinho.",
  },
] as const;
