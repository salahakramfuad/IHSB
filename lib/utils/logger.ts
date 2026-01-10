/**
 * Production-safe logging utility
 * In production, errors are logged but sensitive data is not exposed
 */

export const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Error] ${message}`, error)
    } else {
      // In production, log to error tracking service (e.g., Sentry)
      // For now, just log the message without sensitive data
      console.error(`[Error] ${message}`)
    }
  },
  
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Info] ${message}`, data)
    }
    // No logging in production for info messages
  }
}
