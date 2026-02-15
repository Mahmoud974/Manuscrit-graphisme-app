"use client";
import   { useState } from "react";
 
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faq = [
    {
      question: "Quels types de projets réalises-tu ?",
      answer:
        "Je conçois des identités visuelles complètes, des pitch decks professionnels et des interfaces UI/UX modernes pour startups, marques et entreprises innovantes.",
    },
    {
      question: "Comment se déroule la création d’un projet ?",
      answer:
        "Tout commence par un échange pour comprendre vos besoins. Ensuite, je propose une direction créative (palette, style, moodboard), puis je conçois les maquettes et déclinaisons graphiques avant validation finale.",
    },
    {
      question: "Combien de temps prend un projet ?",
      answer:
        "Selon la complexité, un projet d’identité graphique prend entre 5 et 10 jours. Un pitch deck complet ou une interface UI peut demander jusqu’à 3 semaines.",
    },
    {
      question: "Peut-on collaborer à distance ?",
      answer:
        "Absolument. Tous mes échanges se font par visio ou e-mail, avec un suivi clair et des points réguliers sur l’avancée du projet.",
    },
    {
      question: "Quels outils utilises-tu ?",
      answer:
        "J’utilise principalement Adobe Illustrator, Photoshop, Figma et des outils de prototypage modernes selon le type de projet.",
    },
  ];

  return (
    <>
    

     
      <section
        className="relative lg:-mt-46 min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center sm:py-32 px-4"
        id="FAQ" style={{ backgroundImage: "url('/images/background-grey.png')" }}
      >
        {/* Titre principal */}
        <div className="text-center mb-16 mt-20 sm:mt-32">
        <h2 className="lg:text-5xl text-2xl bg-orange-500 px-6 py-2 inline-block transform -rotate-2 font-bold mb-8  ">
          
          FAQ
        
      </h2>
          <p className="text-gray-300 lg:text-lg sm:text-xl max-w-2xl mx-auto">
            Voici les réponses aux questions les plus fréquentes à propos de mes services.
          </p>
        </div>

   
        <div className="w-full max-w-7xl mx-auto space-y-5 mb-24">
          {faq.map((item, index) => (
            <div
              key={index}
              className="border border-orange-500   overflow-hidden bg-[#1b1b1b]/80 backdrop-blur-sm cursor-pointer"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full text-left flex justify-between items-center px-6 py-5 hover:bg-[#222]/80 transition-all"
              >
                <span className="font-semibold text-lg sm:text-xl text-white">
                  {item.question}
                </span>
                <span className="text-orange-500 text-2xl font-bold">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="px-6 py-4 bg-[#141414]/90 text-gray-300 text-base leading-relaxed border-t border-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        
      </section>

    
    </>
  );
}
