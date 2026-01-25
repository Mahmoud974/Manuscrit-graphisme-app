"use client";

import { Edit, Home, Trash, CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/getItems");
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        setData(data.projets);
      } catch (err) {
        console.error("Erreur lors du fetch :", err);
      }
    };
    getData();
  }, []);

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
      {/* ✅ Le lien Home reste visible à gauche, exactement comme sur ton image */}
      <div className="flex justify-start w-full max-w-6xl pt-10 pb-5   z-20 relative">
        <Link
          href="/"
          className="flex items-center text-orange-500 hover:text-orange-600 transition-all cursor-pointer"
        >
          <Home size={22} />
          <p className="ml-2 text-base font-medium">Home</p>
        </Link>
      </div>

 
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

       
      <div className="relative z-10 w-full max-w-6xl px-8 py-10 bg-white/90 backdrop-blur-sm shadow-2xl -2xl">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Liste des projets
        </h1>
        <p className="text-2xl pb-5 text-right">{data?.length} projets</p>
 
        <div className="overflow-y-auto max-h-[400px] border-y border-gray-300 shadow-inner -md">
          <table className="min-w-full text-left text-gray-700 text-lg">
            <thead className="bg-gray-200 text-gray-800 uppercase text-base sticky top-0 z-10">
              <tr>
                <th className="px-8 py-4">#</th>
                <th className="px-8 py-4">Nom</th>
                <th className="px-8 py-4">Catégorie</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((projet: any) => (
                <tr
                  key={projet.id}
                  className="hover:bg-gray-100 transition-all text-gray-800 border-b"
                >
                  <td className="px-8 py-5 text-xl">{projet.id}</td>
                  <td className="px-8 py-5 font-semibold text-xl">{projet.nom}</td>
                  <td className="px-8 py-5 text-lg">{projet.categorie}</td>
                  <td className="px-8 py-5 text-lg">{projet.date}</td>
                  <td className="px-8 py-5 flex justify-center space-x-3">
                    <button className="bg-orange-600 text-white px-5 py-2 cursor-pointer -md hover:bg-orange-700 transition-all text-lg font-medium">
                      <Edit />
                    </button>
                    <button className="bg-red-600 text-white px-5 py-2 cursor-pointer -md hover:bg-red-700 transition-all text-lg font-medium">
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton Ajouter un projet */}
        <div className="flex justify-end mt-8">
          <Link href="/admin/projets/edit">
            <button className="bg-purple-800 flex items-center cursor-pointer text-white px-6 py-3 text-lg font-semibold -md hover:bg-purple-900 transition-all">
              <CirclePlus />
              <p className="ml-2">Ajouter un projet</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
