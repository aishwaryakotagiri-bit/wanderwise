// Case study content. Copy is verbatim from the approved design.

export const COLORS = {
  primary: '#9F2BCF',
  success: '#2DAA3E',
  error: '#E73842',
  info: '#0078FF',
  warning: '#FEBA3B',
};

export const PROCESS = [
  { n: '01', name: 'Research', items: ['Secondary Research', 'User Interviews'] },
  { n: '02', name: 'Ideate', items: ['How Might We?', 'User Journey Map', 'UX Voice & Tone', 'Feature prioritisation'] },
  { n: '03', name: 'Design', items: ['Design System', 'Final Flows', 'Learnings'] },
];

// Sticky navigation: each section and the sub-sections a reader can jump to.
export const SECTIONS = [
  {
    id: 'research', label: 'Research',
    items: [
      { id: 'desk-research', label: 'Secondary Research' },
      { id: 'tools', label: 'Direct/Indirect Comp Analysis' },
      { id: 'interviews', label: 'User Interviews' },
      { id: 'insights', label: 'Insights' },
      { id: 'personas', label: 'Proto Personas' },
    ],
  },
  {
    id: 'ideate', label: 'Ideate',
    items: [
      { id: 'how-might-we', label: 'How Might We' },
      { id: 'journey-map', label: 'Journey Map' },
      { id: 'value-proposition', label: 'Value Proposition' },
      { id: 'voice-and-tone', label: 'Voice & Tone' },
      { id: 'feature-benefit', label: 'Feature-Benefit Analysis' },
      { id: 'prioritisation', label: 'Feature Prioritisation' },
    ],
  },
  {
    id: 'design', label: 'Design',
    items: [
      { id: 'design-system', label: 'Design System' },
      { id: 'final-flows', label: 'Final Flows' },
    ],
  },
];

export const STATS = [
  'Indians made 3.28 crore trips abroad in 2025, 6.3% more than the year before. This is expected to cross 5 crore by 2030.',
  '9 in 10 international trips from India are taken by millennials and Gen Z, and nearly two in three are solo.',
  'Indians spent $16.96 billion on travel abroad in FY25, the largest share of all the money they sent overseas.',
  '33% of Indian travellers already use AI to plan their trips, and 68% are likely to on their next one.',
  'Travellers use 10–12 apps across a single trip, and 67% wish they could see their full itinerary in one place.',
  'Japan welcomed 3,15,100 Indian visitors in 2025, 35% more than the year before.',
];

export const TOOLS = [
  {
    name: 'Social Media',
    examples: 'YouTube · Instagram · Pinterest · Tripoto',
    works: ['Real experiences', 'Real costs', 'Easy to discover'],
    breaks: ['Hard to find later', 'Generic lists', 'Can’t make bookings'],
  },
  {
    name: 'AI chat + trip planners (competitors)',
    examples: 'ChatGPT · Gemini · Mindtrip · Wanderlog · Layla · Stardrift',
    works: ['Quick itinerary', 'Routes and budget', 'Easy to tweak'],
    breaks: ['Misses constraints', 'Unchecked prices', 'No booking', 'No help during the trip'],
  },
  {
    name: 'Friends, family + locals',
    examples: 'Friends who’ve been, hosts, drivers, local operators, curators',
    works: ['Most trusted', 'Lived, local tips', 'Honest, best interest in mind'],
    breaks: ['Scattered in chats', 'Hard to reach', 'Not linked to the plan'],
  },
  {
    name: 'Booking apps',
    examples: 'MakeMyTrip · Klook · Headout',
    works: ['Lots of options', 'Easy payment', 'Refunds', 'Available across countries'],
    breaks: ['Don’t know your plan', 'Too much app switching'],
  },
  {
    name: 'On the go tools',
    examples: 'Maps · Translate · Weather',
    works: ['Work offline', 'Quick answers', 'Free'],
    breaks: ['Don’t know your plan', 'Too much app switching'],
  },
];

export const TAKEAWAYS = [
  'One trip is spread across 6–10 apps.',
  'Most help ends once the trip starts.',
  'No tool shows the impact of a change, like a late train or rain.',
  'Tips from trusted people are scattered.',
  'AI plans need checking before you can rely on them.',
  'Nothing helps first-timers feel calm and safe.',
];

