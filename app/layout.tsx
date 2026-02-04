import './globals.css'
import './exo2-font.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import BackgroundImage from '@/components/BackgroundImage'

export const metadata: Metadata = {
  metadataBase: new URL('https://spectra-esport.vercel.app'),
  title: {
    default: 'Spectra Esport | Silent Impact - Swiss Esports Organization',
    template: '%s | Spectra Esport'
  },
  description: 'Swiss esports organization competing at the highest European level. Semi-Professional teams in Rainbow Six Siege, Counter-Strike 2, and more.',
  keywords: [
    'Spectra Esport',
    'Spectra EU',
    'SpectraEU',
    'esport Switzerland',
    'Swiss esports',
    'Rainbow Six Siege Switzerland',
    'R6S team',
    'Counter-Strike 2 Switzerland',
    'CS2 team',
    'esports organization',
    'gaming Switzerland',
    'competitive gaming',
    'esport suisse',
    'Spectra gaming'
  ],
  authors: [{ name: 'Spectra Esport' }],
  creator: 'Spectra Esport',
  publisher: 'Spectra Esport',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spectra-esport.vercel.app',
    siteName: 'Spectra Esport',
    title: 'Spectra Esport | Silent Impact - Swiss Esports Organization',
    description: 'Swiss esports organization competing at the highest European level. Semi-Professional teams in Rainbow Six Siege, Counter-Strike 2, and more.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spectra Esport Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SpectraEU',
    creator: '@SpectraEU',
    title: 'Spectra Esport | Silent Impact',
    description: 'Swiss esports organization competing at the highest European level. Semi-Professional teams in Rainbow Six Siege, Counter-Strike 2, and more.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  verification: {
    google: "OTs6bMCwsdiuTNVB80VUsQfK4YrLJnKTwNrRay0lgho",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body>
        <BackgroundImage />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
