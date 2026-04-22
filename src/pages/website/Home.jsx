import HeroSlider from "../../components/HeroSlider";
import AboutNew from "../../components/AboutNew";
import ServicesNew from "../../components/ServicesNew";
import WhyUsNew from "../../components/WhyUsNew";
import { TestimonialsNew, CTASection } from "../../components/TestimonialsNew";
// Legacy components kept for reference — replaced in Part 1 & 2
// import About from "../../components/About";
// import Services from "../../components/Services";
// import WhyUs from "../../components/WhyUs";
import Clients from "../../components/Clients";
import Certificate from "../../components/Certificate";
import Experience from "../../components/Experience";
import Faq from "../../components/Faq";
import ChatBotNew from "../../components/ChatBotNew";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { structuredData } from "../../libs/static";

export default function Home() {
  const [isModal, setIsModal] = useState(false);

  const openQuote = () => setIsModal(true);

  return (
    <>
      <Helmet>
        <title>Technosaga Infotech | Leading Digital Marketing &amp; Web Development Company in Patna</title>
        <meta
          name="description"
          content="Technosaga Infotech is Patna's most trusted IT company — offering web design, app development, digital marketing, BPO services, graphic design, and event management across India and 15+ countries."
        />
        <meta
          name="keywords"
          content="digital marketing company Patna, web design Patna, app development Bihar, BPO services Patna, IT company Patna, SEO agency Bihar, Technosaga Infotech"
        />
        <meta name="author" content="Technosaga Infotech Pvt. Ltd." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://technosagainfotech.in/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <ChatBotNew />

      {/* Part 1 — Hero Slider */}
      <HeroSlider onQuote={openQuote} />

      {/* Part 2 — Home Page Sections */}
      <AboutNew onQuote={openQuote} />
      <ServicesNew onQuote={openQuote} />
      <WhyUsNew />
      <Clients />
      <Certificate />
      <Experience />
      <TestimonialsNew />
      <Faq />
      <CTASection onQuote={openQuote} />
    </>
  );
}
