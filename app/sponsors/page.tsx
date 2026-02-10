'use client'

import { useEffect, useState } from 'react'

interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  tier: string
}

interface ContactInfo {
  email: string
  discord: string
  description: string
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/sponsors')
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data.sponsors || [])
        setContact(data.contact || null)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading sponsors:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-12 h-12 text-spectra-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-spectra-violet to-spectra-mauve">Partners</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            They trust us and support our development
          </p>
        </div>

        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
              Our Sponsors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <a
                  key={sponsor.id}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-center group fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Logo */}
                  <div className="relative h-32 mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl bg-gradient-to-br from-spectra-violet/10 to-spectra-purple/10 flex items-center justify-center p-4">
                    {sponsor.logo && sponsor.logo !== '/images/sponsor-placeholder.jpg' ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling
                          if (fallback) fallback.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <span className={`text-4xl font-display font-bold text-white/40 ${sponsor.logo && sponsor.logo !== '/images/sponsor-placeholder.jpg' ? 'hidden' : ''}`}>
                      {sponsor.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {sponsor.name}
                  </h3>

                  {sponsor.tier === 'premium' && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-spectra-violet to-spectra-purple text-white text-xs font-semibold rounded-full mb-3">
                      Premium Partner
                    </span>
                  )}

                  <div className="flex items-center justify-center gap-2 text-spectra-mauve group-hover:text-spectra-violet transition-colors">
                    <span className="text-sm">Visit website</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card neon-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Become a Partner
              </h2>
              {contact?.description && (
                <p className="text-gray-400">
                  {contact.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-spectra-violet/50 transition-all duration-300 group"
                >
                  <svg className="w-8 h-8 text-spectra-violet group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-center">
                    <h3 className="font-display font-semibold text-white mb-1">Email</h3>
                    <p className="text-sm text-gray-400">{contact.email}</p>
                  </div>
                </a>
              )}

              {/* Discord */}
              {contact?.discord && (
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-spectra-violet/50 transition-all duration-300 group"
                >
                  <svg className="w-8 h-8 text-spectra-purple group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <div className="text-center">
                    <h3 className="font-display font-semibold text-white mb-1">Discord</h3>
                    <p className="text-sm text-gray-400">Join our server</p>
                  </div>
                </a>
              )}
            </div>

            <div className="mt-8 p-4 bg-spectra-violet/10 border border-spectra-violet/30 rounded-lg">
              <p className="text-sm text-gray-300 text-center">
                💼 We are looking for strategic partners to support our growth.
                Feel free to contact us to discuss collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
