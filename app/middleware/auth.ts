/**
 * Client-side route middleware: redirects unauthenticated users to `/`.
 *
 * Usage in a page:
 *   definePageMeta({ middleware: 'auth' })
 */
export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, refresh, loading } = useAuth()

  // Ensure auth state is loaded if it hasn't been fetched yet
  if (!loggedIn.value && loading.value) {
    await refresh()
  }

  if (!loggedIn.value) {
    return navigateTo('/')
  }
})
