<script setup lang="ts">
const props = defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    stack: string
    data?: any
  }
}>()

const handleClearError = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}

const title = computed(() => {
  const code = props.error?.statusCode
  if (code === 404) return 'Page not found'
  if (code === 403) return 'Access denied'
  if (code === 401) return 'Not authenticated'
  return 'Something went wrong'
})

const description = computed(() => {
  const code = props.error?.statusCode
  if (code === 404) return "The page you're looking for doesn't exist or has been moved."
  if (code === 403) return "You don't have permission to access this resource."
  if (code === 401) return "Please log in to access this page."
  return "An unexpected error occurred. Please try again later."
})

useSeoMeta({
  title: `${props.error?.statusCode || 'Error'} — ${title.value}`,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="min-h-screen bg-default flex items-center justify-center p-4">
    <UCard class="max-w-md w-full p-6 text-center shadow-xl border-default">
      <div class="mb-6">
        <div class="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-lucide-alert-triangle" class="w-10 h-10 text-primary" />
        </div>
        <h1 class="text-3xl font-bold text-default mb-2">
          {{ error.statusCode }}
        </h1>
        <p class="text-lg font-medium text-default/80 mb-2">
          {{ title }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div class="space-y-4">
        <UButton
          color="primary"
          size="lg"
          block
          to="/"
        >
          Go back home
        </UButton>
        <UButton
          variant="ghost"
          block
          @click="handleClearError"
        >
          Try again
        </UButton>
      </div>
    </UCard>
  </div>
</template>
