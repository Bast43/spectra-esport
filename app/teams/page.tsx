'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Twitch, Instagram, Users, Trophy } from 'lucide-react'
import { YouTubeIcon } from '@/components/YouTubeIcon'
import { TikTokIcon } from '@/components/TikTokIcon'
import { KickIcon } from '@/components/KickIcon'
import { XIcon } from '@/components/XIcon'
import { CountryFlag } from '@/components/CountryFlag'

interface SocialLink {
  url: string;
}

interface Player {
  id: string
  name: string
  role: string
  photo: string
  country?: string
  socials: {
    twitter?: string
    // Les autres champs sont migrés dans socialsLinks
  }
  socialsLinks?: SocialLink[]
}

interface Coach {
  id: string
  name: string
  photo: string
  country?: string
  socials: {
    twitter?: string
    // Les autres champs sont migrés dans socialsLinks
  }
  socialsLinks?: SocialLink[]
}

interface Team {
  id: string
  name: string
  shortName?: string
  game: string
  description: string
  coach?: Coach
  players: Player[]
}

interface StaffMember {
  id: string
  name: string
  role: string
  photo: string
  country?: string
  socials: {
    twitter?: string
    // Les autres champs sont migrés dans socialsLinks
  }
  socialsLinks?: SocialLink[]
}

interface Result {
  id: string;
  teamId: string;
  image: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>('r6s-main')

