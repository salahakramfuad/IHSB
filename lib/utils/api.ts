/**
 * Utility functions for making authenticated API calls
 */

/**
 * Get the current user's Firebase auth token
 */
export async function getAuthToken(): Promise<string> {
  const { auth } = await import('@/lib/integrations/firebase/config')
  const user = auth.currentUser
  if (!user) {
    throw new Error('Not authenticated. Please log in.')
  }
  return user.getIdToken()
}

/**
 * Make an authenticated fetch request
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken()
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Fetch data from an authenticated API endpoint
 */
export async function fetchAuthenticatedData<T>(
  endpoint: string
): Promise<T> {
  const response = await authenticatedFetch(endpoint)
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized. Please log in again.')
    }
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Failed to fetch data')
  }
  
  return response.json()
}
