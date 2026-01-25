"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { portfolioProjects } from "@/app/db/portfolioData";

export default function Portfolio() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat -mt-12 pt-46 pb-24 text-white"
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto text-center px-4 ">
        <h2 className="lg:text-5xl text-2xl bg-orange-500 px-6 py-2 inline-block transform -rotate-2 font-bold mb-8  ">
          
            Portfolio
      
        </h2>

        <p className="lg:text-lg  max-w-4xl mx-auto text-orange-500 mb-16">
        {`  Chaque projet commence par une idée, évolue à travers des choix visuels forts,
          et s'accomplit dans la création d'une identité marquante.`}
        </p>
 
        <div className="relative">
          <div className="swiper-button-prev absolute -left-8 top-1/2 transform -translate-y-1/2 z-20 hover:bg-orange-600 text-white p-3 shadow-lg cursor-pointer transition">
            <ChevronLeft className="w-6 h-6" />
          </div>

          <div className="swiper-button-next absolute -right-8 top-1/2 transform -translate-y-1/2 z-20 hover:bg-orange-600 text-white p-3 shadow-lg cursor-pointer transition">
            <ChevronRight className="w-6 h-6" />
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {portfolioProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <Link href={`/item/${project.slug}`}>
                  <div className="bg-[#1e1e1e]/70 shadow-lg overflow-hidden transition-transform hover:scale-105">
                    <div className="w-full aspect-square">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="py-9 text-left">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.map((category, i) => (
                        <span
                          key={i}
                          className="bg-purple-950 text-md px-3 py-1 text-white"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-white font-semibold text-xl leading-snug">
                      {project.title}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-16">
          <button className="bg-purple-950 hover:bg-purple-800 text-white font-bold py-3 px-10 text-lg transition">
            <Link href="/portfolio">
              + DE PROJETS
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}