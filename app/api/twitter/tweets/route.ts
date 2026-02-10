import { NextResponse } from 'next/server'


import fs from 'fs/promises'
import path from 'path'

const CACHE_FILE = path.resolve(process.cwd(), 'data/tweets-cache.json')
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function GET() {
  try {
    const now = Date.now()
    let cachedData = null
    let cacheAge = null

    // Lire le cache depuis le fichier
    try {
      const file = await fs.readFile(CACHE_FILE, 'utf-8')
      cachedData = JSON.parse(file)
      if (cachedData.fetchedAt) {
        cacheAge = now - new Date(cachedData.fetchedAt).getTime()
      }
    } catch (e) {
      // Pas de cache ou fichier corrompu
      cachedData = null
    }

    // Si le cache est valide (moins d'1h), le retourner
    if (cachedData && cacheAge !== null && cacheAge < CACHE_DURATION) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cacheAge: Math.floor(cacheAge / 1000)
      })
    }

    // Sinon, fetch depuis Twitter
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    if (!bearerToken) {
      return NextResponse.json(
        { tweets: [], error: 'Twitter Bearer Token not configured' },
        { status: 500 }
      )
    }

    // Récupérer l'ID utilisateur
    const userResponse = await fetch(
      'https://api.twitter.com/2/users/by/username/SpectraEU',
      {
        headers: { 
          'Authorization': `Bearer ${bearerToken}`,
          'User-Agent': 'v2UserTweetsJS'
        }
      }
    )
    if (!userResponse.ok) {
      const errorData = await userResponse.json()
      throw new Error(JSON.stringify(errorData))
    }
    const userData = await userResponse.json()
    const userId = userData.data.id


    // Récupérer les tweets avec médias
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=media_key,type,url,preview_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'User-Agent': 'v2UserTweetsJS'
        }
      }
    )
    if (!tweetsResponse.ok) {
      const errorData = await tweetsResponse.json()
      throw new Error(JSON.stringify(errorData))
    }
    const tweetsData = await tweetsResponse.json()

    // Associer les médias aux tweets
    let mediaMap = {}
    if (tweetsData.includes && tweetsData.includes.media) {
      for (const media of tweetsData.includes.media) {
        mediaMap[media.media_key] = media
      }
    }
    const tweetsWithMedia = (tweetsData.data || []).map((tweet) => {
      let media = []
      if (tweet.attachments && tweet.attachments.media_keys) {
        media = tweet.attachments.media_keys.map((key) => mediaMap[key]).filter(Boolean)
      }
      return { ...tweet, media }
    })

    // Mettre à jour le cache fichier
    const newCache = {
      tweets: tweetsWithMedia,
      fetchedAt: new Date().toISOString()
    }
    await fs.writeFile(CACHE_FILE, JSON.stringify(newCache, null, 2), 'utf-8')

    return NextResponse.json({
      ...newCache,
      cached: false
    })

  } catch (error: any) {
    // En cas d'erreur, retourner le cache même s'il est vieux
    let fallbackCache = null
    try {
      const file = await fs.readFile(CACHE_FILE, 'utf-8')
      fallbackCache = JSON.parse(file)
    } catch {}
    if (fallbackCache) {
      return NextResponse.json({
        ...fallbackCache,
        cached: true,
        warning: 'Using cached data due to API error',
        error: error.message
      })
    }
    return NextResponse.json(
      { 
        tweets: [], 
        error: 'Failed to fetch tweets',
        details: error.message 
      },
      { status: 500 }
    )
  }
}