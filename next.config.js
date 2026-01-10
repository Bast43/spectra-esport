/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://platform.twitter.com https://cdn.syndication.twimg.com",
              "style-src 'self' 'unsafe-inline' https://platform.twitter.com",
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.twitter.com https://syndication.twitter.com",
              "frame-src 'self' https://platform.twitter.com https://twitter.com https://syndication.twitter.com",
              "media-src 'self' https:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig