'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
  
    try {
      const apiUrl:any = process.env.NEXT_PUBLIC_LAMBDA_EMAIL_RESEND;
      
      if (!apiUrl) {
        setStatus('Configuration manquante ❌');
        setLoading(false);
        return;
      }
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          message: formData.message
        })
      });
  
      if (response.ok) {
        setStatus('Message envoyé avec succès ! ✅');
        setFormData({ nom: '', email: '', message: '' });
      } else {
        setStatus('Erreur lors de l\'envoi ❌');
      }
    } catch (error) {
      setStatus('Erreur de connexion ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center text-white lg:py-32 py-16 px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background-contact.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
      <h2 className="lg:text-5xl text-2xl bg-orange-500 px-6 py-2 inline-block transform -rotate-2 font-bold mb-8  ">
            Contact
        </h2>

        <p className="text-center text-orange-600 lg:text-lg max-w-5xl mb-10 leading-relaxed">
      {`    Chaque projet naît d'un besoin concret, évolue grâce à des solutions visuelles adaptées,
          et s'accomplit dans la réussite de vos objectifs.`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-center w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom complet"
              required
              className="w-full bg-white/10 border border-white/40 text-white placeholder-white/70 px-4 py-3 focus:border-white focus:ring-2 focus:ring-purple-700 transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse e-mail"
              required
              className="w-full bg-white/10 border border-white/40 text-white placeholder-white/70 px-4 py-3 focus:border-white focus:ring-2 focus:ring-purple-700 transition"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder="Votre message..."
            required
            className="w-full bg-white/10 border border-white/40 text-white placeholder-white/70 px-4 py-3 focus:border-white focus:ring-2 focus:ring-purple-700 resize-none transition"
          ></textarea>

          {status && (
            <p className={`text-center font-semibold ${status.includes('succès') ? 'text-green-400' : 'text-red-400'}`}>
              {status}
            </p>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-purple-800 text-white font-bold py-3 px-12 text-lg transition-all duration-300 shadow-lg hover:shadow-purple-900/40 disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}