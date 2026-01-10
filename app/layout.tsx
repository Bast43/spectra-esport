import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Spectra Esport | Silent Impact - Swiss Esports Organization',
  description: 'Swiss esports organization competing at the highest European level in Rainbow Six Siege and Counter-Strike 2.',
  keywords: 'esport, gaming, rainbow six siege, counter-strike, cs2, r6s, spectra, switzerland, swiss',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
