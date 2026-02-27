<script setup lang="ts">
import { computed } from 'vue'
import { useNarration } from '~/composables/useNarration'

const props = defineProps<{
  voiceoverKey?: string
  as?: string
}>()

const { isNarrating, currentVoiceoverKey } = useNarration()

const isHighlighted = computed(() => {
  return isNarrating.value && props.voiceoverKey && currentVoiceoverKey.value === props.voiceoverKey
})
</script>

<template>
  <component
    :is="as || 'p'"
    class="transition-colors duration-300"
    :class="{ 'bg-primary/20 text-primary-on-surface rounded px-1': isHighlighted }"
  >
    <slot />
  </component>
</template>
