'use client'

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "Spectra Esport",
    "alternateName": ["Spectra EU", "SpectraEU"],
    "description": "Swiss esports organization competing at the highest European level in Rainbow Six Siege, Counter-Strike 2, and more.",
    "url": "https://spectra-esport.vercel.app",
    "logo": "https://spectra-esport.vercel.app/logo.png",
    "image": "https://spectra-esport.vercel.app/logo.png",
    "sameAs": [
      "https://x.com/SpectraEU",
      "https://www.twitch.tv/spectraqg",
      "https://www.instagram.com/spectraeu/",
      "https://linktr.ee/spectraeu"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CH"
    },
    "sport": "Esports",
    "memberOf": {
      "@type": "Organization",
      "name": "Esports"
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Spectra Esport",
    "url": "https://spectra-esport.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://spectra-esport.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
