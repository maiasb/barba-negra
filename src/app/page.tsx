import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Sobre } from "@/components/Sobre";
import { Servicos } from "@/components/Servicos";
import { Marca } from "@/components/Marca";
import { Barbeiros } from "@/components/Barbeiros";
import { Agendamento } from "@/components/Agendamento";
import { Faq } from "@/components/Faq";
import { Unidade } from "@/components/Unidade";
import { Feedbacks } from "@/components/Feedbacks";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { SITE, MAPS_LINK } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: "Barba Negra - Imagem Masculina",
  url: SITE.url,
  image: `${SITE.url}/img/hero-banner.jpg`,
  telephone: `+${SITE.whatsapp}`,
  sameAs: [SITE.instagram],
  hasMap: MAPS_LINK,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.endereco.rua,
    addressLocality: SITE.endereco.cidade,
    addressRegion: SITE.endereco.uf,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: SITE.horario.abre,
      closes: SITE.horario.fecha,
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Sobre />
        <Servicos />
        <Marca />
        <Barbeiros />
        <Agendamento />
        <Faq />
        <Unidade />
        <Feedbacks />
      </main>
      <Footer />
      <WhatsAppFab />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
