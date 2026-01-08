// constants/Colors.ts

export type ThemeColors = {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  info: string
  success: string
  warning: string
  error: string
}

// Academic color palette with green as primary
export const themeColors: ThemeColors = {
  primary: '#10b981', // emerald-500 (primary green)
  secondary: '#2563eb', // blue-600 (accent blue)
  accent: '#facc15', // yellow-400 (accent yellow)
  background: '#ffffff', // white
  surface: '#f9fafb', // gray-50
  text: '#111827', // gray-900
  textSecondary: '#4b5563', // gray-600
  border: '#e5e7eb', // gray-200
  info: '#3b82f6', // blue-500
  success: '#10b981', // emerald-500
  warning: '#facc15', // yellow-400
  error: '#ef4444' // red-500
}
