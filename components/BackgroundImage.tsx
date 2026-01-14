'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function BackgroundImage() {
  const [backgroundImage, setBackgroundImage] = useState('')
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setBackgroundImage(data.backgroundImage || '')
        setOpacity(data.backgroundOpacity || 1)
      })
      .catch((error) => console.error('Error loading background:', error))
  }, [])

  if (!backgroundImage) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover"
        style={{ opacity }}
        priority
        quality={90}
      />
    </div>
  )
}
