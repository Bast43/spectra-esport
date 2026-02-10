import React from 'react'
import { Heart, Repeat2, MessageCircle, BarChart2 } from 'lucide-react'

interface TweetMedia {
  media_key: string
  type: string
  url?: string
  preview_image_url?: string
}

interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics: {
    like_count: number
    retweet_count: number
    reply_count: number
    impression_count?: number
  }
  media?: TweetMedia[]
}

export const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  // Formatage du texte pour liens et hashtags
  const formatText = (text: string) => {
    return text
      .replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noopener" class="text-twitter-blue">$1</a>')
      .replace(/#(\w+)/g, '<span class="text-twitter-blue">#$1</span>')
      .replace(/@(\w+)/g, '<span class="text-twitter-blue">@$1</span>')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-black text-white rounded-2xl border border-gray-800 p-6 max-w-xl mx-auto shadow-lg font-inter">
      <div className="flex items-center gap-3 mb-2">
        <img src="/logo.png" alt="SpectraEU avatar" className="w-10 h-10 rounded-full" />
        <div>
          <span className="font-bold text-white text-sm">SPECTRA</span>
          <span className="ml-2 text-twitter-blue text-sm">@SpectraEU</span>
          <span className="ml-2 text-gray-500 text-xs">· {formatDate(tweet.created_at)}</span>
        </div>
        {/* Badge retiré */}
      </div>
      <div className="mb-3 text-base leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: formatText(tweet.text) }} />
      {tweet.media && tweet.media.length > 0 && (
        <div className="mt-2">
          {tweet.media.filter(m => m.type === 'photo' && m.url).map((media) => (
            <img
              key={media.media_key}
              src={media.url}
              alt="Tweet media"
              className="rounded-xl w-full max-h-96 object-cover border border-gray-700 mb-2"
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
        <div className="flex items-center gap-2 hover:text-twitter-blue cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span>{tweet.public_metrics.reply_count}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-twitter-blue cursor-pointer">
          <Repeat2 className="w-5 h-5" />
          <span>{tweet.public_metrics.retweet_count}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-twitter-blue cursor-pointer">
          <Heart className="w-5 h-5" />
          <span>{tweet.public_metrics.like_count}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-twitter-blue cursor-pointer">
          <BarChart2 className="w-5 h-5" />
          <span>{tweet.public_metrics.impression_count ?? 0}</span>
        </div>
      </div>
      <div className="mt-2 text-right">
        <a href={`https://x.com/SpectraEU/status/${tweet.id}`} target="_blank" rel="noopener" className="text-twitter-blue hover:underline text-xs">View on X</a>
      </div>
    </div>
  )
}
