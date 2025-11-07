// app/ThemeCSSVars.tsx
'use client'

/**
 * Injects CSS variables for light/dark themes.
 * Dark mode is toggled by adding/removing the `dark` class on <html>.
 * (You already have a useTheme hook elsewhere that does this.)
 */
export default function ThemeCSSVars() {
  return (
    <style
      // global so variables apply site-wide
      dangerouslySetInnerHTML={{
        __html: `
:root {
  --text: #11181C;
  --text-2: color-mix(in oklab, var(--text) 70%, transparent);
  --background: #FFFFFF;
  --surface: #F7F9FA;
  --border: rgba(0,0,0,0.12);
  --primary: #3F6D85;
  --tint: #0A7EA4;
  --warning: #F8E16C; /* used by "Apply Now" */
}

html.dark {
  --background: #0D1117;
  --text: #E6EEF2;
  --text-2: color-mix(in oklab, var(--text) 70%, transparent);
  --surface: #111827; /* can vary by elevation */
  --border: rgba(255,255,255,0.12);
  --primary: #95C6E2;
  --tint: #95C6E2;
  --warning: #E4C85A;
}

/* Body background/text to reflect variables (optional but convenient) */
body {
  color: var(--text);
  background: var(--background);
}
`
      }}
    />
  )
}
