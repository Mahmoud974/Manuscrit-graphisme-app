"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ImageData = {
  file: File | null;
  preview: string;
  alt: string;
};

export default function FormulaireProjet() {
  const [images, setImages] = useState<ImageData[]>([
    { file: null, preview: "", alt: "" },
    { file: null, preview: "", alt: "" },
    { file: null, preview: "", alt: "" },
    { file: null, preview: "", alt: "" },
  ]);
  
  const [outils, setOutils] = useState<string[]>([""]);
  const [projets, setProjets] = useState<string[]>([""]);
  const [couleurs, setCouleurs] = useState<string[]>(["#000000", "#000000", "#000000", "#000000"]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gestion des images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = {
        ...newImages[index],
        file,
        preview: URL.createObjectURL(file),
      };
      setImages(newImages);
    }
  };

  const handleAltChange = (value: string, index: number) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt: value };
    setImages(newImages);
  };

  // Gestion des outils
  const addOutil = () => setOutils([...outils, ""]);
  const updateOutil = (value: string, index: number) => {
    const newOutils = [...outils];
    newOutils[index] = value;
    setOutils(newOutils);
  };

  // Gestion des projets
  const addProjet = () => setProjets([...projets, ""]);
  const updateProjet = (value: string, index: number) => {
    const newProjets = [...projets];
    newProjets[index] = value;
    setProjets(newProjets);
  };

  // Gestion des couleurs
  const updateCouleur = (value: string, index: number) => {
    const newCouleurs = [...couleurs];
    newCouleurs[index] = value;
    setCouleurs(newCouleurs);
  };

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validation des alts
    images.forEach((img, i) => {
      if (img.alt.length < 2) {
        newErrors[`alt${i}`] = "Le texte alt doit faire au moins 2 caractères";
      }
    });

    // Validation des outils
    outils.forEach((outil, i) => {
      if (outil.trim().length === 0) {
        newErrors[`outil${i}`] = "Outil requis";
      }
    });

    // Validation des projets
    projets.forEach((projet, i) => {
      if (projet.trim().length === 0) {
        newErrors[`projet${i}`] = "Projet requis";
      }
    });

    // Validation des couleurs
    couleurs.forEach((couleur, i) => {
      if (couleur !== "" && !/^#[0-9A-Fa-f]{6}$/.test(couleur)) {
        newErrors[`couleur${i}`] = "Code couleur invalide";
      }
    });

    // Validation de la description
    if (description.length < 10) {
      newErrors.description = "La description doit faire au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();
    images.forEach((img, i) => {
      if (img.file) formData.append(`image${i + 1}`, img.file);
      formData.append(`alt${i + 1}`, img.alt);
    });
    outils.forEach((outil, i) => formData.append(`outils[${i}]`, outil));
    projets.forEach((projet, i) => formData.append(`projets[${i}]`, projet));
    couleurs.forEach((color, i) => formData.append(`couleur${i + 1}`, color));
    formData.append("description", description);

    console.log("✅ Données prêtes à l'envoi :", Object.fromEntries(formData.entries()));
    alert("Formulaire validé avec succès !");
  };

  return (
    <section
     className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
      <div className="flex justify-between pb-9 w-full max-w-3xl">
        <button className="hover:text-orange-400">
          ← Retour aux projets
        </button>
        <button className="flex items-center text-orange-500 hover:text-orange-400">
          <Home className="w-5 h-5" />
          <p className="ml-2">Home</p>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-neutral-900 text-white rounded-2xl shadow-lg space-y-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Ajouter un Projet</h2>

        {/* IMAGES + ALTS */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">Images du projet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <label className="w-full cursor-pointer border-2 border-dashed border-neutral-700 rounded-lg p-4 text-center hover:border-orange-400 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, i)}
                    className="hidden"
                  />
                  {img.preview ? (
                    <Image
                      src={img.preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-neutral-400">Clique pour importer une image</span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder={`Texte alt ${i + 1}`}
                  value={img.alt}
                  onChange={(e) => handleAltChange(e.target.value, i)}
                  className="p-2 bg-neutral-800 border border-neutral-700 w-full text-sm rounded"
                />
                {errors[`alt${i}`] && (
                  <p className="text-red-500 text-xs">{errors[`alt${i}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* OUTILS */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400 flex justify-between">
            Outils utilisés
            <button
              type="button"
              onClick={addOutil}
              className="bg-orange-500 text-white px-3 py-1 text-sm rounded hover:bg-orange-600"
            >
              + Ajouter
            </button>
          </h3>
          <div className="space-y-2">
            {outils.map((outil, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={outil}
                  onChange={(e) => updateOutil(e.target.value, i)}
                  placeholder={`Outil ${i + 1}`}
                  className="p-2 bg-neutral-800 border border-neutral-700 w-full rounded"
                />
                {errors[`outil${i}`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`outil${i}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PROJETS */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400 flex justify-between">
            Projets
            <button
              type="button"
              onClick={addProjet}
              className="bg-orange-500 text-white px-3 py-1 text-sm rounded hover:bg-orange-600"
            >
              + Ajouter
            </button>
          </h3>
          <div className="space-y-2">
            {projets.map((projet, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={projet}
                  onChange={(e) => updateProjet(e.target.value, i)}
                  placeholder={`Projet ${i + 1}`}
                  className="p-2 bg-neutral-800 border border-neutral-700 w-full rounded"
                />
                {errors[`projet${i}`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`projet${i}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COULEURS */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">Codes couleur</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {couleurs.map((couleur, i) => (
              <div key={i} className="flex flex-col items-center">
                <input
                  type="color"
                  value={couleur}
                  onChange={(e) => updateCouleur(e.target.value, i)}
                  className="w-16 h-10 border border-neutral-600 cursor-pointer rounded"
                />
                <input
                  type="text"
                  value={couleur}
                  onChange={(e) => updateCouleur(e.target.value, i)}
                  placeholder="#ffffff"
                  className={`mt-2 p-1 bg-neutral-800 border ${
                    errors[`couleur${i}`] ? "border-red-500" : "border-neutral-700"
                  } text-center w-full rounded`}
                />
                {errors[`couleur${i}`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`couleur${i}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">Description</h3>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décris ton projet ici..."
            className="p-2 bg-neutral-800 border border-neutral-700 w-full rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* SUBMIT */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 font-semibold text-white transition rounded"
          >
            Enregistrer le projet
          </button>
        </div>
      </form>
    </section>
  );
}