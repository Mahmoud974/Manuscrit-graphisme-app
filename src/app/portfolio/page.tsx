"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { portfolioProjects } from "../db/portfolioData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const filters = [
    "All",
    "Identité Graphique",
    "Print & Flyers",
    "Sites Vitrine",
    "E-commerce",
  ];

  const filtered =
    active === "All" 
      ? portfolioProjects 
      : portfolioProjects.filter((p) => p.categories.includes(active));

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [active, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === paginatedProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? paginatedProjects.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Navbar />
      <section
        className="relative -mt-60 min-h-screen text-white flex flex-col items-center py-24 sm:py-32 px-4 overflow-x-hidden"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          backgroundImage: "url('/images/background-grey.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1b1b1b",
        }}
      >
        {/* Titre */}
        <div className="text-center mb-16 mt-20 sm:mt-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Portfolio
          </h1>

          {/* Filtres Desktop */}
          <div className="hidden md:flex flex-wrap justify-center gap-8 text-gray-300 text-base sm:text-lg">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActive(f);
                  setCurrentPage(1);
                }}
                className={`pb-2 relative transition-all ${
                  active === f
                    ? "text-orange-500 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-500"
                    : "hover:text-orange-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Filtres Mobile - Menu déroulant */}
          <div className="md:hidden w-full max-w-xs mx-auto">
            <select
              value={active}
              onChange={(e) => {
                setActive(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 bg-[#1b1b1b]/80 border border-gray-600 text-gray-300 rounded focus:outline-none focus:border-orange-500 transition-all"
            >
              {filters.map((f) => (
                <option key={f} value={f} className="bg-[#1b1b1b] text-gray-300">
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

    
        {isMobile ? (
          <div className="w-full max-w-md mx-auto mb-24 px-4">
            <div className="relative">
              {/* Carousel */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {paginatedProjects.map((project) => (
                    <Link 
                      key={project.id}
                      href={`/item/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="min-w-full"
                    >
                      <div className="bg-[#1b1b1b]/80 overflow-hidden shadow-md">
                        <div className="relative w-full h-64 overflow-hidden group">
                          <Image
                            src={project.mainImage}
                            alt={project.title}
                            fill
                            className="object-cover   group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-white text-center">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Boutons de navigation */}
              {paginatedProjects.length > 1 && (
                <>
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
                    {paginatedProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 transition-all ${
                          currentSlide === index
                            ? "w-8 bg-orange-500"
                            : "w-2 bg-gray-600"
                        }`}
                        aria-label={`Aller à la slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Grille Desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto px-4 sm:px-10 mb-24">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="bg-[#1b1b1b]/80 overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/item/${project.slug.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden group">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover   group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-white text-center">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mb-20">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm sm:text-base border border-gray-600 text-gray-400 hover:text-white hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 text-sm sm:text-base transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-orange-500 text-black font-semibold"
                  : "border border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-400"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm sm:text-base border border-gray-600 text-gray-400 hover:text-white hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  );
}