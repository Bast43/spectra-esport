'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Users, Target, ChevronRight } from 'lucide-react'

interface Team {
  id: string
  name: string
  game: string
  description: string
  logo?: string
  players: any[]
  shortName?: string // Ajouté pour compatibilité avec le JSON et le code
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    setMounted(true)
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      const res = await fetch('/api/data/teams')
      const data = await res.json()
      setTeams(data.teams || [])
    } catch (error) {
      console.error('Error loading teams:', error)
    }
  }

  // Group teams by game
  const gameGroups = teams.reduce((acc, team) => {
    if (!acc[team.game]) {
      acc[team.game] = []
    }
    acc[team.game].push(team)
    return acc
  }, {} as Record<string, Team[]>)

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
              <h1 className="text-6xl md:text-8xl font-exo2 font-black text-white tracking-tight mb-4">
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
              { icon: Users, value: teams.reduce((sum, t) => sum + t.players.length, 0).toString(), label: 'Competitive Players', color: 'text-spectra-violet' },
              { icon: Trophy, value: Object.keys(gameGroups).length.toString(), label: 'Active Disciplines', color: 'text-spectra-purple' },
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
            {Object.entries(gameGroups).map(([game, gameTeams], index) => {
              // Get logo from first team of this game
              const gameLogo = gameTeams[0]?.logo
              
              // Si le jeu est Rainbow Six Siege, afficher deux liens côte à côte pour Main et Academy
              if (game === 'Rainbow Six Siege') {
                // Chercher les deux équipes par leur shortName
                const mainTeam = gameTeams.find(t => t.shortName?.toLowerCase().includes('main'));
                const acaTeam = gameTeams.find(t => t.shortName?.toLowerCase().includes('academy'));
                return (
                  <div 
                    key={game} 
                    className="group cursor-pointer overflow-hidden bg-black/40 backdrop-blur-sm rounded-xl border-2 border-spectra-violet/50 hover:border-spectra-violet shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.8)] transition-all duration-300"
                  >
                    <div className="relative h-64 mb-6">
                      {/* Fond noir avec glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-spectra-violet/30 via-black/50 to-spectra-purple/30" />
                      {/* Lignes néon animées */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-spectra-violet to-transparent animate-pulse" />
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-spectra-violet to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                      <div className="absolute inset-0 p-8 flex items-center justify-center">
                        {gameLogo && gameLogo !== '/images/default-team.png' ? (
                          <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                            <Image
                              src={gameLogo}
                              alt={`${game} logo`}
                              fill
                              className="object-contain drop-shadow-[0_0_60px_rgba(139,92,246,1)] group-hover:drop-shadow-[0_0_80px_rgba(139,92,246,1)]"
                            />
                          </div>
                        ) : (
                          <h3 className="text-3xl font-display font-bold text-white">{game}</h3>
                        )}
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 mb-4">
                        {gameTeams.length > 1 
                          ? `${gameTeams.length} elite teams competing at the highest level.`
                          : gameTeams[0]?.description || 'Our competitive roster.'}
                      </p>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between">
                        {mainTeam && (
                          <Link 
                            href={`/teams?team=${mainTeam.id}`} 
                            className="text-spectra-mauve hover:text-spectra-violet transition-colors inline-flex items-center gap-2 w-full md:w-auto justify-center"
                          >
                            View roster SPECTRA <ChevronRight size={16} />
                          </Link>
                        )}
                        {acaTeam && (
                          <Link 
                            href={`/teams?team=${acaTeam.id}`} 
                            className="text-spectra-mauve hover:text-spectra-violet transition-colors inline-flex items-center gap-2 w-full md:w-auto justify-center"
                          >
                            View roster SPECTRA 67 <ChevronRight size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }
              // Sinon, comportement par défaut
              return (
                <div 
                  key={game} 
                  className="group cursor-pointer overflow-hidden bg-black/40 backdrop-blur-sm rounded-xl border-2 border-spectra-violet/50 hover:border-spectra-violet shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.8)] transition-all duration-300"
                >
                  <div className="relative h-64 mb-6">
                    {/* Fond noir avec glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-spectra-violet/30 via-black/50 to-spectra-purple/30" />
                    {/* Lignes néon animées */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-spectra-violet to-transparent animate-pulse" />
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-spectra-violet to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                      {gameLogo && gameLogo !== '/images/default-team.png' ? (
                        <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={gameLogo}
                            alt={`${game} logo`}
                            fill
                            className="object-contain drop-shadow-[0_0_60px_rgba(139,92,246,1)] group-hover:drop-shadow-[0_0_80px_rgba(139,92,246,1)]"
                          />
                        </div>
                      ) : (
                        <h3 className="text-3xl font-display font-bold text-white">{game}</h3>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 mb-4">
                      {gameTeams.length > 1 
                        ? `${gameTeams.length} elite teams competing at the highest level.`
                        : gameTeams[0]?.description || 'Our competitive roster.'}
                    </p>
                    <Link 
                      href={`/teams?team=${gameTeams[0]?.id}`} 
                      className="text-spectra-mauve hover:text-spectra-violet transition-colors inline-flex items-center gap-2"
                    >
                      View roster{gameTeams.length > 1 ? 's' : ''} <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
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
