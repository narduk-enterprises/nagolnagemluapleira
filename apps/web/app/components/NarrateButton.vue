<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { getVoiceoverUrl } from '~/utils/voiceover';
import { useNarration } from '~/composables/useNarration';
import { VOICEOVER_ORDER, VOICEOVER_TO_SECTION, getSectionStartIndex } from '~/utils/navigation';

const {
  isNarrating,
  isPaused,
  setIsNarrating,
  setIsPaused,
  registerNavigationHandler,
  visibleSectionId,
} = useNarration();

const currentIndex = ref(0);
const audioRef = ref<HTMLAudioElement | null>(null);
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);

async function focusVoiceoverTarget(params: {
  key: string;
  index: number;
  sectionId: string | null;
  cause: string;
}) {
  if (!import.meta.client) return;

  // Wait a tick for Vue updates
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (import.meta.client) {
    const targetElement = document.querySelector(`[data-voiceover="${params.key}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Fallback: scroll to the section if no specific voiceover target found
    if (params.sectionId) {
      const sectionEl = document.getElementById(params.sectionId);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

async function playAtIndex(
  index: number,
  forceScroll: boolean = false,
  cause?: 'restore' | 'narration-manual' | 'narration-auto'
) {
  if (index < 0 || index >= VOICEOVER_ORDER.length) return;

  const key = VOICEOVER_ORDER[index] || '';
  const url = await getVoiceoverUrl(key);

  if (!url) {
    // Skip if no audio
    if (index < VOICEOVER_ORDER.length - 1) {
      await playAtIndex(index + 1, forceScroll, cause);
    }
    return;
  }

  const sectionId = (VOICEOVER_TO_SECTION as Record<string, string>)[key] || '';
  currentIndex.value = index;

  const focusCause = cause || (forceScroll ? 'narration-manual' : 'narration-auto');
  await focusVoiceoverTarget({ key, index, sectionId, cause: focusCause });

  try {
    if (audioRef.value) {
      audioRef.value.pause();
      audioRef.value = null;
    }

    if (import.meta.client) {
      const audio = new Audio(url);
      audioRef.value = audio;

      audio.addEventListener('ended', () => {
        timeoutRef.value = setTimeout(() => {
          if (!isPaused.value && isNarrating.value) {
            if (index < VOICEOVER_ORDER.length - 1) {
              playAtIndex(index + 1, false, 'narration-auto');
            } else {
              setIsNarrating(false);
              setIsPaused(false);
              currentIndex.value = 0;
            }
          }
        }, 300);
      });

      audio.addEventListener('error', () => {
        console.error(`Error playing ${key}`);
        if (index < VOICEOVER_ORDER.length - 1) {
          playAtIndex(index + 1, forceScroll, cause);
        }
      });

      if (!isPaused.value) {
        await audio.play();
      }
    }
  } catch (_error) {
    if (index < VOICEOVER_ORDER.length - 1) {
      await playAtIndex(index + 1, forceScroll, cause);
    }
  }
}

onMounted(() => {
  const unregister = registerNavigationHandler((index: number) => {
    currentIndex.value = index;
    if (audioRef.value) audioRef.value.pause();
    if (timeoutRef.value) clearTimeout(timeoutRef.value);

    playAtIndex(index, true, 'narration-manual');
  });

  return unregister;
});

function handlePlayStop() {
  if (!isNarrating.value) {
    setIsNarrating(true);
    setIsPaused(false);

    let startIndex = 0;
    if (visibleSectionId.value) {
      startIndex = getSectionStartIndex(visibleSectionId.value);
    }

    currentIndex.value = startIndex;
    playAtIndex(startIndex, true, 'restore');
  } else {
    setIsNarrating(false);
    setIsPaused(false);
    currentIndex.value = 0;

    if (audioRef.value) {
      audioRef.value.pause();
      audioRef.value.currentTime = 0;
      audioRef.value = null;
    }

    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
      timeoutRef.value = null;
    }
  }
}

function handlePrevious() {
  if (currentIndex.value > 0) {
    const newIndex = currentIndex.value - 1;
    currentIndex.value = newIndex;
    if (audioRef.value) audioRef.value.pause();
    if (timeoutRef.value) clearTimeout(timeoutRef.value);
    playAtIndex(newIndex, true, 'narration-manual');
  }
}

function handleNext() {
  if (currentIndex.value < VOICEOVER_ORDER.length - 1) {
    const newIndex = currentIndex.value + 1;
    currentIndex.value = newIndex;
    if (audioRef.value) audioRef.value.pause();
    if (timeoutRef.value) clearTimeout(timeoutRef.value);
    playAtIndex(newIndex, true, 'narration-manual');
  }
}

watch([isNarrating, isPaused], ([narrating, paused]) => {
  if (!narrating && !paused) {
    if (audioRef.value) {
      audioRef.value.pause();
      audioRef.value = null;
    }
    if (timeoutRef.value) clearTimeout(timeoutRef.value);
  }
});

onUnmounted(() => {
  if (audioRef.value) audioRef.value.pause();
  if (timeoutRef.value) clearTimeout(timeoutRef.value);
});

const canGoBack = computed(() => currentIndex.value > 0);
const canGoForward = computed(() => currentIndex.value < VOICEOVER_ORDER.length - 1);
</script>

<template>
  <div class="fixed top-6 left-6 z-50 no-print flex items-center gap-2 min-w-[140px]">
    <UButton
      v-if="!isNarrating"
      size="lg"
      variant="outline"
      aria-label="Start narration"
      class="gap-2 w-full justify-center border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur shadow-lg text-[var(--color-foreground)] hover:bg-[var(--color-muted)] hover:opacity-90 transition-all font-display"
      icon="i-lucide-play"
      @click="handlePlayStop"
    >
      Narrate
    </UButton>

    <div
      v-else
      class="flex items-center gap-1 w-full bg-[var(--color-card)]/95 backdrop-blur shadow-lg border border-[var(--color-primary)] rounded-lg p-1"
    >
      <UButton
        size="md"
        aria-label="Stop narration"
        class="gap-1.5 flex-1 animate-pulse justify-center font-display"
        icon="i-lucide-square"
        @click="handlePlayStop"
      >
        <span class="text-sm">Stop</span>
      </UButton>

      <UButton
        size="md"
        variant="ghost"
        color="neutral"
        :disabled="!canGoBack"
        class="p-1.5 shrink-0"
        icon="i-lucide-chevron-left"
        aria-label="Previous section"
        @click="handlePrevious"
      />

      <UButton
        size="md"
        variant="ghost"
        color="neutral"
        :disabled="!canGoForward"
        class="p-1.5 shrink-0"
        icon="i-lucide-chevron-right"
        aria-label="Next section"
        @click="handleNext"
      />
    </div>
  </div>
</template>
