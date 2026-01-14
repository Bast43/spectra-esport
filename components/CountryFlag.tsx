interface CountryFlagProps {
  countryCode: string
  className?: string
  title?: string
}

export function CountryFlag({ countryCode, className = "w-5 h-4", title }: CountryFlagProps) {
  if (!countryCode) return null
  
  const code = countryCode.toUpperCase()
  
  return (
    <img
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      className={`inline-block rounded ${className}`}
      alt={`${code} flag`}
      title={title || code}
      loading="lazy"
    />
  )
}
