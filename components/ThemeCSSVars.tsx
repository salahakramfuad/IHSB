// components/ThemeCSSVars.tsx
'use client'

/**
 * Injects CSS variables for light theme with academic color palette.
 * Green is the primary color, with blue and yellow as accents.
 */
export default function ThemeCSSVars() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
:root {
  --text: #111827;
  --text-2: color-mix(in oklab, var(--text) 70%, transparent);
  --background: #FFFFFF;
  --surface: #F9FAFB;
  --surface-alt: #F3F4F6;
  --border: rgba(0,0,0,0.12);
  --primary: #10b981;
  --primary-dark: #059669;
  --primary-light: #34d399;
  --accent-blue: #2563eb;
  --accent-blue-light: #3b82f6;
  --accent-yellow: #facc15;
  --accent-yellow-alt: #fbbf24;
  --tint: #0A7EA4;
  --warning: #facc15;
}

/* Body background/text to reflect variables */
body {
  color: var(--text);
  background: var(--background);
}
`
      }}
    />
  )
}
