'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Users, Target, ChevronRight } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spectra-violet/20 rounded-full blur-[128px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spectra-purple/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo animé */}
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src="/logo.png"
                  alt="Spectra Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.8)] animate-float"
                />
              </div>
            </div>

            {/* Titre principal */}
            <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tight mb-4">
                SPECTRA
              </h1>
              <p className="text-2xl md:text-3xl text-spectra-mauve font-light tracking-[0.3em] uppercase mb-8">
                Silent Impact
              </p>
            </div>

            {/* Description */}
            <div className={`transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl text-gray-300 max-w-2xl mb-12">
                Elite esports organization specialized in competitive FPS.
                We push the boundaries of excellence through our Rainbow Six Siege and Counter-Strike 2 teams.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/teams" className="btn-primary flex items-center gap-2">
                Discover our teams
                <ChevronRight size={20} />
              </Link>
              <Link href="/news" className="btn-secondary">
                News
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-spectra-violet/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-spectra-violet rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, value: '18', label: 'Professional Players', color: 'text-spectra-violet' },
              { icon: Trophy, value: '3', label: 'Active Teams', color: 'text-spectra-purple' },
              { icon: Target, value: '∞', label: 'Victories to Come', color: 'text-spectra-mauve' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card text-center group"
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} transition-transform duration-300 group-hover:scale-110`} />
                <div className="text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-white mb-16">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-spectra-violet to-spectra-mauve">Disciplines</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rainbow Six Siege */}
            <div className="glass-card group cursor-pointer overflow-hidden">
              <div className="relative h-48 mb-6 -mx-6 -mt-6">
                <div className="absolute inset-0 bg-gradient-to-br from-spectra-violet/20 to-spectra-purple/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-display font-bold text-white">Rainbow Six Siege</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Two elite teams (Main and Academy) dominate European competitive rankings. Tactics, precision and coordination are our watchwords.
              </p>
              <Link href="/teams?team=r6s-main" className="text-spectra-mauve hover:text-spectra-violet transition-colors inline-flex items-center gap-2">
                View rosters <ChevronRight size={16} />
              </Link>
            </div>

            {/* Counter-Strike 2 */}
            <div className="glass-card group cursor-pointer overflow-hidden">
              <div className="relative h-48 mb-6 -mx-6 -mt-6">
                <div className="absolute inset-0 bg-gradient-to-br from-spectra-purple/20 to-spectra-mauve/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-display font-bold text-white">Counter-Strike 2</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Our CS2 lineup combines experience and young talent to create explosive synergy on the competitive scene.
              </p>
              <Link href="/teams?team=cs2-main" className="text-spectra-mauve hover:text-spectra-violet transition-colors inline-flex items-center gap-2">
                View roster <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="glass-card text-center max-w-3xl mx-auto neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Join the Spectra Adventure
            </h2>
            <p className="text-gray-400 mb-8">
              Are you a talented player or a company interested in a partnership? Contact us!
            </p>
            <Link href="/sponsors" className="btn-primary inline-flex items-center gap-2">
              Contact us
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
