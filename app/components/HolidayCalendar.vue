<script setup lang="ts">
import { planetData } from '~/utils/planetData'

const days = Array.from({ length: 20 }, (_, i) => i + 1)
const specialDay = planetData.holidays.calendar.specialDay
</script>

<template>
  <div class="space-y-8">
    <UCard class="p-6">
      <h3 class="text-lg font-semibold mb-4">Holiday Calendar</h3>
      <div class="grid grid-cols-10 gap-2">
        <div
          v-for="day in days"
          :key="day"
          class="aspect-square rounded-lg flex items-center justify-center text-sm font-mono transition-all"
          :class="day === specialDay
            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg scale-110 font-bold'
            : 'bg-[var(--color-muted)] hover:bg-[var(--color-muted)]/70'"
        >
          {{ day }}
        </div>
      </div>
      <p class="text-xs text-[var(--color-muted-foreground)] mt-4 text-center">
        {{ planetData.holidays.calendar.note }}
      </p>
    </UCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="(holiday, index) in planetData.holidays.holidays"
        :key="holiday.id"
        class="p-6 space-y-4 hover:shadow-xl transition-shadow"
      >
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 personality-transition">
            <UIcon :name="index === 0 ? 'i-lucide-sparkles' : 'i-lucide-gift'" class="w-6 h-6 text-[var(--color-primary)] personality-transition" />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-1">
              <GlossaryTerm :term="holiday.name" />
            </h3>
            <p class="text-sm text-[var(--color-muted-foreground)] font-semibold">
              {{ holiday.theme }}
            </p>
          </div>
        </div>
        
        <div class="space-y-3 text-sm leading-relaxed">
          <p>{{ holiday.description }}</p>
          
          <div class="border-l-2 border-[var(--color-primary)] pl-4 space-y-2">
            <p class="font-semibold">Traditions:</p>
            <p class="text-[var(--color-foreground)]/80">{{ holiday.traditions }}</p>
          </div>
          
          <div v-if="holiday.candleRitual" class="border-l-2 border-[var(--color-accent)] pl-4 space-y-2">
            <p class="font-semibold">Candle Ritual:</p>
            <p class="text-[var(--color-foreground)]/80">{{ holiday.candleRitual }}</p>
          </div>
          
          <div v-if="holiday.dualCelebration" class="border-l-2 border-[var(--color-accent)] pl-4 space-y-2">
            <p class="font-semibold">Dual Celebration:</p>
            <p class="text-[var(--color-foreground)]/80">{{ holiday.dualCelebration }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
