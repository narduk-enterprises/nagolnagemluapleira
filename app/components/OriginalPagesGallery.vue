<script setup lang="ts">
import { ref } from 'vue'
import { originalPages } from '~/utils/planetData'

const isModalOpen = ref(false)
const selectedIndex = ref<number | null>(null)
const scale = ref(1)

function openViewer(index: number) {
  selectedIndex.value = index
  scale.value = 1
  isModalOpen.value = true
}

function closeViewer() {
  isModalOpen.value = false
  selectedIndex.value = null
  scale.value = 1
}

function navigatePrev() {
  if (selectedIndex.value !== null && selectedIndex.value > 0) {
    selectedIndex.value--
    scale.value = 1
  }
}

function navigateNext() {
  if (selectedIndex.value !== null && selectedIndex.value < originalPages.length - 1) {
    selectedIndex.value++
    scale.value = 1
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <p class="text-base text-[var(--color-muted-foreground)]">
        View the original scanned pages from the 6th grade report
      </p>
      <p class="text-xs text-[var(--color-muted-foreground)] italic">
        Scroll horizontally • Tap to view full size
      </p>
    </div>

    <UCarousel
      v-slot="{ item, index }"
      :items="originalPages"
      class="rounded-lg w-full"
      :ui="{ item: 'basis-4/5 sm:basis-1/2 md:basis-1/3 pl-4 first:pl-0' }"
      arrows
      indicators
    >
      <UCard
        class="group overflow-hidden cursor-pointer transition-all active:scale-[0.98] w-full"
        @click="openViewer(index)"
      >
        <div class="relative aspect-[3/4] bg-[var(--color-muted)]">
          <!-- Force eager loading for smooth viewing -->
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        <div class="p-3">
          <p class="text-sm font-medium text-center">{{ item.caption }}</p>
        </div>
      </UCard>
    </UCarousel>

    <UModal v-model:open="isModalOpen" fullscreen :ui="{ overlay: 'bg-black/95' }">
        <div v-if="selectedIndex !== null && originalPages[selectedIndex]" class="flex flex-col h-full bg-black/95 text-white">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 z-10 shrink-0">
            <div class="text-sm md:text-base">
              <p class="font-medium">{{ originalPages[selectedIndex]?.caption }}</p>
              <p class="text-white/70">Page {{ selectedIndex + 1 }} of {{ originalPages.length }}</p>
            </div>
            <UButton
              variant="ghost"
              icon="i-lucide-x"
              class="text-white hover:bg-white/20"
              @click="closeViewer"
              aria-label="Close viewer"
            />
          </div>

          <!-- Main Content (Image) -->
          <div class="flex-1 relative overflow-hidden flex items-center justify-center">
            <img
              :src="originalPages[selectedIndex]?.src"
              :alt="originalPages[selectedIndex]?.alt"
              class="max-w-full max-h-full object-contain select-none transition-transform duration-300"
              :style="{ transform: `scale(${scale})` }"
            />

          <!-- Controls -->
          <div class="absolute inset-y-0 left-0 flex items-center p-4">
            <UButton
              v-if="selectedIndex > 0"
              variant="ghost"
              icon="i-lucide-chevron-left"
              class="text-white hover:bg-white/20 w-12 h-12 [&>span]:w-8 [&>span]:h-8"
              @click="navigatePrev"
              aria-label="Previous page"
            />
          </div>
          
          <div class="absolute inset-y-0 right-0 flex items-center p-4">
            <UButton
              v-if="selectedIndex < originalPages.length - 1"
              variant="ghost"
              icon="i-lucide-chevron-right"
              class="text-white hover:bg-white/20 w-12 h-12 [&>span]:w-8 [&>span]:h-8"
              @click="navigateNext"
              aria-label="Next page"
            />
          </div>
          
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 p-2 rounded-full backdrop-blur">
            <UButton icon="i-lucide-zoom-out" variant="ghost" class="text-white" @click="scale = Math.max(0.5, scale - 0.25)" />
            <span class="text-sm min-w-12 text-center">{{ Math.round(scale * 100) }}%</span>
            <UButton icon="i-lucide-zoom-in" variant="ghost" class="text-white" @click="scale = Math.min(3, scale + 0.25)" />
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
