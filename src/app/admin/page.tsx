"use client";
import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adresse :", email);
    console.log("Mot de passe :", password);
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/images/background-grey.png')",
      }}
    >
      {/* Voile sombre */}
      <div className="absolute inset-0 bg-black/60"></div>
 
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-sm p-10  text-black shadow-2xl w-full max-w-md z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Connexion
        </h2>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-3">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 border-2 border-gray-300  focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
            placeholder="exemple@mail.com"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-lg mb-3">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 border-2 border-gray-300  focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white py-3  text-xl font-semibold hover:bg-purple-900 transition-all"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
