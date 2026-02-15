"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const expTarget = 7;
      const projTarget = 100;
      const clientTarget = 94;

      let expCount = 0;
      let projCount = 0;
      let clientCount = 0;

      const interval = setInterval(() => {
        if (expCount < expTarget) expCount += 1;
        if (projCount < projTarget) projCount += 2;
        if (clientCount < clientTarget) clientCount += 1;

        setExperience(expCount);
        setProjects(projCount);
        setClients(clientCount);

        if (expCount >= expTarget && projCount >= projTarget && clientCount >= clientTarget) {
          clearInterval(interval);
        }
      }, 30);
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-[100vh] md:min-h-[100vh] h-auto lg:mb-0 mb-12 overflow-hidden text-white flex flex-col md:flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover min-h-[100vh]"
      >
        <source src="/images/background-video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col justify-between min-h-[100vh] md:min-h-[100vh] py-6 md:py-8 lg:py-0">
        <Navbar />

        <div className="container mx-auto text-left px-4 sm:px-6 md:px-8 lg:px-6 md:-mt-4 lg:-mt-12" ref={sectionRef}>
          {/* Titre - tailles progressives : mobile → tablette → desktop */}
          <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 block md:inline mx-auto md:mx-0 max-w-2xl md:max-w-none text-center md:text-left">
            Créez Votre Identité Visuelle <br />
            ou un{" "}
            <span className="bg-orange-500 px-3 py-1 transform">
              Site Unique
            </span>{" "}
            –  
            <br />Graphisme & Web Design
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto md:mx-0 text-center md:text-left">
            Infographiste, je crée des sites web sur mesure
            <br className="hidden md:block" />
            en cohérence avec votre identité visuelle.
          </p>

          {/* Stats - centrés sur mobile/tablette, alignés à gauche sur desktop */}
          <div className="flex flex-col md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:flex lg:flex-row lg:gap-x-0 justify-center items-center md:justify-items-center lg:justify-start lg:items-start text-center lg:text-left mt-6 md:mt-8">
            <div className="pb-10 md:pb-0 lg:pr-6 lg:pb-32 w-full max-w-xs md:max-w-none">
              <h3 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-orange-500 leading-none mb-0 text-center lg:text-left">
                +{experience}
              </h3>
              <p className="uppercase tracking-wide font-semibold text-orange-500 mb-1 text-center lg:text-left">
                ANNÉES Exp.
              </p>
              <p className="text-gray-300 text-sm text-center lg:text-left">
                Des années à transformer des<br/> visuels percutants.
              </p>
            </div>

            <div className="hidden lg:block h-28 border-l border-slate-100 mx-6 shrink-0"></div>

            <div className="pb-10 md:pb-0 lg:px-0 lg:pb-32 w-full max-w-xs md:max-w-none">
              <h3 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-orange-500 leading-none mb-0 text-center lg:text-left">
                +{projects}
              </h3>
              <p className="uppercase tracking-wide font-semibold text-orange-500 mb-1 text-center lg:text-left">
                Projets Réalisés
              </p>
              <p className="text-gray-300 text-sm text-center lg:text-left">
                Sites web, identités visuelles,<br/>
                logos et supports de communication.
              </p>
            </div>

            <div className="hidden lg:block h-28 border-l border-slate-100 mx-6 shrink-0"></div>

            <div className="pb-12 md:pb-0 lg:pl-0 lg:pb-32 w-full max-w-xs md:max-w-none">
              <h3 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-orange-500 leading-none mb-0 text-center lg:text-left">
                {clients}%
              </h3>
              <p className="uppercase tracking-wide font-semibold text-orange-500 mb-1 text-center lg:text-left">
                Clients Satisfaits
              </p>
              <p className="text-gray-300 text-sm text-center lg:text-left">
                Des projets menés avec soin<br/>
                et exigence professionnelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
