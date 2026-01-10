'use client'

import { useEffect } from 'react'
import { Twitter, Twitch, Instagram, ExternalLink } from 'lucide-react'

// Déclaration TypeScript pour le widget Twitter
declare global {
  interface Window {
    twttr: any
  }
}

export default function NewsPage() {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/SpectraEU', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Twitch, href: 'https://www.twitch.tv/spectraqg', label: 'Twitch', color: 'hover:text-[#9146FF]' },
    { icon: Instagram, href: 'https://www.instagram.com/spectraeu/', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: ExternalLink, href: 'https://linktr.ee/spectraeu', label: 'Linktree', color: 'hover:text-spectra-mauve' },
  ]

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

    script.onload = () => {
      // Wait for twttr to be available
      const checkTwitter = setInterval(() => {
        if (window.twttr && window.twttr.widgets) {
          clearInterval(checkTwitter)
          
          // Clear container first
          const container = document.getElementById('twitter-timeline-container')
          if (container) {
            container.innerHTML = ''
            
            // Create timeline
            window.twttr.widgets.createTimeline(
              {
                sourceType: 'profile',
                screenName: 'SpectraEU'
              },
              container,
              {
                theme: 'dark',
                chrome: 'noheader nofooter noborders transparent',
                height: 800,
                tweetLimit: 10
              }
            ).then(() => {
              console.log('Twitter timeline loaded successfully')
            }).catch((error) => {
              console.error('Twitter timeline error:', error)
              if (container) {
                container.innerHTML = '<p class="text-gray-400">Unable to load tweets. Please visit <a href="https://x.com/SpectraEU" target="_blank" class="text-spectra-violet hover:underline">@SpectraEU</a> on Twitter.</p>'
              }
            })
          }
        }
      }, 100)

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkTwitter)
      }, 10000)
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Twitter className="w-12 h-12 text-spectra-violet" />
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-spectra-violet to-spectra-mauve">News</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Follow all our news live from our Twitter account
          </p>
        </div>

        {/* Twitter Section */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card neon-border text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              @SpectraEU on Twitter
            </h2>
            <p className="text-gray-400 mb-6">
              Find all our news, announcements and results in real time
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://x.com/SpectraEU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <Twitter size={20} />
                Follow on Twitter
              </a>
              <a
                href="https://x.com/SpectraEU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <ExternalLink size={20} />
                View Profile
              </a>
            </div>
          </div>

          {/* Twitter Timeline */}
          <div className="glass-card">
            <div className="relative w-full" style={{ height: '800px' }}>
              <div id="twitter-timeline-container" className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading tweets from @SpectraEU...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take 10-20 seconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Social Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Find us also on</p>
            <div className="flex justify-center gap-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
