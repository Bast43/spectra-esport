import * as React from "react";

export function KickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M7 7h3v3h4V7h3v3h-3v4h3v3h-3v-3h-4v3H7v-3h3v-4H7V7z" fill="#fff" />
    </svg>
  );
}
