// Use public directory paths for Nuxt 4
const coverPage = '/images/original-pages/cover.jpeg'
const anthemPage = '/images/original-pages/anthem.jpeg'
const quotePage = '/images/original-pages/quote.jpeg'
const holidayPage = '/images/original-pages/holiday.jpeg'
const governmentPage = '/images/original-pages/government.jpeg'
const lifestylesPage = '/images/original-pages/lifestyles.jpeg'

export interface GlossaryTerm {
  term: string
  pronunciation: string
  definition: string
}

export interface Section {
  id: string
  title: string
  content: string[]
}

export interface OriginalPage {
  id: string
  src: string
  alt: string
  caption: string
  notes?: string
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Nagolnagemluapleira',
    pronunciation: 'nah-gol-NAH-gem-loo-ah-PLAY-rah',
    definition:
      'The dual-personality planet where inhabitants switch between two personas every 12 hours.',
  },
  {
    term: 'Znerential Branch',
    pronunciation: 'zneh-REN-shul',
    definition: 'One of the four branches of government on Nagolnagemluapleira.',
  },
  {
    term: 'Notletial Branch',
    pronunciation: 'not-LEE-shul',
    definition: 'One of the four branches of government on Nagolnagemluapleira.',
  },
  {
    term: 'Ynnedive Branch',
    pronunciation: 'YIN-eh-div',
    definition: 'One of the four branches of government on Nagolnagemluapleira.',
  },
  {
    term: 'Gnikicial Branch',
    pronunciation: 'gnih-KIH-shul',
    definition: 'One of the four branches of government on Nagolnagemluapleira.',
  },
  {
    term: 'SDRAWKCAB',
    pronunciation: 'SDRAW-kab',
    definition:
      'A holiday of hope and wishing, celebrated on the 13th day with candle rituals tied to the 12-hour personality cycle.',
  },
  {
    term: 'GNIHSINOTSA',
    pronunciation: 'GNIH-shin-OT-sah',
    definition:
      'A holiday of giving and sharing, where presents are exchanged and then repeated with the other personality.',
  },
]

export const originalPages: OriginalPage[] = [
  {
    id: 'page-1',
    src: coverPage,
    alt: 'Original page 1 — Cover page of the Nagolnagemluapleira report',
    caption: 'Original page 1 — Cover',
    notes: '',
  },
  {
    id: 'page-2',
    src: anthemPage,
    alt: 'Original page 2 — Planetary anthem and introduction',
    caption: 'Original page 2 — Anthem',
    notes: '',
  },
  {
    id: 'page-3',
    src: quotePage,
    alt: 'Original page 3 — Quote and theme explanation',
    caption: 'Original page 3 — Quote & Theme',
    notes: '',
  },
  {
    id: 'page-4',
    src: holidayPage,
    alt: 'Original page 4 — Holidays and celebrations',
    caption: 'Original page 4 — Holidays',
    notes: '',
  },
  {
    id: 'page-5',
    src: governmentPage,
    alt: 'Original page 5 — Government branches and structure',
    caption: 'Original page 5 — Government',
    notes: '',
  },
  {
    id: 'page-6',
    src: lifestylesPage,
    alt: 'Original page 6 — Transportation and life styles',
    caption: 'Original page 6 — Transportation & Life',
    notes: '',
  },
]

