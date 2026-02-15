"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import {
  getProjectBySlug,
  getNextProject,
  getPrevProject,
} from "@/app/db/portfolioData";

const getContrastTextColor = (bgColor: string): string => {
  let hex = bgColor.replace("#", "").trim();

  if (hex.length < 6) {
    hex = hex.padEnd(6, "0");
  }

  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const arrowProjects = " cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500 transition text-white p-2 -full z-10"

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const project = getProjectBySlug(slug);

  const [current, setCurrent] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const nextSlide = () => {
    if (!project) return;
    setCurrent((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = () => {
    if (!project) return;
    setCurrent((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalSlide = useCallback(() => {
    if (!project) return;
    setModalIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const prevModalSlide = useCallback(() => {
    if (!project) return;
    setModalIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  // Gestion du clavier pour le modal
  React.useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextModalSlide();
      } else if (e.key === "ArrowLeft") {
        prevModalSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextModalSlide, prevModalSlide]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Projet non trouvé</p>
      </div>
    );
  }

  const nextProject = getNextProject(project.id);
  const prevProject = getPrevProject(project.id);

  return (
    <>
      <div className="relative">
        <Navbar />

        <section
          className="relative -mt-60 flex flex-col items-center justify-center text-white px-4 sm:px-6 bg-cover bg-center bg-no-repeat min-h-screen"
          style={{ backgroundImage: "url('/images/background-grey.png')" }}
        >
          {/* Fil d'Ariane */}
          <nav className="text-sm   -mb-10 relative z-10 mt-56 sm:mt-60 w-full flex justify-start container">
            <div className="pl-2    lg:mt-12 mt-10 sm:pl-0">
              <Link
                href="/"
                className="text-orange-500 hover:underline font-medium"
              >
                Accueil
              </Link>
              <span className="text-gray-500"> &gt; </span>
              <Link
                href="/portfolio"
                className="text-orange-500 hover:underline font-medium"
              >
                Portfolio
              </Link>
              <span className="text-gray-500"> &gt; </span>
              <span className="text-gray-200">{project.title}</span>
            </div>
          </nav>

          {/* Titre */}
          <div className="relative z-10 text-center max-w-4xl mx-auto mt-24 mb-8 sm:mb-16 px-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100">
              {project.subtitle}
            </p>
          </div>

          {/* Image principale mobile (carrée – 4ème image) */}
          <div className="flex justify-center mb-12 sm:mb-20 relative z-10 w-full md:hidden px-4">
            <div
              className="w-full max-w-md aspect-square cursor-pointer hover:opacity-90 transition overflow-hidden"
              onClick={() => openModal(3)}
            >
              <Image
                src={project.images[3] ?? project.mainImage}
                alt={`Image principale ${project.title}`}
                width={500}
                height={500}
                className="object-cover w-full h-full -lg"
              />
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 md:grid-cols-3 container mb-16 items-start mx-auto gap-10 sm:gap-12 px-4 sm:px-6">
            {/* Colonne gauche */}
            <div>
              <div className="flex flex-row md:flex-col justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-500">
                    Outils utilisés
                  </h2>
                  <ul className="space-y-2 text-base sm:text-lg">
                    {project.tools.map((tool: string, index: number) => (
                      <li key={index}>• {tool}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 md:hidden">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-500">
                    Projet
                  </h2>
                  <ul className="space-y-2 text-base sm:text-lg">
                    {project.projectTypes.map((type: string, index: number) => (
                      <li key={index}>• {type}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-orange-500">
                Code(s) couleur(s)
              </h2>
              <div className="w-full flex justify-center mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
                  {project.colors.map((color: string, index: number) => (
                    <div
                      key={index}
                      className="h-20 sm:h-24 flex items-center justify-center font-medium text-sm sm:text-lg "
                      style={{
                        backgroundColor: color,
                        color: getContrastTextColor(color),
                      }}
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-orange-500">
                Description
              </h2>
              <div className="w-full flex justify-center mt-4">
                <p className="max-w-8xl text-gray-200 text-base sm:text-lg text-start sm:px-0 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Colonne milieu */}
            <div className="hidden md:block text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-500">
                Projet
              </h2>
              <ul className="space-y-2 text-base sm:text-lg">
                {project.projectTypes.map((type: string, index: number) => (
                  <li key={index}>• {type}</li>
                ))}
              </ul>
            </div>

            {/* Colonne droite : image principale desktop (4ème image, carrée) */}
            <div className="hidden md:flex flex-col items-center">
              <div
                className="w-full max-w-md aspect-square cursor-pointer hover:opacity-90 transition overflow-hidden"
                onClick={() => openModal(3)}
              >
                <Image
                  src={project.images[3] ?? project.mainImage}
                  alt={`Image principale ${project.title}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full -lg"
                />
              </div>
            </div>
          </div>

          {/* Carousel mobile – carré, commence à la 4ème image */}
          <div className="relative w-full mb-16 md:hidden px-4">
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {project.images.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="min-w-full flex justify-center cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <div className="w-full max-w-md aspect-square hover:opacity-90 transition overflow-hidden">
                      <Image
                        src={img}
                        alt={`Mockup ${index + 1}`}
                        width={600}
                        height={600}
                        className="shadow-lg object-cover w-full h-full -lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className=" cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500 transition text-white p-2 -full z-10"
                aria-label="Image précédente"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className=" cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500 transition text-white p-2 -full z-10"
                aria-label="Image suivante"
              >
                →
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-3 h-3 -full cursor-pointer transition-all ${
                      current === i ? "bg-orange-500 scale-110" : "bg-gray-400"
                    }`}
                    aria-label={`Aller à l'image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grille desktop – 3 premières images carrées */}
          <div className="hidden md:grid grid-cols-3 gap-10 items-center relative z-10 mb-16 container mx-auto px-4">
            {project.images.slice(0, 3).map((img: string, i: number) => (
              <div 
                key={i} 
                className="flex justify-center cursor-pointer hover:opacity-90 transition"
                onClick={() => openModal(i)}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <Image
                    src={img}
                    alt={`Mockup ${i + 1}`}
                    width={600}
                    height={600}
                    className="shadow-md object-cover w-full h-full -lg"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation projets */}
          <div className="container flex justify-between items-center mt-12 mb-24 text-sm sm:text-base px-4">
            <Link
              href={`/item/${prevProject.slug}`}
              className="text-orange-500 hover:text-orange-400 transition font-medium flex items-center gap-2"
            >
              ← {prevProject.title}
            </Link>

            <Link
              href={`/item/${nextProject.slug}`}
              className="text-orange-500 hover:text-orange-400 transition font-medium flex items-center gap-2"
            >
              {nextProject.title} →
            </Link>
          </div>
        </section>
      </div>

      {/* Modal carousel */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-orange-500 transition z-50"
            aria-label="Fermer"
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevModalSlide();
            }}
            className={arrowProjects}
            aria-label="Image précédente"
          >
            ←
          </button>

          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-3xl mx-auto aspect-square overflow-hidden">
              <Image
                src={project.images[modalIndex]}
                alt={`Image ${modalIndex + 1}`}
                width={1200}
                height={1200}
                className="w-full h-full object-cover -lg"
              />
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, i: number) => (
                <button
                  key={i}
                  onClick={() => setModalIndex(i)}
                  className={`w-3 h-3 -full cursor-pointer transition-all ${
                    modalIndex === i
                      ? "bg-orange-500 scale-110"
                      : "bg-gray-400"
                  }`}
                  aria-label={`Aller à l'image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextModalSlide();
            }}
            className={arrowProjects}
            aria-label="Image suivante"
          >
            →
          </button>
        </div>
      )}

      <Contact />
      <Footer />
    </>
  );
}