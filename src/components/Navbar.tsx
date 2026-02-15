"use client"
import   { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
 
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#services", label: "Prestations" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/#FAQ", label: "FAQ" },
  ]

  return (
    <nav
      className={`relative w-full z-50 transition-colors duration-500 ${
        menuOpen ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center gap-4 px-4 py-3 xl:px-8 xl:py-0 min-h-[60px] xl:min-h-0">
        {/* Logo - taille réduite sur mobile pour ne pas empiéter sur le hamburger */}
        <Link href='/' className="flex items-center shrink-0 min-w-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={260}
            height={260}
            quality={100}
            priority
            className="w-28 sm:w-36 md:w-42 lg:w-full max-w-[260px] h-auto object-contain"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden xl:flex space-x-8 text-base">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    relative px-6 py-2 font-semibold transition-all uppercase duration-300
                    ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-500'}
                  `}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Bouton contact Desktop */}
        <div className="hidden xl:block">
          <Button
            variant="default"
            className="text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-none px-8 py-5 transition-all"
          >
            <Link href='/#contact'>Contact</Link>
          </Button>
        </div>

        {/* Menu Hamburger Mobile (affiché uniquement quand menu fermé) */}
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="xl:hidden shrink-0 p-2 -m-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded z-[110]"
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} className="sm:w-8 sm:h-8" />
          </button>
        )}
      </div>

      {/* Menu Mobile plein écran - z-index élevé pour passer au-dessus de tout */}
      <div
        className={`fixed inset-0 w-full h-full min-h-[100dvh] bg-black text-white flex flex-col justify-between transition-all duration-500 ease-in-out z-[100] overflow-y-auto ${
          menuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Haut : logo + croix - safe area pour encoche */}
        <div className="flex justify-between items-center px-4 sm:px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 shrink-0">
          <Link href='/' onClick={() => setMenuOpen(false)} className="min-w-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={350}
              height={350}
              quality={100}
              className="w-28 sm:w-36 max-w-[180px] h-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="shrink-0 p-2 -m-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            aria-label="Fermer le menu"
          >
            <X size={32} className="sm:w-9 sm:h-9" />
          </button>
        </div>

        {/* Centre : liens - tailles responsive */}
        <ul className="flex flex-col items-center justify-center gap-8 sm:gap-10 flex-grow py-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    block text-xl sm:text-2xl font-semibold uppercase transition-all duration-300 py-2
                    ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-400 active:text-orange-400'}
                  `}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Bouton contact mobile - safe area bas */}
        <div className="flex justify-center pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-4 shrink-0">
          <Button
            variant="default"
            className="text-base sm:text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-none px-8 py-5 sm:px-10 sm:py-6 transition-all min-h-[48px]"
            asChild
          >
            <Link href='/#contact' onClick={() => setMenuOpen(false)}>Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}