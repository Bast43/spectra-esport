import { NextResponse } from 'next/server'

// Cache en mémoire
let cachedTweets: any = null
let lastFetch: number = 0
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

export async function GET() {
  try {
    const now = Date.now()
    
    // Retourner le cache si moins de 15 minutes
    if (cachedTweets && (now - lastFetch) < CACHE_DURATION) {
      console.log('Returning cached tweets')
      return NextResponse.json({
        ...cachedTweets,
        cached: true,
        cacheAge: Math.floor((now - lastFetch) / 1000)
      })
    }

    console.log('Fetching fresh tweets from Twitter API')
    
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

    // Récupérer les tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics`,
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

    // Mettre en cache
    cachedTweets = {
      tweets: tweetsData.data || [],
      fetchedAt: new Date().toISOString()
    }
    lastFetch = now

    console.log(`Cached ${tweetsData.data?.length || 0} tweets`)

    return NextResponse.json({
      ...cachedTweets,
      cached: false
    })

  } catch (error: any) {
    console.error('Twitter API Error:', error)
    
    // Si on a un cache, le retourner même s'il est vieux
    if (cachedTweets) {
      console.log('Returning stale cache due to error')
      return NextResponse.json({
        ...cachedTweets,
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