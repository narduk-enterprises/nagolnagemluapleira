<script setup lang="ts">
// Easter Egg Tooltip uses Nuxt UI 4 UTooltip
</script>

<template>
  <UTooltip>
    <template #content>
      <div class="max-w-xs text-sm p-1">
        <slot>
          Several holiday and month names are spelled backwards! SDRAWKCAB = BACKWARDS, Rebmtepes = September, Rebotco = October, and even Trecnoc = Concert!
        </slot>
      </div>
    </template>
    
    <button class="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors cursor-help">
      <UIcon name="i-lucide-info" class="w-4 h-4" />
      <span class="underline decoration-dotted underline-offset-4">Did you notice?</span>
    </button>
  </UTooltip>
</template>
