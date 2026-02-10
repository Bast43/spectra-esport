import * as React from "react";

export function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 8.5c-1.38 0-2.5-1.12-2.5-2.5V4h-2v11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.13 0 .26.01.39.03V11.5c-.13-.02-.26-.03-.39-.03-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-3.5c.73.32 1.54.5 2.39.5V8.5z" />
    </svg>
  );
}
