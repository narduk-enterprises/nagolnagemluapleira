<script setup lang="ts">
import { ref } from 'vue'
import { planetData } from '~/utils/planetData'

const expandedBranch = ref<string | null>(null)
const showEarthComparison = ref(false)

const iconMap: Record<string, string> = {
  scales: 'i-lucide-scale',
  bank: 'i-lucide-landmark',
  users: 'i-lucide-users',
  gavel: 'i-lucide-gavel',
}

const earthComparisons: Record<string, string> = {
  znerential: "Similar to Earth's President/Prime Minister - but for the entire planet",
  notletial: "Like Earth's Supreme Court - interprets laws for dual personalities",
  ynnedive: "Similar to Earth's Congress/Parliament - creates laws",
  gnikicial: "Like Earth's Department of Justice + Emergency Services combined"
}

function handleBranchClick(branchId: string) {
  expandedBranch.value = expandedBranch.value === branchId ? null : branchId
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
      <label for="earth-comparison" class="text-sm font-medium flex items-center gap-2 cursor-pointer">
        <UIcon name="i-lucide-info" class="w-4 h-4" />
        Compare to Earth Government
      </label>
      <USwitch
        id="earth-comparison"
        v-model="showEarthComparison"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard
        v-for="branch in planetData.government.branches"
        :key="branch.id"
        class="p-6 cursor-pointer transition-all hover:shadow-lg"
        :class="{ 'md:col-span-2 bg-[var(--color-muted)]/50': expandedBranch === branch.id }"
        @click="handleBranchClick(branch.id)"
      >
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 personality-transition">
            <UIcon :name="iconMap[branch.icon]" class="w-6 h-6 text-[var(--color-primary)] personality-transition" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-semibold mb-2">
              <GlossaryTerm :term="branch.name" />
            </h3>
            
            <div
              class="overflow-hidden transition-all duration-300"
              :class="expandedBranch === branch.id ? 'max-h-96 opacity-100' : 'max-h-0 md:max-h-20 opacity-60'"
            >
              <p class="text-sm leading-relaxed text-[var(--color-foreground)]/80">
                {{ branch.description }}
              </p>
              
              <div v-if="showEarthComparison" class="mt-3 p-3 bg-[var(--color-accent)]/10 rounded-lg border border-[var(--color-accent)]/20">
                <p class="text-xs font-semibold text-[var(--color-accent)] mb-1">Earth Comparison:</p>
                <p class="text-sm text-[var(--color-foreground)]/70">
                  {{ earthComparisons[branch.id] }}
                </p>
              </div>
            </div>
            
            <button v-if="expandedBranch !== branch.id" class="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors mt-2 font-semibold">
              Click to expand
            </button>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
