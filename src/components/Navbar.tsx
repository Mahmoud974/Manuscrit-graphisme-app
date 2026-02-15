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
    { href: "/faq", label: "FAQ" },
  ]

  return (
    <nav
      className={`relative w-full z-50 transition-colors duration-500  ${
        menuOpen ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto  flex justify-between items-center  px-4 md:px-8">
        {/* Logo */}
        <Link href='/' className="flex   items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={260}
            height={260}
            quality={100}
            priority
            className='w-42  lg:w-full'
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden  md:flex space-x-8 text-base">
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
        <div className="hidden md:block">
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
            className="md:hidden text-white focus:outline-none z-50"
          >
            <Menu size={32} />
          </button>
        )}
      </div>

      {/* Menu Mobile plein écran */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black text-white flex flex-col justify-between transition-all duration-500 ease-in-out ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Haut : logo + croix */}
        <div className="flex justify-between items-center px-6 pt-6">
          <Link href='/' onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={350}
              height={350}
              quality={100}
              className='w-42 lg:w-full'
            />
          </Link>

          {/* Croix visible uniquement dans le menu ouvert */}
          <button onClick={() => setMenuOpen(false)} className="cursor-pointer text-white focus:outline-none">
            <X size={36} />
          </button>
        </div>

        {/* Centre : liens */}
        <ul className="flex flex-col items-center justify-center space-y-10 flex-grow">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    block text-2xl font-semibold uppercase transition-all duration-300
                    ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-400'}
                  `}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Bouton contact mobile */}
        <div className="flex justify-center pb-10">
          <Button
            variant="default"
            className="text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-none px-10 py-6 transition-all"
          >
            <Link href='/#contact' onClick={() => setMenuOpen(false)}>Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