export const planetData = {
  hero: {
    title: 'Nagolnagemluapleira',
    tagline: 'A 6th grade world-building report (interactive edition)',
    subtitle: 'Created by: Paul Tilton, Logan Renz, Megan King, and Ariel Denny.',
  },

  bigIdea: {
    title: 'Quick World Summary',
    intro:
      'Welcome to Nagolnagemluapleira, a planet where inhabitants experience life through two distinct personalities, switching every 12 hours. This unique dual-consciousness system shapes every aspect of their society, from government to daily life.',
    explanation:
      'Each person has two personalities per body. A day equals 12 hours per personality, creating a 24-hour cycle split between two distinct personas. Holidays occur on the 13th of each month. The society is practical, clean, and highly tech-forward.',
    characteristics: {
      personalityA:
        'The first personality is active during the daylight hours (0-12). This persona tends to be more outgoing, handles business and social interactions, and manages work responsibilities.',
      personalityB:
        'The second personality takes over during the next 12-hour cycle. This persona often takes a more introspective role, focusing on personal matters, family, and completing what the first personality started.',
    },
  },

  lifeStyles: {
    title: 'Life Styles',
    intro:
      'Life on Nagolnagemluapleira is structured around the 12-hour personality shifts. Each week feels like two weeks, with two Mondays, two Tuesdays, and so on - one for each personality.',
    sections: [
      {
        id: 'daily-routine',
        title: 'Daily Routine - Men',
        content:
          'Men typically start their day with doughnuts for breakfast. They drive their V-8 cars to work where they spend six hours at their jobs. After work, they enjoy a four-course meal and read the daily paper to stay informed about both local and planetary news.',
      },
      {
        id: 'school-life',
        title: 'School Life - Children',
        content:
          "Kids wake up late and attend a five-story school building for just three hours of instruction per day. There is no homework assigned, allowing children more time for family and personal development. After school, kids help with chores around the house and watch TV. When their second personality emerges, it's described as becoming 'like a robot' - more focused and task-oriented.",
      },
      {
        id: 'family-structure',
        title: 'Women & Family',
        content:
          'Women typically serve as housewives with responsibilities for maintaining the home and caring for the family. They coordinate between both personalities to ensure the household runs smoothly despite the 12-hour shifts.',
      },
      {
        id: 'homes',
        title: 'Homes & Housing',
        content:
          "Beautiful houses are made of porcelain for those who can afford them. Families with less means live in what are called 'Tupperware houses' - more affordable but still functional dwellings. Furniture is often made from cardboard and leaves, which are abundant resources on the planet.",
      },
      {
        id: 'entertainment',
        title: 'Entertainment & Recreation',
        content:
          "The Gold Saucer is the premier shopping mall where people buy gifts and socialize. The Wark Grand Pre Racing track features races with Warks, a native animal species. Fine dining happens at the Silver Platter restaurant. Sports fans follow the Voyager basketball team, one of the planet's most popular sports franchises.",
      },
    ],
    timeline: [
      { hour: 0, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 1, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 2, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 3, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 4, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 5, personalityA: 'Sleeping', personalityB: 'Sleeping' },
      { hour: 6, personalityA: 'Wake up, breakfast with doughnuts', personalityB: 'Wake up late' },
      {
        hour: 7,
        personalityA: 'Drive V-8 cars to work',
        personalityB: 'Preparing for school at the five-story school building',
      },
      {
        hour: 8,
        personalityA: 'At work - spending six hours at their jobs',
        personalityB: 'School time - three hours of instruction',
      },
      {
        hour: 9,
        personalityA: 'At work - spending six hours at their jobs',
        personalityB: 'School time - three hours of instruction',
      },
      {
        hour: 10,
        personalityA: 'At work - spending six hours at their jobs',
        personalityB: 'After school - help with chores around the house and watch TV',
      },
      {
        hour: 11,
        personalityA:
          'After work - four-course meal and read the daily paper to stay informed about both local and planetary news',
        personalityB: 'Chores and TV time, becoming like a robot - more focused and task-oriented',
      },
      {
        hour: 12,
        personalityA: 'Personality switch - vehicles automatically turn off after 12 hours',
        personalityB: 'Personality switch - vehicles automatically turn off after 12 hours',
      },
    ],
  },

  transportation: {
    title: 'Transportation',
    intro:
      'Many inhabitants drive cars, though some use the CTDB (City Transportation Department Bus) system. All buses are kept clean and sanitary for public use.',
    sections: [
      {
        id: 'vehicles',
        title: 'Cars & Buses',
        content:
          "The upper class on Nagolnagemluapleira is comparable to America's middle class. They drive special cars with specific requirements. The CTDB buses serve those who prefer public transportation, operating on strict schedules to accommodate both personality shifts.",
      },
      {
        id: 'rules',
        title: 'Rules & Inspections',
        content:
          "Every vehicle must undergo a monthly car check. Leather seats are absolutely required - if a vehicle doesn't have proper leather seats, it is immediately put out of service until fixed. All vehicles must have an automatic turnoff system that shuts down after exactly 12 hours, preventing the other personality from being startled when they take over.",
      },
      {
        id: 'technology',
        title: 'Technology',
        content:
          'All approved vehicles must have: AM/FM radios for communication and entertainment, super speed brakes for safety, nitrogen boosters for efficient travel, and an engine that is at least V8 or better. Gold and/or silver bumpers are required as a mark of quality and social standing.',
      },
      {
        id: 'safety',
        title: 'Safety',
        content:
          'Traffic police are everywhere on Nagolnagemluapleira, ensuring all vehicles meet requirements and drivers follow the rules. Safety is paramount, especially during the personality transition times when drivers must safely park and prepare for the switch.',
      },
    ],
    requirements: [
      { id: 'req-1', item: 'Leather seats (required)', required: true },
      { id: 'req-2', item: 'Automatic 12-hour turnoff system', required: true },
      { id: 'req-3', item: 'AM/FM radio', required: true },
      { id: 'req-4', item: 'Super speed brakes', required: true },
      { id: 'req-5', item: 'Nitrogen boosters', required: true },
      { id: 'req-6', item: 'V8 engine or better', required: true },
      { id: 'req-7', item: 'Gold and/or silver bumpers', required: true },
      { id: 'req-8', item: 'Monthly inspection passed', required: true },
    ],
  },

  government: {
    title: 'Government',
    intro:
      'The Nagolnagemluapleiran government consists of four distinct branches, each with specific responsibilities. Together they form the Nagolnagemluapleiran Trecnoc Government.',
    branches: [
      {
        id: 'znerential',
        name: 'Znerential Branch',
        icon: 'scales',
        description:
          'The executive branch led by the Zner, who serves as the ruler and head of the entire planet. The Zner makes major decisions affecting all inhabitants and both personalities, ensuring the planet runs smoothly and prosperously.',
      },
      {
        id: 'notletial',
        name: 'Notletial Branch',
        icon: 'bank',
        description:
          'This branch interprets the laws of both the planet and the individual personalities. They ensure that legislation is applied fairly to both personalities sharing a body, resolving any conflicts that may arise from the dual-consciousness system.',
      },
      {
        id: 'ynnedive',
        name: 'Ynnedive Branch',
        icon: 'users',
        description:
          'The legislative branch that passes laws affecting the personalities and discusses necessary changes to the legal system. They meet regularly to address the unique challenges of governing a dual-personality society.',
      },
      {
        id: 'gnikicial',
        name: 'Gnikicial Branch',
        icon: 'gavel',
        description:
          'The justice branch that oversees all public services including police, fire departments, hospitals, and other essential services. This branch meets every two years to review and improve the safety and welfare systems of the planet.',
      },
    ],
  },

  holidays: {
    title: 'Holidays (All on the 13th)',
    intro:
      'On Nagolnagemluapleira the number 13 is very lucky therefore every holiday occurs on the thirteenth.',
    calendar: {
      specialDay: 13,
      note: 'All holidays are celebrated on the lucky 13th day',
    },
    holidays: [
      {
        id: 'sdrawkcab',
        name: 'SDRAWKCAB',
        theme: 'Hope & Wishing',
        description:
          'Celebrated on Rebmtepes 13 (September backwards), this is a holiday of hope and wishing.',
        traditions:
          'People light candles and make wishes for their first personality. The candle must burn for exactly 12 hours. If the candle burns out before the personality switch, the wishes do not come true.',
        candleRitual:
          'After 12 hours when the personality switches, the second personality lights their own candle and makes their wishes. This ritual symbolizes the hope and dreams of both personalities, each getting their chance to wish for a better future.',
      },
      {
        id: 'gnihsinotsa',
        name: 'GNIHSINOTSA',
        theme: 'Giving & Sharing',
        description:
          'Celebrated on Rebotco 13 (October backwards), this is a holiday of giving and sharing.',
        traditions:
          'People go to the Gold Saucer mall to buy presents. They carefully wrap the gift and leave it on their desk or in a special place.',
        dualCelebration:
          'When 12 hours pass and the personality switches, the second personality discovers the present left for them. They then repeat the process, buying and wrapping a gift for the first personality to find when they return. This creates a beautiful cycle of giving between the two personalities sharing one body.',
      },
    ],
  },

  anthem: {
    title: 'Planetary Anthem',
    intro:
      'The official anthem of Nagolnagemluapleira celebrates the unique dual nature of life on the planet, honoring both the complexity and prosperity of their society.',
    lines: [
      'Nagol nagem luap leira,',
      "It's where we live, and we take pride.",
      'Two personalities,',
      'Twice the formalities,',
      'Dual lives, dual realities,',
      'Complexity.',
      'Each personality',
      'Wants a society',
      'Prosperous and clean,',
      'Practical folk are we.',
      'Advanced technology,',
      'And flourishing economy',
      'Is what we have.',
    ],
  },

  quote: {
    title: 'Theme & Meaning',
    quote: 'He knows the universe, and himself he does not know.',
    author: 'Jean De La Fontaine',
    explanation:
      'This quote goes with the theme of our planet, multiple personalities, very well. It does because two personalities switch in and out with a body. One personality can know people around him, but it is impossible for him to know the other personality of his body. So he knows the universe(the people around him), and himself he does not know(the other personality).',
  },

  credits: {
    title: 'Credits',
    intro: 'This report was created by:',
    authors: ['Paul Tilton', 'Logan Renz', 'Megan King', 'Ariel Denny'],
    year: '6th Grade Project',
    class: 'World-Building Report',
    note: 'Made as a digital keepsake - an interactive museum exhibit celebrating our original planet creation',
  },
}

