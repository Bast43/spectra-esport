'use client'

import { useEffect, useState } from 'react'
import { Twitter, Twitch, Instagram, ExternalLink, Heart, MessageCircle, Repeat2, Calendar } from 'lucide-react'

interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics: {
    like_count: number
    retweet_count: number
    reply_count: number
  }
}

export default function NewsPage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/SpectraEU', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Twitch, href: 'https://www.twitch.tv/spectraqg', label: 'Twitch', color: 'hover:text-[#9146FF]' },
    { icon: Instagram, href: 'https://www.instagram.com/spectraeu/', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: ExternalLink, href: 'https://linktr.ee/spectraeu', label: 'Linktree', color: 'hover:text-spectra-mauve' },
  ]

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/twitter/tweets')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tweets')
      }

      setTweets(data.tweets || [])
      setLastUpdate(data.fetchedAt || new Date().toISOString())
    } catch (err: any) {
      console.error('Error fetching tweets:', err)
      setError(err.message || 'Unable to load tweets')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

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
          {/* CTA Card */}
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

          {/* Loading State */}
          {loading && (
            <div className="glass-card text-center py-16">
              <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading latest tweets...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="glass-card border-red-500/30 text-center py-12">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitter className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Unable to Load Tweets</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={fetchTweets}
                  className="btn-primary flex items-center gap-2"
                >
                  Try Again
                </button>
                <a
                  href="https://x.com/SpectraEU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  View on Twitter
                </a>
              </div>
            </div>
          )}

          {/* Tweets List */}
          {!loading && !error && tweets.length > 0 && (
            <div className="space-y-4">
              {/* Update Info */}
              {lastUpdate && (
                <div className="text-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Last updated: {new Date(lastUpdate).toLocaleString()}
                </div>
              )}

              {tweets.map((tweet) => (
                <div key={tweet.id} className="glass-card hover:border-spectra-violet/50 transition-all group">
                  {/* Tweet Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-spectra-violet to-spectra-mauve rounded-full flex items-center justify-center flex-shrink-0">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white">Spectra Esport</h3>
                        <span className="text-gray-500">@SpectraEU</span>
                        <span className="text-gray-600">·</span>
                        <span className="text-gray-500 text-sm">{formatDate(tweet.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tweet Content */}
                  <div className="mb-4">
                    <p className="text-white whitespace-pre-wrap leading-relaxed">
                      {tweet.text}
                    </p>
                  </div>

                  {/* Tweet Stats */}
                  <div className="flex items-center gap-6 text-gray-400 text-sm pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 group-hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(tweet.public_metrics.like_count)}</span>
                    </div>
                    <div className="flex items-center gap-2 group-hover:text-green-400 transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      <span>{formatNumber(tweet.public_metrics.retweet_count)}</span>
                    </div>
                    <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(tweet.public_metrics.reply_count)}</span>
                    </div>
                    <a
                      href={`https://x.com/SpectraEU/status/${tweet.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-2 text-spectra-violet hover:text-spectra-mauve transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View on Twitter</span>
                    </a>
                  </div>
                </div>
              ))}

              {/* Load More */}
              <div className="text-center pt-8">
                <a
                  href="https://x.com/SpectraEU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Twitter size={20} />
                  View More on Twitter
                </a>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && tweets.length === 0 && (
            <div className="glass-card text-center py-16">
              <Twitter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Tweets Yet</h3>
              <p className="text-gray-400 mb-6">Start following @SpectraEU to see the latest updates!</p>
              <a
                href="https://x.com/SpectraEU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Twitter size={20} />
                Follow on Twitter
              </a>
            </div>
          )}

          {/* Other Social Links */}
          <div className="mt-12 text-center">
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
