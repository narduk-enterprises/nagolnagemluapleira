export async function getVoiceoverUrl(key: string): Promise<string | undefined> {
  // Try mapping the object path pattern from the JSON locally.
  // The client will fetch /voiceover/index.json which provides key-to-mp3-path mappings.
  try {
    const res = await fetch('/voiceover/index.json')
    if (!res.ok) return undefined
    const index = await res.json()
    return index[key]?.mp3
  } catch (error) {
    console.warn("Could not load voiceover index map.")
    return undefined
  }
}
