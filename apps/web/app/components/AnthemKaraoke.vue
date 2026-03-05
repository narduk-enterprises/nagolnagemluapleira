<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { planetData } from '~/utils/planetData';

interface LineTiming {
  i: number;
  start: number;
  end: number;
  text: string;
}

const anthemTiming: LineTiming[] = [
  { i: 0, start: 0.16, end: 3, text: '.' },
  { i: 0, start: 3.25, end: 5.5, text: '..' },
  { i: 0, start: 5.5, end: 7.75, text: '...' },
  { i: 1, start: 10, end: 16, text: 'Nagol nagem luap leira,' },
  { i: 2, start: 16, end: 20, text: "It's where we live, and we take pride." },
  { i: 3, start: 21, end: 23.75, text: 'Two personalities,' },
  { i: 4, start: 23.75, end: 27, text: 'Twice the formalities,' },
  { i: 5, start: 29, end: 34, text: 'Dual lives, dual realities,' },
  { i: 6, start: 34, end: 38, text: 'Complexity refined.' },
  { i: 7, start: 38, end: 44, text: 'Each personality,' },
  { i: 8, start: 44, end: 52, text: 'dreams of unity and life' },
  { i: 9, start: 52.75, end: 55, text: 'prosperous and clean,' },
  { i: 10, start: 55, end: 57, text: 'Practical folk are we.' },
  { i: 11, start: 57.5, end: 60, text: 'Advanced technology,' },
  { i: 12, start: 60, end: 64, text: 'A flourishing economy' },
  { i: 1, start: 62, end: 66, text: 'Nagol nagem luap leira,' },
  { i: 13, start: 70, end: 82, text: 'Our future stands as one.' },
];

const isPlaying = ref(false);
const currentLine = ref(-1);
const isTransitioning = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isDragging = ref(false);
const audioRef = ref<HTMLAudioElement | null>(null);

function formatTime(seconds: number): string {
  if (Number.isNaN(seconds) || !Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function handleTimeUpdate() {
  if (!audioRef.value || isDragging.value) return;

  const time = audioRef.value.currentTime;
  currentTime.value = time;

  const activeLineIndex = anthemTiming.findIndex((line) => time >= line.start && time <= line.end);

  if (activeLineIndex === -1) {
    if (
      anthemTiming.length > 0 &&
      (time < (anthemTiming[0]?.start ?? 0) || time > (anthemTiming.at(-1)?.end ?? 0))
    ) {
      currentLine.value = -1;
    }
    return;
  }

  if (activeLineIndex !== currentLine.value) {
    isTransitioning.value = true;
    setTimeout(() => {
      currentLine.value = activeLineIndex;
      isTransitioning.value = false;
    }, 150);
  }
}

const syncAudio = () => {
  const audio = audioRef.value;
  if (audio) {
    currentTime.value = audio.currentTime;
    requestAnimationFrame(syncAudio);
  }
};

function handleLoadedMetadata() {
  const audio = audioRef.value;
  if (audio) {
    duration.value = audio.duration;
    // Sync duration on load
    requestAnimationFrame(syncAudio);
  }
}

function handleEnded() {
  isPlaying.value = false;
  currentLine.value = -1;
  isTransitioning.value = false;
  currentTime.value = 0;
}

watch(isPlaying, (newVal) => {
  if (!audioRef.value) return;

  if (newVal) {
    audioRef.value.play().catch(console.error);
  } else {
    audioRef.value.pause();
  }
});

function handlePlay() {
  if (!audioRef.value) return;
  if (currentLine.value >= anthemTiming.length - 1 || currentLine.value === -1) {
    audioRef.value.currentTime = 0;
    currentLine.value = -1;
  }
  isPlaying.value = true;
}

function handlePause() {
  isPlaying.value = false;
}

function handleReset() {
  if (!audioRef.value) return;
  audioRef.value.pause();
  audioRef.value.currentTime = 0;
  isPlaying.value = false;
  currentLine.value = -1;
  isTransitioning.value = false;
  currentTime.value = 0;
}

function handleSeek() {
  if (!audioRef.value) return;
  audioRef.value.currentTime = currentTime.value;
}

function handleSeekEnd() {
  isDragging.value = false;
  handleSeek();
}

const displayLine = computed(() => {
  if (currentLine.value >= 0 && currentLine.value < anthemTiming.length) {
    return anthemTiming[currentLine.value]?.text || '';
  }
  return '';
});

onMounted(() => {
  if (audioRef.value && audioRef.value.duration) {
    duration.value = audioRef.value.duration;
  }
});
</script>

<template>
  <UCard class="p-6 space-y-6">
    <audio
      ref="audioRef"
      src="/Nagol nagem luap leira,.mp3"
      preload="metadata"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
    />

    <div class="space-y-1">
      <h3 class="text-xl font-semibold select-none text-center">
        Anthem of {{ planetData.hero.title }}
      </h3>
    </div>

    <!-- Playback Controls -->
    <div class="space-y-4">
      <div class="flex items-center justify-center gap-3">
        <UButton
          @click="handleReset"
          variant="outline"
          size="sm"
          class="h-10 w-10 p-0 justify-center"
          icon="i-lucide-rotate-ccw"
          aria-label="Reset"
        />

        <UButton
          v-if="!isPlaying"
          @click="handlePlay"
          size="lg"
          icon="i-lucide-play"
          class="gap-2 h-12 px-6"
        >
          Play
        </UButton>
        <UButton
          v-else
          @click="handlePause"
          variant="soft"
          size="lg"
          icon="i-lucide-pause"
          class="gap-2 h-12 px-6"
        >
          Pause
        </UButton>
      </div>

      <!-- Scrubber -->
      <div class="space-y-2">
        <UInput
          type="range"
          v-model.number="currentTime"
          :max="duration || 100"
          step="0.1"
          class="w-full cursor-pointer accent-primary"
          @mousedown="isDragging = true"
          @mouseup="handleSeekEnd"
          @touchstart="isDragging = true"
          @touchend="handleSeekEnd"
        />

        <div class="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span class="font-mono">{{ formatTime(currentTime) }}</span>
          <span class="font-mono">{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <!-- Karaoke Display -->
    <div class="min-h-[120px] flex items-center justify-center py-4">
      <div
        class="py-6 px-6 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg transition-all duration-300"
        :class="isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
      >
        <p class="text-xl leading-relaxed font-medium select-none text-center">
          {{ displayLine || 'Ready to play...' }}
        </p>
      </div>
    </div>
  </UCard>
</template>
