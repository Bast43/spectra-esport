import { NextResponse } from 'next/server'

// Cache simple en mémoire
let tweetCache: any = null
let lastFetchTime = 0
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes en millisecondes

export async function GET() {
  try {
    // Vérifier si on a un cache valide
    const now = Date.now()
    if (tweetCache && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Returning cached tweets')
      return NextResponse.json({ tweets: tweetCache, cached: true })
    }

    // Récupérer les variables d'environnement
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    const username = process.env.TWITTER_USERNAME || 'SpectraEU'

    if (!bearerToken) {
      return NextResponse.json(
        { error: 'Twitter API credentials not configured' },
        { status: 500 }
      )
    }

    console.log(`Fetching tweets for @${username}`)

    // Étape 1: Récupérer l'ID du user
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    )

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error('Twitter API user error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch user data', details: errorText },
        { status: userResponse.status }
      )
    }

    const userData = await userResponse.json()
    const userId = userData.data?.id

    if (!userId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Étape 2: Récupérer les tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,entities&expansions=attachments.media_keys&media.fields=url,preview_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    )

    if (!tweetsResponse.ok) {
      const errorText = await tweetsResponse.text()
      console.error('Twitter API tweets error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch tweets', details: errorText },
        { status: tweetsResponse.status }
      )
    }

    const tweetsData = await tweetsResponse.json()

    // Mettre en cache
    tweetCache = tweetsData.data || []
    lastFetchTime = now

    console.log(`Successfully fetched ${tweetCache.length} tweets`)

    return NextResponse.json({ 
      tweets: tweetCache, 
      cached: false,
      fetchedAt: new Date(now).toISOString()
    })

  } catch (error: any) {
    console.error('Twitter API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}
