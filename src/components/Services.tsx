"use client";
import { useState, useEffect } from "react";
import FAQ from "@/app/faq/FAQ";
import {
  PenTool,
  Monitor,
  Megaphone,
  LineChart,
  Palette,
  MessageSquare,
  Share2,
  Search,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      id: 1,
      icon: <Palette className="w-8 h-8" />,
      title: "Identité visuelle",
      description:
        "Une identité forte et cohérente pour que votre marque soit reconnue au premier regard, sur tous vos supports.",
    },
    {
      id: 2,
      icon: <Monitor className="w-8 h-8" />,
      title: "Site internet",
      description:
        "Des sites modernes, rapides et pensés pour vos visiteurs. Votre vitrine numérique mérite autant de soin que votre entreprise.",
    },
    {
      id: 3,
      icon: <LineChart className="w-8 h-8" />,
      title: "Marketing digital",
      description:
        "Analyse, stratégie et contenu : tout pour booster votre visibilité et transformer vos visiteurs en clients fidèles.",
    },
    {
      id: 4,
      icon: <PenTool className="w-8 h-8" />,
      title: "Graphisme",
      description:
        "Du logo à l'affiche publicitaire, chaque création est pensée pour raconter votre histoire et séduire votre public.",
    },
    {
      id: 5,
      icon: <Search className="w-8 h-8" />,
      title: "Référencement SEO",
      description:
        "Améliorez votre positionnement sur Google avec un SEO naturel et efficace, adapté à votre secteur et à vos clients.",
    },
    {
      id: 6,
      icon: <Share2 className="w-8 h-8" />,
      title: "Réseaux sociaux",
      description:
        "Faites vivre votre marque au quotidien grâce à une stratégie sociale cohérente et du contenu engageant.",
    },
    {
      id: 7,
      icon: <Megaphone className="w-8 h-8" />,
      title: "Publicité",
      description:
        "Des campagnes percutantes qui font parler de vous — sur le web, les réseaux ou les supports imprimés.",
    },
    {
      id: 8,
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Communication",
      description:
        "Nous vous aidons à transmettre le bon message, au bon moment, aux bonnes personnes. Votre image, notre priorité.",
    },
    {
      id: 9,
      icon: <Briefcase className="w-8 h-8" />,
      title: "Création d'entreprise",
      description:
        "De l'idée au lancement, nous vous accompagnons dans chaque étape pour poser des bases solides à votre projet.",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <section
      id="services"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto text-center px-4 py-16 sm:py-20 lg:pt-22">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl bg-orange-500 px-4 sm:px-6 py-2 inline-block transform -rotate-2 font-bold mb-6 sm:mb-8">
          Services
        </h2>

        <p className="text-orange-500 text-sm sm:text-base lg:text-lg pb-6 px-4 max-w-3xl mx-auto">
        {`  Chaque projet naît d'un besoin concret, évolue grâce à des solutions visuelles
          adaptées, et s'accomplit dans la réussite de vos objectifs.`}
        </p>

        {/* Carousel Mobile */}
        {isMobile ? (
          <div className="w-full max-w-md mx-auto mt-8 px-4">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="min-w-full bg-[#141414] hover:bg-[#1c1c1c] transition-all duration-300 p-6 min-h-[320px] shadow-lg border border-transparent hover:border-orange-500 flex flex-col justify-center items-center text-center"
                    >
                      <div className="mb-3 text-orange-500">{service.icon}</div>
                      <h3 className="text-xl font-bold text-orange-500 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutons de navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500/80 text-white p-2 transition-all z-10"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500/80 text-white p-2 transition-all z-10"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicateurs */}
              <div className="flex justify-center gap-2 mt-4">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 transition-all ${
                      currentSlide === index
                        ? "w-8 bg-orange-500"
                        : "w-2 bg-gray-600"
                    }`}
                    aria-label={`Aller au service ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grille Desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-0">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#141414] hover:bg-[#1c1c1c] transition-all duration-300 p-6 sm:p-8 min-h-[280px] sm:h-80 shadow-lg border border-transparent hover:border-orange-500 flex flex-col justify-center items-center text-center"
              >
                <div className="mb-3 sm:mb-4 text-orange-500">{service.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <FAQ />
    </section>
  );
}