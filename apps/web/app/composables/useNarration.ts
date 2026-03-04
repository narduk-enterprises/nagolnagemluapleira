import { ref } from 'vue'

const isNarrating = ref(false)
const isPaused = ref(false)
const currentVoiceoverKey = ref<string | null>(null)
const currentSectionId = ref<string | null>(null)
const currentVoiceoverIndex = ref<number | null>(null)
const visibleSectionId = ref<string | null>(null)
const onNavigationCallbacks = ref<((index: number) => void)[]>([])

export function useNarration() {
  function setIsNarrating(val: boolean) {
    isNarrating.value = val
  }
  
  function setVisibleSectionId(id: string | null) {
    visibleSectionId.value = id
  }
  
  function setIsPaused(val: boolean) {
    isPaused.value = val
  }
  
  function setCurrentVoiceoverKey(key: string | null) {
    currentVoiceoverKey.value = key
  }
  
  function setCurrentSectionId(id: string | null) {
    currentSectionId.value = id
  }
  
  function setCurrentVoiceoverIndex(index: number | null) {
    currentVoiceoverIndex.value = index
  }

  // Navigation handler logic for external components (like TourNavigation) to control playback

  function registerNavigationHandler(cb: (index: number) => void) {
    onNavigationCallbacks.value.push(cb)
    return () => {
      onNavigationCallbacks.value = onNavigationCallbacks.value.filter(fn => fn !== cb)
    }
  }

  function emitNavigation(index: number) {
    onNavigationCallbacks.value.forEach(cb => cb(index))
  }

  return {
    isNarrating,
    isPaused,
    currentVoiceoverKey,
    currentSectionId,
    currentVoiceoverIndex,
    visibleSectionId,
    setIsNarrating,
    setVisibleSectionId,
    setIsPaused,
    setCurrentVoiceoverKey,
    setCurrentSectionId,
    setCurrentVoiceoverIndex,
    registerNavigationHandler,
    emitNavigation
  }
}