export const RESEARCH_LINKS = [
  { label: 'User questionnaire', href: 'https://docs.google.com/spreadsheets/d/1XWiupBeb8xL3YanEamiZpClfkUrAXZTA/edit?gid=2140202938#gid=2140202938' },
  { label: 'De-brief notes', href: 'https://docs.google.com/spreadsheets/d/1htkUZfh6N7nNPB5P2IhS0_mPsjVoW7Fq-Ju6IID7dvU/edit?usp=drive_link' },
  { label: 'Call recordings', href: 'https://drive.google.com/drive/folders/1K25ISzG7uxsSLU484dpSJ3WVeAZVrzyv?usp=drive_link' },
];

// [bold lead, rest] pairs.
export const INSIGHTS = [
  {
    label: 'Motivations', color: COLORS.success,
    items: [
      [null, 'Freedom', ' to change plans and go with the flow.'],
      [null, 'Meeting people', ' along the way, since solo trips rarely stay solo.'],
      [null, 'Local, hidden-gem', ' experiences over touristy spots.'],
      [null, 'Stories and memories', ' to bring back and share.'],
      [null, 'Good value', ', so they can travel more often.'],
    ],
  },
  {
    label: 'Pain points', color: COLORS.error,
    items: [
      ['Feel ', 'anxious', ' before going alone to a new place.'],
      [null, 'Not knowing what to expect', ': time, transport, places vs photos.'],
      [null, 'No live help', ' when plans break, like delays or cancellations.'],
      ['Feel ', 'alone', " when they don't click with people."],
      [null, 'Tips and bookings scattered', ' across too many apps.'],
      [null, 'Visa and paperwork', ' confusion.'],
    ],
  },
  {
    label: 'Tasks', color: COLORS.info,
    items: [
      [null, 'Choosing', ': Users picked where and when to go.'],
      [null, 'Researching', ': Users gathered ideas from reels, blogs and AI.'],
      [null, 'Booking', ': Users booked flights and first stays.'],
      [null, 'Preparing', ': Users sorted visas, cards and cash.'],
      [null, 'Planning', ': Users planned each day the night before.'],
      [null, 'Asking', ': Users got tips from hosts and locals.'],
      [null, 'Adapting', ': Users handled delays and changed plans.'],
      [null, 'Sharing', ': Users shared stories during and after.'],
    ],
  },
];

export const PERSONAS = [
  {
    type: 'The first-timer', color: COLORS.primary, initial: 'A', name: 'Aditi', meta: '29 · Product Manager · Bengaluru',
    quote: '“I don\'t want to waste this trip by planning too much or too little.”',
    bio: 'Taking her first solo trip abroad, 6 days in Japan. Books online with ease but has never planned a trip alone.',
    goals: ['Feel safe and sure on her own', 'A clear plan with room to explore', 'Make every day count'],
    frustrations: ["Doesn't know what to expect", 'Plans spread across too many apps', 'Panics when plans change'],
    style: [65, 20, 50, 40],
    turnsTo: ['Instagram', 'ChatGPT', 'MakeMyTrip', 'Google Maps'],
  },
  {
    type: 'The planner', color: COLORS.info, initial: 'A', name: 'Arjun', meta: '32 · UX Designer · Bengaluru',
    quote: '“If I had this information prior, I would have stayed back that night.”',
    bio: 'Plans months ahead, day by day, with buffer days. Travels solo and in groups, and hunts for good value.',
    goals: ['Know what to expect before going', 'Get the most out of his budget', 'Leave room for surprises'],
    frustrations: ['Unsure how long things take', 'No live help when plans break', 'Visa steps and paperwork'],
    style: [85, 60, 35, 60],
    turnsTo: ['Wikivoyage', 'Tripoto', 'YouTube', 'Skyscanner', 'Atlys'],
  },
  {
    type: 'The free spirit', color: COLORS.success, initial: 'M', name: 'Meera', meta: '27 · Product Designer · Bengaluru',
    quote: '“You really don\'t need to plan.”',
    bio: 'Books the first night and figures out the rest. Goes where locals and fellow travellers point her.',
    goals: ['Find local, hidden gems', 'Meet people along the way', 'Freedom to go day by day'],
    frustrations: ['Not clicking with people', 'Stuck when things go wrong', 'Tips scattered everywhere'],
    style: [15, 75, 30, 85],
    turnsTo: ['Hostelworld', 'Instagram', 'Google Translate', 'Locals'],
  },
];

