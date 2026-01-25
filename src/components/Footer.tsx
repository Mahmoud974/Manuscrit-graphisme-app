"use client";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import { FaThreads, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 pb-16">
        
        {/* LOGO */}
        <div className="flex justify-center lg:justify-start lg:w-1/3">
          <Image
            src="/images/logo.png"
            alt="Logo Manuscrit Graphisme"
            width={260}
            height={260}
            className="mb-4"
          />
        </div>

        {/* LIENS */}
        <div className="flex flex-col sm:flex-row flex-wrap lg:w-2/3 gap-12 justify-center lg:justify-end text-center sm:text-left">
          
          {/* À propos */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-orange-500/30 inline-block pb-1">
              À propos
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-500 transition">Notre agence</li>
              <li className="hover:text-orange-500 transition">Méthode de travail</li>
              <li className="hover:text-orange-500 transition">Disponibilité</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-orange-500/30 inline-block pb-1">
              Services
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-500 transition">Identité visuelle</li>
              <li className="hover:text-orange-500 transition">Supports print</li>
              <li className="hover:text-orange-500 transition">Design digital</li>
              <li className="hover:text-orange-500 transition">Personnalisation</li>
            </ul>
          </div>

          {/* Réalisations */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-orange-500/30 inline-block pb-1">
              Réalisations
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-500 transition">Logo</li>
              <li className="hover:text-orange-500 transition">Site Web</li>
              <li className="hover:text-orange-500 transition">Flyer</li>
              <li className="hover:text-orange-500 transition">Voir le portfolio →</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-orange-500/30 inline-block pb-1">
              Contactez-nous
            </h3>
            <div className="flex justify-center sm:justify-start gap-5">
              <a href="https://www.tiktok.com/@manuscritgraphisme" target="_blank" className="text-gray-400 hover:text-orange-500">
                <FaTiktok className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/manuscritgraphisme/" target="_blank" className="text-gray-400 hover:text-orange-500">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.threads.com/@manuscritgraphisme?hl=fr" target="_blank" className="text-gray-400 hover:text-orange-500">
                <FaThreads className="w-6 h-6" />
              </a>
              <a href="mailto:contact@manuscritgraphisme.com" className="text-gray-400 hover:text-orange-500">
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400 px-6">
        <p className="leading-relaxed">
          <span className="hover:text-orange-500 cursor-pointer">Mentions légales</span> •{" "}
          <span className="hover:text-orange-500 cursor-pointer">Politique de confidentialité</span>
          <br className="sm:hidden" />
          <span className="block sm:inline"> © 2026 Manuscrit Graphisme</span>
        </p>
      </div>
    </footer>
  );
}