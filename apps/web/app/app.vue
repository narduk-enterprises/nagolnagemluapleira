<script setup lang="ts">
import { usePersonality } from '~/composables/usePersonality'

const { personality } = usePersonality()

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    'data-personality': personality
  }
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] personality-transition overflow-x-hidden w-full m-0 p-0 font-sans">
      <NuxtPage />
    </div>
  </UApp>
</template>
