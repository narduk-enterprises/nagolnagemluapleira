export function useNarration() {
  const isNarrating = useState('narration-isNarrating', () => false);
  const isPaused = useState('narration-isPaused', () => false);
  const currentVoiceoverKey = useState<string | null>('narration-currentVoiceoverKey', () => null);
  const currentSectionId = useState<string | null>('narration-currentSectionId', () => null);
  const currentVoiceoverIndex = useState<number | null>(
    'narration-currentVoiceoverIndex',
    () => null
  );
  const visibleSectionId = useState<string | null>('narration-visibleSectionId', () => null);
  const onNavigationCallbacks = useState<((index: number) => void)[]>(
    'narration-onNavigationCallbacks',
    () => []
  );

  function setIsNarrating(val: boolean) {
    isNarrating.value = val;
  }

  function setVisibleSectionId(id: string | null) {
    visibleSectionId.value = id;
  }

  function setIsPaused(val: boolean) {
    isPaused.value = val;
  }

  function setCurrentVoiceoverKey(key: string | null) {
    currentVoiceoverKey.value = key;
  }

  function setCurrentSectionId(id: string | null) {
    currentSectionId.value = id;
  }

  function setCurrentVoiceoverIndex(index: number | null) {
    currentVoiceoverIndex.value = index;
  }

  // Navigation handler logic for external components (like TourNavigation) to control playback

  function registerNavigationHandler(cb: (index: number) => void) {
    onNavigationCallbacks.value.push(cb);
    return () => {
      onNavigationCallbacks.value = onNavigationCallbacks.value.filter((fn) => fn !== cb);
    };
  }

  function emitNavigation(index: number) {
    for (const cb of onNavigationCallbacks.value) {
      cb(index);
    }
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
    emitNavigation,
  };
}
