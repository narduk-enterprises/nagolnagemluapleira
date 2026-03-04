// Define the order of voiceovers to play (matching page structure)
export const VOICEOVER_ORDER = [
  // Hero
  'planetData.hero.title',
  'planetData.hero.tagline',
  'planetData.hero.subtitle',
  // Big Idea
  'planetData.bigIdea.title',
  'planetData.bigIdea.intro',
  'planetData.bigIdea.explanation',
  'planetData.bigIdea.characteristics.personalityA',
  'planetData.bigIdea.characteristics.personalityB',
  // Life Styles
  'planetData.lifeStyles.title',
  'planetData.lifeStyles.intro',
  'planetData.lifeStyles.sections.daily-routine.title',
  'planetData.lifeStyles.sections.daily-routine.content',
  'planetData.lifeStyles.sections.school-life.title',
  'planetData.lifeStyles.sections.school-life.content',
  'planetData.lifeStyles.sections.family-structure.title',
  'planetData.lifeStyles.sections.family-structure.content',
  'planetData.lifeStyles.sections.homes.title',
  'planetData.lifeStyles.sections.homes.content',
  'planetData.lifeStyles.sections.entertainment.title',
  'planetData.lifeStyles.sections.entertainment.content',
  // Transportation
  'planetData.transportation.title',
  'planetData.transportation.intro',
  'planetData.transportation.sections.vehicles.title',
  'planetData.transportation.sections.vehicles.content',
  'planetData.transportation.sections.rules.title',
  'planetData.transportation.sections.rules.content',
  'planetData.transportation.sections.technology.title',
  'planetData.transportation.sections.technology.content',
  'planetData.transportation.sections.safety.title',
  'planetData.transportation.sections.safety.content',
  // Government
  'planetData.government.title',
  'planetData.government.intro',
  'planetData.government.branches.znerential.name',
  'planetData.government.branches.znerential.description',
  'planetData.government.branches.notletial.name',
  'planetData.government.branches.notletial.description',
  'planetData.government.branches.ynnedive.name',
  'planetData.government.branches.ynnedive.description',
  'planetData.government.branches.gnikicial.name',
  'planetData.government.branches.gnikicial.description',
  // Holidays
  'planetData.holidays.title',
  'planetData.holidays.intro',
  'planetData.holidays.holidays.sdrawkcab.name',
  'planetData.holidays.holidays.sdrawkcab.description',
  'planetData.holidays.holidays.sdrawkcab.traditions',
  'planetData.holidays.holidays.sdrawkcab.candleRitual',
  'planetData.holidays.holidays.gnihsinotsa.name',
  'planetData.holidays.holidays.gnihsinotsa.description',
  'planetData.holidays.holidays.gnihsinotsa.traditions',
  'planetData.holidays.holidays.gnihsinotsa.dualCelebration',
  // Anthem
  'planetData.anthem.title',
  'planetData.anthem.intro',
  // Quote
  'planetData.quote.title',
  'planetData.quote.quote',
  'planetData.quote.author',
  'planetData.quote.explanation',
  // Credits
  'planetData.credits.title',
  'planetData.credits.intro',
  'planetData.credits.authors.0',
  'planetData.credits.authors.1',
  'planetData.credits.authors.2',
  'planetData.credits.authors.3',
]

