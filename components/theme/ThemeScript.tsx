/**
 * Runs before first paint: applies the saved (or system) colour theme to <html>
 * so there is no flash of the wrong theme, and marks JavaScript as available.
 */
export const THEME_STORAGE_KEY = 'ihsb-theme'

const script = `(function(){try{var e=document.documentElement,t=localStorage.getItem('${THEME_STORAGE_KEY}'),d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);e.classList.toggle('dark',d);e.classList.remove('no-js')}catch(_){document.documentElement.classList.remove('no-js')}})()`

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
