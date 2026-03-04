<script setup lang="ts">
import { usePersonality } from '~/composables/usePersonality'

const { personality, togglePersonality } = usePersonality()
</script>

<template>
  <div class="fixed top-6 right-6 z-50 no-print">
    <UButton
      size="lg"
      class="personality-transition gap-2 px-4 py-2 h-auto font-semibold bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 shadow-lg border-2 border-border"
      :style="{ backgroundColor: 'var(--color-primary)' }"
      @click="togglePersonality"
    >
      <UIcon
        :name="personality === 'A' ? 'i-lucide-sun' : 'i-lucide-moon'"
        class="w-5 h-5 text-primary-on-surface"
      />
      <span class="hidden sm:inline">Personality {{ personality }}</span>
      <span class="sm:hidden">{{ personality }}</span>
    </UButton>
  </div>
</template>
