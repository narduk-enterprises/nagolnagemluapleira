<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePersonality } from '~/composables/usePersonality'
import { funFacts, personalityMicrocopy } from '~/utils/planetData'

const factIndex = ref(0)
const { personality } = usePersonality()

const microcopy = computed(() => personalityMicrocopy[personality.value])
const currentFact = computed(() => funFacts[factIndex.value])

function rotateFact() {
  factIndex.value = (factIndex.value + 1) % funFacts.length
}

onMounted(() => {
  // Randomize initial fact
  factIndex.value = Math.floor(Math.random() * funFacts.length)
})
</script>

<template>
  <button
    @click="rotateFact"
    class="w-full cursor-pointer rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] px-4 py-3 text-left text-sm flex items-start gap-3 hover:bg-[var(--color-accent)]/90 active:scale-[0.98] transition-all duration-200 personality-transition shadow-sm hover:shadow-md border border-[var(--color-accent)]/20"
    :aria-label="`${microcopy.randomFact}: ${currentFact}. Click to see another fact.`"
  >
    <UIcon name="i-lucide-sparkles" class="w-5 h-5 mt-0.5 flex-shrink-0" />
    <div class="flex-1 min-w-0">
      <span class="font-semibold">{{ microcopy.randomFact }}: </span>
      <span class="ml-1.5">{{ currentFact }}</span>
    </div>
  </button>
</template>
