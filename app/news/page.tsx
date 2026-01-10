'use client'

import { Twitter, Twitch, Instagram, ExternalLink } from 'lucide-react'

export default function NewsPage() {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/SpectraEU', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Twitch, href: 'https://www.twitch.tv/spectraqg', label: 'Twitch', color: 'hover:text-[#9146FF]' },
    { icon: Instagram, href: 'https://www.instagram.com/spectraeu/', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: ExternalLink, href: 'https://linktr.ee/spectraeu', label: 'Linktree', color: 'hover:text-spectra-mauve' },
  ]

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
                <p className="text-gray-400">Loading tweets...</p>
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

      {/* Twitter Widget Script */}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              if (window.twttr) {
                twttr.widgets.createTimeline(
                  {
                    sourceType: 'profile',
                    screenName: 'SpectraEU'
                  },
                  document.getElementById('twitter-timeline-container'),
                  {
                    theme: 'dark',
                    chrome: 'noheader nofooter noborders transparent',
                    height: 800
                  }
                );
              }
            });
          `,
        }}
      />
    </div>
  )
}
