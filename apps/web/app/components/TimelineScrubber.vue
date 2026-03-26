<script setup lang="ts">
import { usePersonality } from '~/composables/usePersonality'
import { planetData } from '~/utils/planetData'

const hour = ref(6)
const isDragging = ref(false)
const trackRef = ref<HTMLElement | null>(null)
const { personality } = usePersonality()

function updateHour(clientX: number) {
  if (!trackRef.value) return

  const rect = trackRef.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  const newHour = Math.round((x / rect.width) * 12)
  hour.value = Math.max(0, Math.min(12, newHour))
}

function handleMouseDown(e: MouseEvent) {
  isDragging.value = true
  updateHour(e.clientX)
}

function handleMouseMove(e: MouseEvent) {
  if (isDragging.value) {
    updateHour(e.clientX)
  }
}

function handleMouseUp() {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})

function handleTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  if (touch) {
    isDragging.value = true
    updateHour(touch.clientX)
  }
}

function handleTouchMove(e: TouchEvent) {
  const touch = e.touches[0]
  if (isDragging.value && touch) {
    updateHour(touch.clientX)
  }
}

function handleTouchEnd() {
  isDragging.value = false
}

const formattedHour = computed(() => hour.value.toString().padStart(2, '0'))

function formatHourLabel(h: number): string {
  return h.toString().padStart(2, '0')
}

const currentActivity = computed(() => {
  return planetData.lifeStyles.timeline.find((entry) => entry.hour === hour.value)
})

const activityText = computed(() => {
  if (!currentActivity.value) return '[Activity description]'
  return personality.value === 'A'
    ? currentActivity.value.personalityA
    : currentActivity.value.personalityB
})
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="text-sm text-muted-foreground">A Day in the Life Timeline</div>
        <div class="font-mono text-2xl font-bold text-primary personality-transition">
          {{ formattedHour }}:00
        </div>
      </div>

      <div
        ref="trackRef"
        class="relative h-12 bg-muted rounded-full cursor-pointer touch-none personality-transition"
        @mousedown="handleMouseDown"
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-border rounded-full" />

        <div
          v-for="h in [0, 3, 6, 9, 12]"
          :key="h"
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          :style="{ left: `${(h / 12) * 100}%` }"
        >
          <div class="w-3 h-3 rounded-full bg-border" />
          <div
            class="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap"
          >
            {{ formatHourLabel(h) }}:00
          </div>
        </div>

        <div
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary shadow-lg transition-all personality-transition cursor-grab active:cursor-grabbing active:scale-110"
          :style="{ left: `${(hour / 12) * 100}%` }"
        >
          <div class="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        </div>
      </div>
    </div>

    <UCard class="p-6 personality-transition">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary personality-transition" />
          <span class="text-sm font-semibold text-muted-foreground">
            Personality {{ personality }} Activity
          </span>
        </div>
        <p class="text-lg leading-relaxed">{{ activityText }}</p>
      </div>
    </UCard>
  </div>
</template>
