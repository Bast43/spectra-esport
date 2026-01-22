'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Twitch, Instagram, ExternalLink } from 'lucide-react'
import { XIcon } from '@/components/XIcon'
import { SwissFlag } from '@/components/SwissFlag'

export default function Footer() {
  const socialLinks = [
    { 
      icon: XIcon, 
      href: 'https://x.com/SpectraEU', 
      label: 'X',
      color: 'hover:text-white'
    },
    { 
      icon: Twitch, 
      href: 'https://www.twitch.tv/spectraqg', 
      label: 'Twitch',
      color: 'hover:text-[#9146FF]'
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/spectraeu/', 
      label: 'Instagram',
      color: 'hover:text-[#E4405F]'
    },
    { 
      icon: ExternalLink, 
      href: 'https://linktr.ee/spectraeu', 
      label: 'Linktree',
      color: 'hover:text-spectra-mauve'
    },
  ]

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/teams', label: 'Teams' },
    { href: '/news', label: 'News' },
    { href: '/results', label: 'Results' },
    { href: '/sponsors', label: 'Partners' },
  ]

  return (
    <footer className="relative bg-spectra-darker border-t border-spectra-violet/20 mt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-spectra-violet/5 to-spectra-violet/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et tagline */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Spectra Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-exo2 font-bold text-white tracking-wider">
                  SPECTRA
                </span>
                <span className="text-xs text-spectra-mauve font-light tracking-[0.2em] uppercase">
                  Silent Impact
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Swiss esports organization competing at the highest European level.
            </p>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                <SwissFlag className="w-6 h-6" />
                <span className="text-sm font-semibold text-white">Switzerland</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 ml-3 select-all">CHE-461.603.543</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-display font-semibold text-white mb-2">Navigation</h3>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm text-gray-400 hover:text-spectra-mauve transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-display font-semibold text-white mb-2">Social</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:border-spectra-violet/50 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
                
              ))}
            </div>
            <a
              href="mailto:spectraeu.contact@gmail.com"
              className="inline-block text-spectra-mauve hover:text-spectra-violet font-medium transition-colors underline mt-4"
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-spectra-violet/20 text-center space-y-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Spectra Esport. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 inline-flex items-center justify-center gap-2 flex-wrap">
            Made with <span className="text-red-500">❤️</span> in <SwissFlag className="w-5 h-5" /> Switzerland
          </p>
        </div>
      </div>
    </footer>
  )
}
