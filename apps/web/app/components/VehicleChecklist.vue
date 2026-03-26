<script setup lang="ts">
import { planetData } from '~/utils/planetData'

const checkedItems = ref<Record<string, boolean>>({})

const requirements = planetData.transportation.requirements
const requiredCount = requirements.filter((req) => req.required).length

const checkedCount = computed(() => {
  return requirements.filter((req) => checkedItems.value[req.id]).length
})

const requiredCheckedCount = computed(() => {
  return requirements.filter((req) => req.required && checkedItems.value[req.id]).length
})

const passed = computed(() => requiredCheckedCount.value === requiredCount)
const progress = computed(() => (checkedCount.value / requirements.length) * 100)
</script>

<template>
  <UCard class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium flex items-center gap-2">Requirements</span>
      <UBadge :color="passed ? 'success' : 'neutral'" class="transition-colors">
        {{ passed ? 'PASS' : 'FAIL' }}
      </UBadge>
    </div>

    <!-- Cannot use Nuxt UI's UProgress easily, so we use a custom one for exact 1:1 match -->
    <div class="relative w-full h-2 overflow-hidden rounded-full bg-secondary">
      <div
        class="h-full bg-primary transition-all duration-500 ease-in-out"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <div class="space-y-3 pt-2">
      <div v-for="req in requirements" :key="req.id" class="flex items-start gap-3 group">
        <UCheckbox
          :id="req.id"
          v-model="checkedItems[req.id]"
          class="mt-1"
          :label="req.item + (req.required ? ' *REQUIRED' : '')"
          :ui="{
            label:
              'text-sm leading-relaxed cursor-pointer select-none group-hover:text-primary transition-colors',
          }"
        />
      </div>
    </div>

    <div
      class="text-xs text-[var(--color-muted-foreground)] border-t border-[var(--color-border)] pt-4"
    >
      {{ requiredCheckedCount }} of {{ requiredCount }} required items checked &bull;
      {{ checkedCount }} of {{ requirements.length }} total
    </div>
  </UCard>
</template>
