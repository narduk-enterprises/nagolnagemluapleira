<script setup lang="ts">
import { computed } from 'vue'
import { glossaryTerms } from '~/utils/planetData'

const props = defineProps<{
  term: string
}>()

const dictionaryEntry = computed(() => {
  return glossaryTerms.find(t => t.term.toLowerCase() === props.term.toLowerCase())
})
</script>

<template>
  <UPopover :popper="{ placement: 'top' }">
    <button class="underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 cursor-help hover:decoration-[var(--color-accent)] transition-colors">
      <slot>{{ term }}</slot>
    </button>
    
    <template #content>
      <div v-if="dictionaryEntry" class="w-80 p-4 relative no-print bg-[var(--color-card)] border border-[var(--color-border)] rounded-md shadow-md text-[var(--color-foreground)]">
        <div class="space-y-2">
          <div class="flex items-start gap-2">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
            <div class="space-y-1">
              <h4 class="font-semibold text-sm">{{ dictionaryEntry.term }}</h4>
              <p class="text-xs font-mono text-[var(--color-muted-foreground)]">
                {{ dictionaryEntry.pronunciation }}
              </p>
            </div>
          </div>
          <p class="text-sm text-[var(--color-foreground)]/90 leading-relaxed">
            {{ dictionaryEntry.definition }}
          </p>
        </div>
      </div>
    </template>
  </UPopover>
</template>