export const STYLE_AXES = [
  ['Spontaneous', 'Structured'],
  ['Anxious', 'Confident'],
  ['Saver', 'Splurger'],
  ['Solo', 'Social'],
];

export const JOURNEY_GOALS = [
  'To plan a trip that feels safe, without over-planning or under-planning.',
  'To know what to expect before and during each day.',
  'To keep everything for the trip in one place.',
  'To get help quickly when plans change.',
  'To come back feeling she made the most of it.',
];

export const PHASES = ['Dream', 'Plan', 'Book + prepare', 'Arrive', 'On the trip', 'Plans change', 'Back home'];

export const JOURNEY_ROWS = [
  {
    label: 'Goal',
    cells: ['Pick a place that feels right for a first solo trip', 'Build a plan with must-dos and free time', 'Lock in flights, stays, visa and money', 'Reach her stay safely and settle in', 'Make the most of each day', 'Rework the day without losing much', 'Relive and share the trip'],
  },
  {
    label: 'Touchpoint',
    cells: ["Instagram reels, YouTube, friends who've been", 'ChatGPT, blogs, Pinterest, Tripoto', 'MakeMyTrip, Skyscanner, visa site, forex card', 'Airport signs, Google Maps, Translate', 'Maps, train apps, Tripadvisor, hosts', 'Airline or rail app, Google, WhatsApp home', 'Instagram, WhatsApp, friends'],
  },
  {
    label: 'Action',
    cells: ['Saves reels and asks friends for ideas', 'Asks AI for an itinerary and compares sources', 'Books, applies for a visa, sorts cash and cards', 'Lands and finds her way to the hotel', 'Plans each day, gets around, eats, explores', 'Faces a delay or rain and reworks the day', 'Shares photos, stories and tips'],
  },
  {
    label: 'Pain point', tone: 'pain',
    cells: ['Ideas saved and lost across apps', 'AI plans miss what matters to her', 'Bookings and documents in many places', 'No one to turn to in the first hours', "Doesn't know what to expect or what's near", 'No live help, unclear cost of changing', 'Memories scattered across apps'],
  },
  {
    label: 'Opportunity', tone: 'opportunity',
    cells: ['Turn saved ideas into a starting point', 'Balance must-dos with free time', 'One place for bookings, documents, money', 'Calm first-day guidance', 'Right info at the right moment', 'Show options and what each changes', 'Easy to share stories and tips'],
  },
];

// y is the dot's top offset (px) inside the 150px-tall emotion lane.
export const EMOTIONS = [
  { label: 'Excited', y: 46, color: COLORS.success },
  { label: 'Overwhelmed', y: 86, color: COLORS.warning },
  { label: 'Nervous', y: 86, color: COLORS.warning },
  { label: 'Anxious', y: 108, color: COLORS.error },
  { label: 'Curious', y: 64, color: COLORS.warning },
  { label: 'Stressed', y: 106, color: COLORS.error },
  { label: 'Proud', y: 26, color: COLORS.success },
];

export const VALUE_MAP = [
  { label: 'Products & services', color: COLORS.primary, span: true, items: ['A trip plan that adapts day by day', 'Bookings, documents and money in one place', 'A guide for each day on the trip', 'Help when plans change', "Local tips from people who've been"] },
  { label: 'Gain creators', color: COLORS.success, items: ['Picks for nearby things by time, energy and weather', 'Trusted local picks, with the reason why', 'Easy to swap or skip plans', 'Trip memories saved as you go'] },
  { label: 'Pain relievers', color: COLORS.error, items: ['Shows what to expect: timings, transport, real photos', 'Live alerts and options, with what each costs', 'Everything in one place', 'Balanced days with free time', 'Calm first-day guidance'] },
];

export const CUSTOMER_PROFILE = [
  { label: 'Gains', color: COLORS.success, items: ['Feel safe and sure', 'Make the most of each day', 'Discover hidden gems', 'Freedom to change plans', 'Meet people, bring back stories'] },
  { label: 'Customer jobs', color: COLORS.primary, span: true, items: ['Plan a trip that fits her', 'Book flights, stays and visa', 'Plan each day on the go', 'Get around a new city', 'Handle delays and changes', 'Find local gems and people', 'Share the trip'] },
  { label: 'Pains', color: COLORS.error, items: ['Anxiety about going alone', 'Not knowing what to expect', 'No live help when plans break', 'Tips and bookings scattered', 'Days too empty or too rushed'] },
];

