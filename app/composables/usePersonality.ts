export const usePersonality = () => {
  const personality = useState<'A' | 'B'>('personality', () => 'A')
  
  const togglePersonality = () => {
    personality.value = personality.value === 'A' ? 'B' : 'A'
  }
  
  return {
    personality,
    togglePersonality
  }
}
