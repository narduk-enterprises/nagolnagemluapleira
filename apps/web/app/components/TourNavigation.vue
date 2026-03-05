<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { usePersonality } from '~/composables/usePersonality';
import { useNarration } from '~/composables/useNarration';
import { getSectionStartIndex } from '~/utils/navigation';
import { personalityMicrocopy } from '~/utils/planetData';

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
];

const currentSection = ref(0);
const { personality } = usePersonality();
const { isNarrating, currentSectionId, emitNavigation, setVisibleSectionId } = useNarration();

const microcopy = computed(() => personalityMicrocopy[personality.value]);

let observer: IntersectionObserver | null = null;

// Sync tour navigation with narration progress
watch(currentSectionId, (sectionId) => {
  if (!isNarrating.value || !sectionId) return;
  const index = sections.findIndex((s) => s.id === sectionId);
  if (index !== -1) {
    currentSection.value = index;
  }
});

onMounted(() => {
  if (import.meta.client) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleSectionId(entry.target.id);
            // Don't update visual active dot from scroll if narration is active
            if (!isNarrating.value) {
              const index = sections.findIndex((s) => s.id === entry.target.id);
              if (index !== -1) {
                currentSection.value = index;
              }
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer?.observe(el);
    }
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

function scrollToSection(index: number) {
  const section = sections[index];
  if (!section) return;

  if (isNarrating.value) {
    const voiceoverIndex = getSectionStartIndex(section.id);
    emitNavigation(voiceoverIndex);
  } else if (import.meta.client) {
    const el = document.getElementById(section.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function handlePrevious() {
  if (currentSection.value > 0) {
    scrollToSection(currentSection.value - 1);
  }
}

function handleNext() {
  if (currentSection.value < sections.length - 1) {
    scrollToSection(currentSection.value + 1);
  }
}
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 no-print">
    <div
      class="bg-[var(--color-card)] border-2 border-[var(--color-border)] shadow-xl rounded-full px-6 py-3 flex items-center gap-4 personality-transition"
    >
      <UButton
        :disabled="currentSection === 0"
        variant="ghost"
        color="neutral"
        size="sm"
        class="gap-2 focus-visible:ring-0"
        icon="i-lucide-chevron-left"
        @click="handlePrevious"
      >
        <span class="hidden sm:inline font-display">{{ microcopy.previousSection }}</span>
      </UButton>

      <div class="flex items-center gap-1 sm:gap-2">
        <UButton
          v-for="(section, index) in sections"
          :key="section.id"
          variant="ghost"
          color="neutral"
          class="p-1 sm:p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full group"
          :aria-label="`Go to ${section.label}`"
          @click.prevent="scrollToSection(index)"
        >
          <div
            class="h-2 rounded-full transition-all personality-transition"
            :class="
              index === currentSection
                ? 'bg-[var(--color-primary)] w-8'
                : 'w-2 bg-[var(--color-border)] group-hover:bg-[var(--color-muted-foreground)]'
            "
          ></div>
        </UButton>
      </div>

      <UButton
        :disabled="currentSection === sections.length - 1"
        variant="ghost"
        color="neutral"
        size="sm"
        class="gap-2 focus-visible:ring-0"
        trailing-icon="i-lucide-chevron-right"
        @click="handleNext"
      >
        <span class="hidden sm:inline font-display">{{ microcopy.nextSection }}</span>
      </UButton>
    </div>
  </div>
</template>