export const PRIORITISATION = [
  {
    name: 'Quick wins', tone: 'wins',
    items: [
      ['Trip view: Next, Today, Trip', COLORS.info, true],
      ['Place details page', COLORS.info, true],
      ['First-day arrival guide', COLORS.primary],
      ['Share live trip with family', COLORS.primary],
      ['Nearby picks', COLORS.success],
      ['Quick help', COLORS.primary],
      ['Language help in context', COLORS.primary],
    ],
  },
  {
    name: 'Big bets', tone: 'bets',
    items: [
      ['Change plans, with what it costs', COLORS.error],
      ['Trip map with visited places', COLORS.info],
      ['Live alerts', COLORS.error],
      ['Reviews from real travellers', COLORS.success],
    ],
  },
  { name: 'Fill-ins', items: [['Destination touches', COLORS.success]] },
  {
    name: 'Later',
    items: [
      ['Offline access', COLORS.info],
      ['Connect with travellers and local guides', COLORS.success],
      ['Audio guidance', COLORS.success],
    ],
  },
];

export const THEMES = [
  ["Know what's next", COLORS.info],
  ['When things change', COLORS.error],
  ['Feel safe', COLORS.primary],
  ['Enjoy more', COLORS.success],
];

export const BASE_COLOURS = [
  ['#9F2BCF', 'primary', 'You, route, main action'],
  ['#D39CED', 'primaryMedium', 'Route line'],
  ['#F7EDFB', 'primarySubtle', 'Selected, Aiko', true],
  ['#721194', 'primaryBold', 'Links, tags'],
  ['#1A1A1A', 'textPrimary', 'Titles, body'],
  ['#4D4D4D', 'textSecondary', 'Secondary text'],
  ['#F1F3F6', 'bgTertiary', 'Tracks, quiet buttons', true],
  ['#B4BFCB', 'outlineBold', 'Handles, borders'],
];

export const ADDED_COLOURS = [
  ['#F5F4F0', 'Map land', 'Map ground', true],
  ['#CFE3EC', 'Map water', 'Rivers'],
  ['#DDEBD3', 'Map park', 'Green areas'],
  ['#77808A', 'Map label', 'Street names'],
  ['#E5533A', 'Sticker vermilion', 'Temples'],
  ['#86AE5E', 'Sticker matcha', 'Food, rest'],
  ['#2B2B2B', 'Sticker outline', '1.8px line'],
  ['#34507A', 'Postmark navy', 'Trip-end stamps'],
];

export const TYPE_SCALE = [
  [32, 40, 500, '32/40 · Header 1 · screen titles'],
  [20, 28, 500, '20/28 · Header 3 · next stop'],
  [16, 24, 500, '16/24 · Header 4 · rows, buttons'],
  [14, 20, 400, '14/20 · Body small · notes, tabs'],
  [12, 16, 400, '12/16 · Caption · meta, tags'],
];

export const SPACING = [4, 8, 12, 16, 24, 32];
export const RADII = [[8, 'tag'], [12, 'media'], [20, 'row'], [24, 'card'], [32, 'sheet']];

export const FLOWS = [
  { href: 'prototypes/day.html', title: 'Day in progress', desc: 'Next stop, ideas nearby and what each swap changes.' },
  { href: 'prototypes/place.html', title: 'Understanding a place', desc: 'What fits you today, how to get there, and ratings from people like you.' },
  { href: 'prototypes/trip-end.html', title: 'Trip end', desc: 'One stamp per city, then share the trip.', bonus: true },
];

export const ASSUMPTIONS = [
  'Aditi is one of many travellers. We designed for her first as the most anxious user, but the interviews showed most travellers need the same core help. The product is meant to serve that broader base.',
  'The research is small and close to home. All three interviews were with friends, so findings may be skewed and lack a full user profile breakdown. They point in a direction rather than prove it.',
  'Some features are assumptions to test. Offline access, live alerts and traveller reviews need validating, and some rely on data partners. I also assumed apps like maps and translation can plug into this app, so travellers stay in one place.',
];

export const LEARNINGS = [
  'Planning doesn’t stop when the trip starts. The biggest gaps showed up during the trip, which shifted my focus to the day in progress.',
  'Stories say more than answers. A delayed train or a dry waterfall told me more about real needs than any direct question.',
];
