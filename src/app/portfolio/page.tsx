"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { portfolioProjects } from "../db/portfolioData";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

 
  const filters = [
    "All",
    "Identité Graphique",
    "Print & Flyers",
    
    "Sites Vitrine",
    "E-commerce",
  ];

  
  const projects = [
    { id: 1, title: "Massala Mayotte", category: "Identité Graphique", image: "/images/portfolios/massala/logo.png" },
    { id: 2, title: "Menu Restaurant", category: "Print & Flyers", image: "/images/portfolios/menu.png" },
    { id: 3, title: "React Energy Drink", category: "E-commerce", image: "/images/portfolios/menu.png" },
    { id: 4, title: "WebWize", category: "Sites Vitrine", image: "/images/portfolios/menu.png" },
    { id: 5, title: "Bongo Brew", category: "Identité Graphique", image: "/images/portfolios/menu.png" },
    { id: 6, title: "Sublime Store", category: "E-commerce", image: "/images/portfolios/menu.png" },
  ];

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
   
   

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <section
        className="relative -mt-46 min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center py-24 sm:py-32 px-4"
        style={{ backgroundImage: "url('/images/background-grey.png')" }}
      >
        {/* Titre */}
        <div className="text-center mb-16 mt-20 sm:mt-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Portfolio
          </h1>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-300 text-base sm:text-lg">
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
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto px-4 sm:px-10 mb-24">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1b1b1b]/80 overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={`/item/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="relative w-full h-64 sm:h-72 overflow-hidden group">
                  <Image
                    src={project?.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
