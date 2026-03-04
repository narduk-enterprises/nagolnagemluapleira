import { JWT } from 'google-auth-library'

export const GSC_SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
export const GA_SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']

export async function googleApiFetch(url: string, scopes: string[], options: any = {}) {
  const config = useRuntimeConfig()
  const keyJson = config.googleServiceAccountKey

  if (!keyJson) {
    throw createError({ statusCode: 500, statusMessage: 'Google Service Account Key not configured' })
  }

  try {
    const key = JSON.parse(keyJson)
    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes,
    })

    const { token } = await client.getAccessToken()

    if (!token) {
        throw new Error('Failed to get access token')
    }

    return $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error: any) {
    console.error('googleApiFetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Google API fetch failed: ${error.message}`
    })
  }
}
