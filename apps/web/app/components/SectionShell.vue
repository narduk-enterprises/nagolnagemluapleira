<script setup lang="ts">
defineProps<{
  id: string
  title: string
  titleVoiceoverKey?: string
}>()
</script>

<template>
  <section
    :id="id"
    class="py-12 px-4 scroll-mt-20 print-break pb-24 transition-all duration-500 reveal-on-scroll"
  >
    <div class="max-w-3xl mx-auto transition-all duration-500">
      <div class="flex items-center gap-2 mb-6">
        <HighlightableText
          v-if="titleVoiceoverKey"
          :voiceover-key="titleVoiceoverKey"
          as="h2"
          class="text-3xl font-bold text-[var(--color-primary)] personality-transition flex-1 transition-all duration-500"
        >
          {{ title }}
        </HighlightableText>
        <h2
          v-else
          class="text-3xl font-bold text-[var(--color-primary)] personality-transition flex-1 transition-all duration-500"
        >
          {{ title }}
        </h2>

        <NarrateButton v-if="titleVoiceoverKey" :voiceover-key="titleVoiceoverKey" />
      </div>

      <div class="space-y-6 text-[var(--color-foreground)]/90">
        <slot />
      </div>
    </div>
  </section>
</template>