// Map voiceover keys to section IDs for scrolling
export const VOICEOVER_TO_SECTION: Record<string, string> = {
  'planetData.hero.title': 'hero',
  'planetData.hero.tagline': 'hero',
  'planetData.hero.subtitle': 'hero',
  'planetData.bigIdea.title': 'big-idea',
  'planetData.bigIdea.intro': 'big-idea',
  'planetData.bigIdea.explanation': 'big-idea',
  'planetData.bigIdea.characteristics.personalityA': 'big-idea',
  'planetData.bigIdea.characteristics.personalityB': 'big-idea',
  'planetData.lifeStyles.title': 'life-styles',
  'planetData.lifeStyles.intro': 'life-styles',
  'planetData.lifeStyles.sections.daily-routine.title': 'life-styles',
  'planetData.lifeStyles.sections.daily-routine.content': 'life-styles',
  'planetData.lifeStyles.sections.school-life.title': 'life-styles',
  'planetData.lifeStyles.sections.school-life.content': 'life-styles',
  'planetData.lifeStyles.sections.family-structure.title': 'life-styles',
  'planetData.lifeStyles.sections.family-structure.content': 'life-styles',
  'planetData.lifeStyles.sections.homes.title': 'life-styles',
  'planetData.lifeStyles.sections.homes.content': 'life-styles',
  'planetData.lifeStyles.sections.entertainment.title': 'life-styles',
  'planetData.lifeStyles.sections.entertainment.content': 'life-styles',
  'planetData.transportation.title': 'transportation',
  'planetData.transportation.intro': 'transportation',
  'planetData.transportation.sections.vehicles.title': 'transportation',
  'planetData.transportation.sections.vehicles.content': 'transportation',
  'planetData.transportation.sections.rules.title': 'transportation',
  'planetData.transportation.sections.rules.content': 'transportation',
  'planetData.transportation.sections.technology.title': 'transportation',
  'planetData.transportation.sections.technology.content': 'transportation',
  'planetData.transportation.sections.safety.title': 'transportation',
  'planetData.transportation.sections.safety.content': 'transportation',
  'planetData.government.title': 'government',
  'planetData.government.intro': 'government',
  'planetData.government.branches.znerential.name': 'government',
  'planetData.government.branches.znerential.description': 'government',
  'planetData.government.branches.notletial.name': 'government',
  'planetData.government.branches.notletial.description': 'government',
  'planetData.government.branches.ynnedive.name': 'government',
  'planetData.government.branches.ynnedive.description': 'government',
  'planetData.government.branches.gnikicial.name': 'government',
  'planetData.government.branches.gnikicial.description': 'government',
  'planetData.holidays.title': 'holidays',
  'planetData.holidays.intro': 'holidays',
  'planetData.holidays.holidays.sdrawkcab.name': 'holidays',
  'planetData.holidays.holidays.sdrawkcab.description': 'holidays',
  'planetData.holidays.holidays.sdrawkcab.traditions': 'holidays',
  'planetData.holidays.holidays.sdrawkcab.candleRitual': 'holidays',
  'planetData.holidays.holidays.gnihsinotsa.name': 'holidays',
  'planetData.holidays.holidays.gnihsinotsa.description': 'holidays',
  'planetData.holidays.holidays.gnihsinotsa.traditions': 'holidays',
  'planetData.holidays.holidays.gnihsinotsa.dualCelebration': 'holidays',
  'planetData.anthem.title': 'anthem',
  'planetData.anthem.intro': 'anthem',
  'planetData.quote.title': 'quote',
  'planetData.quote.quote': 'quote',
  'planetData.quote.author': 'quote',
  'planetData.quote.explanation': 'quote',
  'planetData.credits.title': 'credits',
  'planetData.credits.intro': 'credits',
  'planetData.credits.authors.0': 'credits',
  'planetData.credits.authors.1': 'credits',
  'planetData.credits.authors.2': 'credits',
  'planetData.credits.authors.3': 'credits',
}

// Map section IDs to their first voiceover key
export const SECTION_TO_FIRST_VOICEOVER: Record<string, string> = {
  'hero': 'planetData.hero.title',
  'big-idea': 'planetData.bigIdea.title',
  'life-styles': 'planetData.lifeStyles.title',
  'transportation': 'planetData.transportation.title',
  'government': 'planetData.government.title',
  'holidays': 'planetData.holidays.title',
  'anthem': 'planetData.anthem.title',
  'quote': 'planetData.quote.title',
  'credits': 'planetData.credits.title',
}

/**
 * Finds the index in VOICEOVER_ORDER for the first voiceover of a section
 */
export function getSectionStartIndex(sectionId: string): number {
  const firstVoiceover = SECTION_TO_FIRST_VOICEOVER[sectionId]
  if (!firstVoiceover) return 0

  const index = VOICEOVER_ORDER.indexOf(firstVoiceover)
  return index >= 0 ? index : 0
}

/**
 * Finds the section ID for a given voiceover key
 */
export function getSectionForVoiceover(voiceoverKey: string): string | null {
  return VOICEOVER_TO_SECTION[voiceoverKey] || null
}
