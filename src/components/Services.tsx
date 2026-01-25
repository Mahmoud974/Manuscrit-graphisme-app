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
} from "lucide-react";
import { FaQ } from "react-icons/fa6";

export default function Services() {
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
        "Du logo à l’affiche publicitaire, chaque création est pensée pour raconter votre histoire et séduire votre public.",
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
        "De l’idée au lancement, nous vous accompagnons dans chaque étape pour poser des bases solides à votre projet.",
    },
  ];

  return (
    <section
    id="services"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white  "
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
    
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto text-center px-4 pt-22">
        <h2 className="text-5xl font-bold mb-8 inline-block">
          <span className="bg-orange-500 px-6 py-2 inline-block transform -rotate-2"  >
            Services
          </span>
        </h2>

        <p className="text-orange-500 text-lg pb-6">
          Chaque projet naît d’un besoin concret, évolue grâce à des solutions visuelles<br />
          adaptées, et s’accomplit dans la réussite de vos objectifs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#141414] hover:bg-[#1c1c1c] transition-all duration-300 p-8 h-80 shadow-lg border border-transparent hover:border-orange-500 flex  flex-col justify-center items-center text-center"
            >
              <div className="mb-4 text-orange-500">{service.icon}</div>
              <h3 className="text-2xl font-bold text-orange-500 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <FAQ/>
    </section>
  );
}