export const funFacts = [
  "The number 13 is considered extremely lucky on Nagolnagemluapleira - that's why all holidays happen on the 13th!",
  'Several holiday and month names are spelled backwards - can you spot them? (Hint: SDRAWKCAB, Rebmtepes, Rebotco)',
  "A 'week' on Nagolnagemluapleira feels like two weeks because each day is experienced twice by two different personalities",
  'The automatic 12-hour turnoff system in vehicles prevents startling incidents during personality switches',
  'Children attend school for only 3 hours per day and receive no homework',
  'The Gold Saucer mall is the central hub for holiday gift shopping during GNIHSINOTSA',
  'Warks are native animals featured in the popular Grand Pre Racing events',
  "The Voyager basketball team is the planet's most beloved sports franchise",
  "Houses range from beautiful porcelain structures to practical 'Tupperware houses' made for affordability",
  "The four government branches together form the 'Trecnoc' government - another backwards spelling!",
]

export const personalityMicrocopy = {
  A: {
    startTour: 'Begin the Adventure',
    nextSection: 'Onward!',
    previousSection: 'Go Back',
    learnMore: 'Discover More',
    playAnthem: 'Hear Our Song',
    randomFact: 'Fun Discovery',
  },
  B: {
    startTour: 'Start Exploring',
    nextSection: 'Continue',
    previousSection: 'Return',
    learnMore: 'Learn More',
    playAnthem: 'Play Anthem',
    randomFact: 'Random Fact',
  },
}
