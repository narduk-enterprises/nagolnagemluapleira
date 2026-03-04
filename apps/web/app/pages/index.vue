<script setup lang="ts">
import { planetData } from '~/utils/planetData'

// microcopy was removed as it was unused.

useSeoMeta({
  title: planetData.hero.title,
  description: planetData.hero.subtitle,
})

function scrollToSection(sectionId: string) {
  if (import.meta.client) {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-background personality-transition overflow-x-hidden max-w-full">
    <PersonalityToggle />
    <NarrateButton />
    <TourNavigation />

    <!-- HeroSection inline -->
    <section
      id="hero"
      class="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center relative overflow-hidden transition-all duration-500"
    >
      <div
        class="absolute inset-0 opacity-20 personality-transition"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, var(--color-primary) 35px, var(--color-primary) 36px);"
      />

      <div class="relative z-10 w-full max-w-lg mx-auto space-y-6 transition-all duration-500">
        <div class="mx-auto max-w-xs w-full mb-4 relative logo-container">
          <img 
            src="/images/nagolnagemcover.png" 
            alt="Nagolnagemluapleira Logo"
            class="w-full h-auto personality-transition block"
            style="filter: sepia(60%) saturate(150%) hue-rotate(10deg) brightness(0.95);"
          />
        </div>

        <HighlightableText as="h1" class="text-4xl font-bold tracking-tight personality-transition text-[var(--color-primary)] text-center">
          <GlossaryTerm term="Nagolnagemluapleira">
            {{ planetData.hero.title }}
          </GlossaryTerm>
        </HighlightableText>

        <HighlightableText as="p" class="text-xl font-medium text-[var(--color-foreground)]/70 text-center">
          {{ planetData.hero.tagline }}
        </HighlightableText>

        <HighlightableText as="p" class="text-base text-[var(--color-muted-foreground)] leading-relaxed text-center">
          {{ planetData.hero.subtitle }}
        </HighlightableText>

        <div class="flex flex-col items-center justify-center gap-3 pt-4">
          <UButton
            size="lg"
            class="w-full text-base px-6 py-5 justify-center"
            @click="scrollToSection('big-idea')"
          >
            Explore
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            class="w-full text-base px-6 py-5 justify-center"
            @click="scrollToSection('anthem')"
          >
            Read the Anthem
          </UButton>
        </div>

        <div class="pt-4 relative z-50">
          <RandomFact />
        </div>
      </div>
    </section>

    <SectionShell id="big-idea" :title="planetData.bigIdea.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.bigIdea.intro }}
        </HighlightableText>
        
        <UCard class="p-5 bg-[var(--color-muted)]/50">
          <HighlightableText class="text-sm leading-relaxed text-[var(--color-foreground)]/90">
            {{ planetData.bigIdea.explanation }}
          </HighlightableText>
        </UCard>

        <div class="space-y-4 pt-2">
          <UCard class="p-5 space-y-3 border-2 border-[var(--color-primary)]/30">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-[var(--color-primary)] personality-transition" />
              <h3 class="text-lg font-semibold text-[var(--color-foreground)]">Personality A</h3>
            </div>
            <HighlightableText class="text-sm leading-relaxed text-[var(--color-foreground)]/80">
              {{ planetData.bigIdea.characteristics.personalityA }}
            </HighlightableText>
          </UCard>

          <UCard class="p-5 space-y-3 border-2 border-[var(--color-accent)]/30">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-[var(--color-accent)] personality-transition" />
              <h3 class="text-lg font-semibold text-[var(--color-foreground)]">Personality B</h3>
            </div>
            <HighlightableText class="text-sm leading-relaxed text-[var(--color-foreground)]/80">
              {{ planetData.bigIdea.characteristics.personalityB }}
            </HighlightableText>
          </UCard>
        </div>

        <div class="text-center pt-4">
          <p class="text-xs text-[var(--color-muted-foreground)] italic">
            Tap highlighted terms to learn pronunciation and meaning
          </p>
        </div>
      </div>
    </SectionShell>

    <SectionShell id="life-styles" :title="planetData.lifeStyles.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.lifeStyles.intro }}
        </HighlightableText>

        <TimelineScrubber />

        <USeparator class="my-6" />

        <div class="space-y-4">
          <UCarousel
            v-slot="{ item: section }"
            :items="planetData.lifeStyles.sections"
            class="w-full"
            :ui="{ item: 'basis-full md:basis-1/2 md:pl-4 first:pl-0 snap-align-start' }"
            arrows
            indicators
          >
            <UCard class="p-5 space-y-3 w-full mx-2 h-full">
              <HighlightableText as="h3" class="text-lg font-semibold text-[var(--color-primary)] personality-transition block">
                {{ section.title }}
              </HighlightableText>
              <HighlightableText class="text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-foreground)]/80">
                {{ section.content }}
              </HighlightableText>
            </UCard>
          </UCarousel>
        </div>
      </div>
    </SectionShell>

    <SectionShell id="transportation" :title="planetData.transportation.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.transportation.intro }}
        </HighlightableText>

        <VehicleChecklist />

        <USeparator class="my-6" />

        <div class="space-y-4">
          <UCard v-for="section in planetData.transportation.sections" :key="section.id" class="p-5 space-y-3">
            <HighlightableText as="h3" class="text-lg font-semibold text-[var(--color-primary)] personality-transition block">
              {{ section.title }}
            </HighlightableText>
            <HighlightableText class="text-sm leading-relaxed text-[var(--color-foreground)]/80">
              {{ section.content }}
            </HighlightableText>
          </UCard>
        </div>
      </div>
    </SectionShell>

    <SectionShell id="government" :title="planetData.government.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.government.intro }}
        </HighlightableText>

        <BranchDiagram />

        <p class="text-xs text-[var(--color-muted-foreground)] text-center italic pt-2">
          All of these branches put together make up the Nagolnagemluapleiran Trecnoc Government.
        </p>
      </div>
    </SectionShell>

    <SectionShell id="holidays" :title="planetData.holidays.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.holidays.intro }}
        </HighlightableText>

        <div class="flex justify-center">
          <EasterEggTooltip />
        </div>

        <HolidayCalendar />
      </div>
    </SectionShell>

    <SectionShell id="anthem" :title="planetData.anthem.title">
      <div class="space-y-6">
        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.anthem.intro }}
        </HighlightableText>

        <AnthemKaraoke />
      </div>
    </SectionShell>

    <SectionShell id="quote" :title="planetData.quote.title">
      <div class="space-y-6">
        <UCard class="p-6 bg-[var(--color-muted)]/50">
          <blockquote class="space-y-3">
            <HighlightableText class="text-xl font-medium leading-relaxed italic text-[var(--color-foreground)]/90">
              "{{ planetData.quote.quote }}"
            </HighlightableText>
            <HighlightableText as="p" class="text-base text-[var(--color-muted-foreground)] text-right pr-4">
              &mdash; {{ planetData.quote.author }}
            </HighlightableText>
          </blockquote>
        </UCard>

        <HighlightableText class="text-base leading-relaxed text-[var(--color-foreground)]">
          {{ planetData.quote.explanation }}
        </HighlightableText>
      </div>
    </SectionShell>

    <SectionShell id="original-pages" title="All Original Pages">
      <div class="space-y-4">
        <OriginalPagesGallery />
      </div>
    </SectionShell>

    <SectionShell id="credits" :title="planetData.credits.title">
      <UCard class="p-6 space-y-5 text-center">
        <HighlightableText class="text-base font-medium text-[var(--color-foreground)]">
          {{ planetData.credits.intro }}
        </HighlightableText>

        <div class="space-y-2">
          <HighlightableText v-for="(author, index) in planetData.credits.authors" :key="index" class="text-lg font-semibold text-[var(--color-primary)] personality-transition block">
            {{ author }}
          </HighlightableText>
        </div>

        <USeparator />

        <div class="space-y-2 text-xs text-[var(--color-muted-foreground)]">
          <p class="font-mono">{{ planetData.credits.year }}</p>
          <p>{{ planetData.credits.class }}</p>
          <p class="italic">{{ planetData.credits.note }}</p>
        </div>

        <div class="pt-4">
          <RandomFact />
        </div>
      </UCard>
    </SectionShell>

    <div class="py-6 text-center text-xs text-[var(--color-muted-foreground)] border-t border-[var(--color-border)] no-print mt-12 mb-20 md:mb-6">
      <p>An interactive planet report &bull; Built with curiosity and code</p>
    </div>
  </div>
</template>