  useEffect(() => {
    Promise.all([
      fetch('/api/data/teams').then((res) => res.json()),
      fetch('/api/data/results').then((res) => res.json()),
    ])
      .then(([teamsData, resultsData]) => {
        setTeams(teamsData.teams || [])
        setStaff(teamsData.staff || [])
        // Convertir la structure {r6x:[], cs2:[], aca:[]} en liste plate
        const allResults = [
          ...(resultsData.r6x || []).map((r: any) => ({ ...r, teamId: 'r6x' })),
          ...(resultsData.cs2 || []).map((r: any) => ({ ...r, teamId: 'cs2' })),
          ...(resultsData.aca || []).map((r: any) => ({ ...r, teamId: 'aca' }))
        ]
        setResults(allResults)
        setLoading(false)
        
        // Check for team parameter in URL
        const urlParams = new URLSearchParams(window.location.search)
        const teamParam = urlParams.get('team')
        
        if (teamParam && teamsData.teams) {
          // If team param exists and team is found, set it as active
          const teamExists = teamsData.teams.find((t: Team) => t.id === teamParam)
          if (teamExists) {
            setActiveTab(teamParam)
          } else if (teamsData.teams.length > 0) {
            // Fallback to first team if param team doesn't exist
            setActiveTab(teamsData.teams[0].id)
          }
        } else if (teamsData.teams && teamsData.teams.length > 0) {
          // No param, set first team as active
          setActiveTab(teamsData.teams[0].id)
        }
      })
      .catch((error) => {
        console.error('Error loading data:', error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading teams...</p>
        </div>
      </div>
    )
  }

  const activeTeam = teams.find((team) => team.id === activeTab)
  const teamResults = results.filter((result) => result.teamId === activeTab)

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-spectra-violet to-spectra-mauve">Teams</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the elite rosters that make up the Spectra organization
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setActiveTab(team.id)}
              className={`px-6 py-3 rounded-lg font-display font-semibold transition-all duration-300 ${
                activeTab === team.id
                  ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg shadow-spectra-violet/30 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {team.name}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-3 rounded-lg font-display font-semibold transition-all duration-300 ${
              activeTab === 'staff'
                ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg shadow-spectra-violet/30 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            Staff
          </button>
        </div>

        {/* Team Content */}
        {activeTab !== 'staff' && activeTeam && (
          <div className="fade-in">
            {/* Team Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-spectra-violet/10 border border-spectra-violet/30 rounded-full">
                <Users className="w-5 h-5 text-spectra-violet" />
                <span className="text-spectra-mauve font-medium">{activeTeam.game}</span>
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-4">{activeTeam.name}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">{activeTeam.description}</p>
            </div>

            {/* Players Grid - Main 5 players */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              {activeTeam.players.slice(0, 5).map((player, index) => (
                <div
                  key={player.id}
                  className="glass-card group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Player Photo */}
                  <div className="relative w-full aspect-[2/3] mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-spectra-violet/20 to-spectra-purple/20" />
                    {player.photo && player.photo !== '/images/default-player.jpg' ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling
                          if (fallback) fallback.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center ${player.photo && player.photo !== '/images/default-player.jpg' ? 'hidden' : ''}`}>
                      <div className="w-32 h-32 rounded-full bg-spectra-violet/20 border-4 border-spectra-violet/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl font-display font-bold text-white">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2 overflow-hidden whitespace-nowrap max-w-full">
                        <span className="truncate">{player.name}</span>
                        {player.country && <CountryFlag countryCode={player.country} className="w-6 h-4 min-w-[1.5rem] max-w-[1.5rem] object-contain" />}
                      </h3>
                      <p className="text-spectra-mauve text-sm font-medium uppercase tracking-wider">
                        {player.role}
                      </p>
                    </div>

                    {/* Social Links */}
                    {(player.socials.twitter || (player.socialsLinks && player.socialsLinks.length > 0)) && (
                      <div className="flex flex-wrap gap-2 pt-2 w-full justify-center overflow-hidden">
                        {player.socials.twitter && (
                          <a
                            href={player.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                          >
                            <XIcon className="w-[18px] h-[18px]" />
                          </a>
                        )}
                        {player.socialsLinks && player.socialsLinks.map((link, idx) => {
                          const url = link.url;
                          if (!url) return null;
                          if (url.includes('kick.com')) {
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#53FC18] hover:bg-white/10 hover:border-[#53FC18]/50 transition-all duration-300"
                              >
                                <KickIcon className="w-[18px] h-[18px]" />
                              </a>
                            );
                          } else if (url.includes('tiktok.com')) {
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#25F4EE] hover:bg-white/10 hover:border-[#25F4EE]/50 transition-all duration-300"
                              >
                                <TikTokIcon className="w-[18px] h-[18px]" />
                              </a>
                            );
                          } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#FF0000] hover:bg-white/10 hover:border-[#FF0000]/50 transition-all duration-300"
                              >
                                <YouTubeIcon className="w-[18px] h-[18px]" />
                              </a>
                            );
                          } else if (url.includes('twitch.tv')) {
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#9146FF] hover:bg-white/10 hover:border-[#9146FF]/50 transition-all duration-300"
                              >
                                <Twitch size={18} />
                              </a>
                            );
                          } else if (url.includes('instagram.com')) {
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#E4405F] hover:bg-white/10 hover:border-[#E4405F]/50 transition-all duration-300"
                              >
                                <Instagram size={18} />
                              </a>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Substitute Players (6th and 7th) - Centered */}
            {activeTeam.players.length > 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                {activeTeam.players.slice(5, 7).map((player, index) => (
                  <div
                    key={player.id}
                    className={`glass-card group ${
                      activeTeam.players.length === 6 
                        ? 'lg:col-start-3' 
                        : index === 0 
                          ? 'lg:col-start-2' 
                          : 'lg:col-start-4'
                    }`}
                      style={{ animationDelay: `${(5 + index) * 50}ms` }}
                    >
                      {/* Player Photo */}
                      <div className="relative w-full aspect-[2/3] mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-spectra-violet/20 to-spectra-purple/20" />
                        {player.photo && player.photo !== '/images/default-player.jpg' ? (
                          <img
                            src={player.photo}
                            alt={player.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.currentTarget.style.display = 'none'
                              const fallback = e.currentTarget.nextElementSibling
                              if (fallback) fallback.classList.remove('hidden')
                            }}
                          />
                        ) : null}
                        <div className={`absolute inset-0 flex items-center justify-center ${player.photo && player.photo !== '/images/default-player.jpg' ? 'hidden' : ''}`}>
                          <div className="w-32 h-32 rounded-full bg-spectra-violet/20 border-4 border-spectra-violet/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-4xl font-display font-bold text-white">
                              {player.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2">
                            {player.name}
                            {player.country && <CountryFlag countryCode={player.country} className="w-6 h-4" />}
                          </h3>
                          <p className="text-spectra-mauve text-sm font-medium uppercase tracking-wider">
                            {player.role}
                          </p>
                        </div>

                        {/* Social Links */}
                        {(player.socials.twitter || (player.socialsLinks && player.socialsLinks.length > 0)) && (
                          <div className="flex gap-2 pt-2">
                            {player.socials.twitter && (
                              <a
                                href={player.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                              >
                                <XIcon className="w-[18px] h-[18px]" />
                              </a>
                            )}
                            {player.socialsLinks && player.socialsLinks.map((link, idx) => {
                              const url = link.url;
                              if (!url) return null;
                              if (url.includes('kick.com')) {
                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#53FC18] hover:bg-white/10 hover:border-[#53FC18]/50 transition-all duration-300"
                                  >
                                    <KickIcon className="w-[18px] h-[18px]" />
                                  </a>
                                );
                              } else if (url.includes('tiktok.com')) {
                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#25F4EE] hover:bg-white/10 hover:border-[#25F4EE]/50 transition-all duration-300"
                                  >
                                    <TikTokIcon className="w-[18px] h-[18px]" />
                                  </a>
                                );
                              } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#FF0000] hover:bg-white/10 hover:border-[#FF0000]/50 transition-all duration-300"
                                  >
                                    <YouTubeIcon className="w-[18px] h-[18px]" />
                                  </a>
                                );
                              } else if (url.includes('twitch.tv')) {
                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#9146FF] hover:bg-white/10 hover:border-[#9146FF]/50 transition-all duration-300"
                                  >
                                    <Twitch size={18} />
                                  </a>
                                );
                              } else if (url.includes('instagram.com')) {
                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#E4405F] hover:bg-white/10 hover:border-[#E4405F]/50 transition-all duration-300"
                                  >
                                    <Instagram size={18} />
                                  </a>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            )}

            {/* Coach */}
            {activeTeam.coach && (
              <div className="mb-16">
                <div className="flex flex-col items-center mb-6">
                  <Users className="w-6 h-6 text-spectra-violet mb-2" />
                  <h3 className="text-2xl font-display font-bold text-white text-center">
                    Coach
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="glass-card group lg:col-start-3">
                    {/* Coach Photo */}
                    <div className="relative w-full aspect-[2/3] mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-spectra-purple/20 to-spectra-mauve/20" />
                      {activeTeam.coach.photo && activeTeam.coach.photo !== '/images/default-coach.jpg' ? (
                        <img
                          src={activeTeam.coach.photo}
                          alt={activeTeam.coach.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling
                            if (fallback) fallback.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 flex items-center justify-center ${activeTeam.coach.photo && activeTeam.coach.photo !== '/images/default-coach.jpg' ? 'hidden' : ''}`}>
                        <div className="w-32 h-32 rounded-full bg-spectra-purple/20 border-4 border-spectra-purple/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-4xl font-display font-bold text-white">
                            {activeTeam.coach.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Coach Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2">
                          {activeTeam.coach.name}
                          {activeTeam.coach.country && <CountryFlag countryCode={activeTeam.coach.country} className="w-6 h-4" />}
                        </h3>
                        <p className="text-spectra-mauve text-sm font-medium uppercase tracking-wider">
                          Coach
                        </p>
                      </div>

                      {/* Social Links */}
                      {(activeTeam.coach.socials?.twitter || (activeTeam.coach.socialsLinks && activeTeam.coach.socialsLinks.length > 0)) && (
                        <div className="flex flex-wrap gap-2 pt-2 w-full justify-center overflow-hidden">
                          {activeTeam.coach.socials.twitter && (
                            <a
                              href={activeTeam.coach.socials.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                            >
                              <XIcon className="w-[18px] h-[18px]" />
                            </a>
                          )}
                          {activeTeam.coach.socialsLinks && activeTeam.coach.socialsLinks.map((link, idx) => {
                            const url = link.url;
                            if (!url) return null;
                            if (url.includes('kick.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#53FC18] hover:bg-white/10 hover:border-[#53FC18]/50 transition-all duration-300"
                                >
                                  <KickIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('tiktok.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#25F4EE] hover:bg-white/10 hover:border-[#25F4EE]/50 transition-all duration-300"
                                >
                                  <TikTokIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#FF0000] hover:bg-white/10 hover:border-[#FF0000]/50 transition-all duration-300"
                                >
                                  <YouTubeIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('twitch.tv')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#9146FF] hover:bg-white/10 hover:border-[#9146FF]/50 transition-all duration-300"
                                >
                                  <Twitch size={18} />
                                </a>
                              );
                            } else if (url.includes('instagram.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#E4405F] hover:bg-white/10 hover:border-[#E4405F]/50 transition-all duration-300"
                                >
                                  <Instagram size={18} />
                                </a>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Results */}
            {teamResults.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-spectra-violet" />
                  <h3 className="text-2xl font-display font-bold text-white">
                    Results
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...teamResults].reverse().map((result, index) => (
                    <div key={result.id} className="fade-in flex items-center justify-center" style={{ animationDelay: `${index * 50}ms` }}>
                      {result.image && (
                        <a href={result.image} target="_blank" rel="noopener noreferrer">
                          <img
                            src={result.image}
                            alt="Result image"
                            className="rounded-lg border-2 border-white/20 shadow-md"
                            style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                          />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Staff Content */}
        {activeTab === 'staff' && (
          <div className="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-white mb-4">Our Staff</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                The team working behind the scenes to bring our players to excellence
              </p>
            </div>

            {/* Staff grid - centered with flex wrapper */}
            <div className="flex justify-center w-full">
              <div className={`grid gap-6 w-full ${
                staff.length === 1 ? 'grid-cols-1 max-w-xs' :
                staff.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl' :
                staff.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl' :
                staff.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
              }`}>
                {staff.map((member, index) => (
                  <div
                    key={member.id}
                    className="glass-card text-center group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Staff Photo - format portrait */}
                    <div className="relative w-full aspect-[2/3] mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-spectra-purple/20 to-spectra-mauve/20" />
                      {member.photo && member.photo !== '/images/default-staff.jpg' ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling
                            if (fallback) fallback.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 flex items-center justify-center ${member.photo && member.photo !== '/images/default-staff.jpg' ? 'hidden' : ''}`}>
                        <div className="w-20 h-32 rounded-lg bg-spectra-purple/20 border-4 border-spectra-purple/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <span className="text-3xl font-display font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Staff Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white mb-1 flex items-center justify-center gap-2">
                          {member.name}
                          {member.country && <CountryFlag countryCode={member.country} className="w-6 h-4" />}
                        </h3>
                        <p className="text-spectra-mauve text-sm font-medium uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>

                      {/* Social Links */}
                      {(member.socials.twitter || (member.socialsLinks && member.socialsLinks.length > 0)) && (
                        <div className="flex flex-wrap gap-2 pt-2 w-full justify-center overflow-hidden">
                          {member.socials.twitter && (
                            <a
                              href={member.socials.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                            >
                              <XIcon className="w-[18px] h-[18px]" />
                            </a>
                          )}
                          {member.socialsLinks && member.socialsLinks.map((link, idx) => {
                            const url = link.url;
                            if (!url) return null;
                            if (url.includes('kick.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#53FC18] hover:bg-white/10 hover:border-[#53FC18]/50 transition-all duration-300"
                                >
                                  <KickIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('tiktok.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#25F4EE] hover:bg-white/10 hover:border-[#25F4EE]/50 transition-all duration-300"
                                >
                                  <TikTokIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#FF0000] hover:bg-white/10 hover:border-[#FF0000]/50 transition-all duration-300"
                                >
                                  <YouTubeIcon className="w-[18px] h-[18px]" />
                                </a>
                              );
                            } else if (url.includes('twitch.tv')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#9146FF] hover:bg-white/10 hover:border-[#9146FF]/50 transition-all duration-300"
                                >
                                  <Twitch size={18} />
                                </a>
                              );
                            } else if (url.includes('instagram.com')) {
                              return (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-[#E4405F] hover:bg-white/10 hover:border-[#E4405F]/50 transition-all duration-300"
                                >
                                  <Instagram size={18} />
                                </a>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
