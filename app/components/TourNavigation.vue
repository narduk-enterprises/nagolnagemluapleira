<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { usePersonality } from '~/composables/usePersonality'
import { useNarration } from '~/composables/useNarration'
import { personalityMicrocopy } from '~/utils/planetData'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'big-idea', label: 'Big Idea' },
  { id: 'life-styles', label: 'Life Styles' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'government', label: 'Government' },
  { id: 'holidays', label: 'Holidays' },
  { id: 'anthem', label: 'Anthem' },
  { id: 'quote', label: 'Quote' },
  { id: 'original-pages', label: 'Original Pages' },
  { id: 'credits', label: 'Credits' },
]

const currentSection = ref(0)
const { personality } = usePersonality()
const { isNarrating, currentSectionId } = useNarration()

const microcopy = computed(() => personalityMicrocopy[personality.value])

let observer: IntersectionObserver | null = null

// Sync tour navigation with narration progress
watch(currentSectionId, (sectionId) => {
  if (!isNarrating.value || !sectionId) return
  const index = sections.findIndex((s) => s.id === sectionId)
  if (index !== -1) {
    currentSection.value = index
  }
})

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    // Don't update from scroll if narration is active (narration controls the nav)
    if (isNarrating.value) return
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = sections.findIndex((s) => s.id === entry.target.id)
        if (index !== -1) {
          currentSection.value = index
        }
      }
    })
  }, { threshold: 0.5 })

  sections.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function scrollToSection(index: number) {
  const section = sections[index]
  if (!section) return
  const el = document.getElementById(section.id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handlePrevious() {
  if (currentSection.value > 0) {
    scrollToSection(currentSection.value - 1)
  }
}

function handleNext() {
  if (currentSection.value < sections.length - 1) {
    scrollToSection(currentSection.value + 1)
  }
}
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 no-print">
    <div class="bg-[var(--color-card)] border-2 border-[var(--color-border)] shadow-xl rounded-full px-6 py-3 flex items-center gap-4">
      <UButton
        :disabled="currentSection === 0"
        variant="ghost"
        size="sm"
        class="gap-2 focus-visible:ring-0"
        icon="i-lucide-chevron-left"
        @click="handlePrevious"
      >
        <span class="hidden sm:inline">{{ microcopy.previousSection }}</span>
      </UButton>

      <div class="flex items-center gap-2">
        <button
          v-for="(section, index) in sections"
          :key="section.id"
          class="h-2 rounded-full transition-all personality-transition"
          :class="index === currentSection ? 'bg-[var(--color-primary)] w-8' : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-muted-foreground)]'"
          :aria-label="`Go to ${section.label}`"
          @click="scrollToSection(index)"
        ></button>
      </div>

      <UButton
        :disabled="currentSection === sections.length - 1"
        variant="ghost"
        size="sm"
        class="gap-2 focus-visible:ring-0"
        trailing-icon="i-lucide-chevron-right"
        @click="handleNext"
      >
        <span class="hidden sm:inline">{{ microcopy.nextSection }}</span>
      </UButton>
    </div>
  </div>
</template>
