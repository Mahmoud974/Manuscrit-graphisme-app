"use client"
import React from "react"

export default function BarAnimation() {
  const items = [
    "LOGO",
    "IDENTITÉ VISUELLE",
    "CHARTE GRAPHIQUE",
    "FLYER",
    "CARTE DE VISITE",
    "AFFICHE",
    "BROCHURE",
    "SITE VITRINE",
    "SITE E-COMMERCE",
    "UI / UX DESIGN",
    "RÉSEAUX SOCIAUX",
    "PACKAGING",
    "BRANDING",
    "CRÉATION SUR MESURE",
    "WEB DESIGN",
    "REFONTE DE SITE",
    "MAQUETTE FIGMA",
    "SEO",
    "MAINTENANCE WEB",
  ]

  const repeatedItems = Array(6).fill(items).flat()

  return (
    <div className="relative   z-20 -mt-16 w-full overflow-hidden">
      {/* Bande inclinée avec skew au lieu de rotate */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700   shadow-lg">
        <div className="py-6 md:py-8 lg:py-10 text-2xl md:text-3xl font-extrabold text-purple-950 uppercase tracking-wide whitespace-nowrap overflow-hidden">
          <div className="marquee flex items-center">
            <div className="marquee__inner flex items-center">
              {repeatedItems.map((item, index) => (
                <React.Fragment key={`${item}-${index}`}>
                  <span className="mx-8 flex items-center justify-center">{item}</span>
                  <span className="text-purple-950 text-2xl md:text-3xl flex items-center justify-center">
                    ◆
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}