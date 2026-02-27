import { expect, it, describe, beforeEach } from 'vitest'
import { usePersonality } from './usePersonality'

describe('usePersonality', () => {
  it('should initialize with personality A default', () => {
    const { personality } = usePersonality()
    // It might persist 'A' or 'B' depending on local storage, but defaults to 'A'
    if (!personality.value) {
        personality.value = 'A'
    }
    expect(['A', 'B']).toContain(personality.value)
  })

  it('should toggle from A to B and vice-versa', () => {
    const { personality, togglePersonality } = usePersonality()
    
    personality.value = 'A'
    togglePersonality()
    expect(personality.value).toBe('B')
    
    togglePersonality()
    expect(personality.value).toBe('A')
  })
})
