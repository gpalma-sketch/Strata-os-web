import type { Content } from './types';

/**
 * English translation. Structurally identical to `es` — the `Content` type
 * guarantees no string can go missing, which is what the prototype's runtime
 * dictionary could not do.
 *
 * This is a presentation-facing locale, not a courtesy translation: the copy
 * is written as English, not transliterated from the Spanish, and the two
 * carry the same launch status (STRATA OS on a waitlist, STRATA Lab live).
 */
export const en: Content = {
  meta: {
    title: 'STRATA — The autonomous operating system for your business',
    description:
      'AI agents that run your business 24/7 and a single panel to govern them from. STRATA OS launches soon — join the list. Custom solutions available today with STRATA Lab.',
    ogAlt: 'STRATA — applied AI company',
  },

  nav: {
    links: [
      { href: '#modelo', label: 'The OS' },
      { href: '#agentes', label: 'Agents' },
      { href: '#lanzamiento', label: 'Launch' },
      { href: '#casos', label: 'Use cases' },
      { href: '#precios', label: 'Pricing' },
      { href: '#lab', label: 'STRATA Lab' },
      { href: '#partners', label: 'Partners' },
      { href: '#equipo', label: 'Team' },
    ],
    cta: "Let's talk →",
    skipToContent: 'Skip to content',
    menuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
  },

  hero: {
    kicker: 'The autonomous operating system for your business',
    title: ['The AI that runs', 'your business.'],
    leadTop: 'Technology executes. People decide.',
    leadPrefix: 'We turn AI into',
    rotor: ['efficiency.', 'product.', 'advantage.'],
    ctaPrimary: 'Join the launch list →',
    ctaSecondary: 'See STRATA Lab',
    statusChip: 'STRATA OS · launching soon · list open',
    devicesKicker: 'One system · every device',
    devicesTitle: 'Your business, in your pocket and on your desk.',
    windowTitle: 'STRATA Business OS — NORDA',
    sectors: [
      'Distribution & logistics',
      'Private clinics',
      'Construction',
      'Car dealerships',
      'Independent hotels',
      'Vocational training',
    ],
  },

  stats: [
    { value: '3–6', unit: 'months', caption: ['target payback', 'on the investment'] },
    { value: '+200–300', unit: 'h', caption: ['hours a month', 'we aim to free up'], gold: true },
    { value: '~80', unit: '%', caption: ['of repetitive work', 'run by the machine'] },
    { value: '24/7', caption: ['your business running', 'without a break'] },
  ],

  waitlist: {
    kicker: 'Coming soon',
    title: ['STRATA OS is almost here. ', 'Join the launch list.'],
    lead: 'We are finishing the product with a small group of companies. Leave your email and you will be among the first in when we open — no commitment, no card.',
    reasons: [
      { value: 'Early', caption: ['access: you get in before', 'the rest of the market'] },
      { value: 'Launch', caption: ['pricing, locked in', 'for you'], gold: true },
      { value: '€0', caption: ['joining costs nothing', 'and commits you to nothing'] },
    ],
    ticker: [
      ['Marketing', 'creates content and nurtures leads'],
      ['Sales', 'qualifies leads and prepares quotes'],
      ['Support', 'resolves queries and orders 24/7'],
      ['Legal', 'drafts contracts and tracks renewals'],
      ['Finance', 'reconciles payments and projects cash flow'],
      ['Product & Dev', 'prioritises the roadmap and closes issues'],
      ['People', 'runs onboarding, absence and shifts'],
      ['Ops', 'coordinates routes, orders and job reports'],
      ['Leadership', 'consolidates the cockpit for the business'],
      ['Business OS', 'one panel to govern it all'],
      ['Human oversight', 'you approve every critical action'],
    ],
    form: {
      label: 'Your email',
      placeholder: 'name@yourcompany.com',
      submit: 'Add me to the list →',
      sending: 'Sending…',
      success: "You're on the list. We'll be in touch the moment we open access.",
      error: "We couldn't add you. Write to us at",
      consent:
        'We will only email you about the STRATA OS launch. No spam, nothing shared with third parties, unsubscribe whenever you like.',
      fallbackCta: 'Join the launch list →',
    },
  },

  pillars: {
    kicker: 'Two ways to work with STRATA',
    title: ['An operating system ready to use — or something ', 'built just for you.'],
    items: [
      {
        tag: 'Product · self-serve',
        name: 'STRATA OS',
        summary:
          "Your business's autonomous operating system. You hire AI agents that work 24/7 in every department and govern them from a single panel.",
        bullets: [
          'Whole departments operating from day one',
          'Connects with the tools you already use',
          'Start with one area and add the rest when it makes sense',
          'In development — join the list for the first intake',
        ],
        ctaLabel: 'Join the launch list →',
        ctaHref: '#lanzamiento',
        price: 'coming soon · from €1,490/mo',
      },
      {
        tag: 'Services · custom',
        name: 'STRATA Lab',
        summary:
          'When you need something unique: we design, build and operate custom AI solutions for your business, from sale to close.',
        bullets: [
          'Diagnosis of your whole operation with ROI',
          'Agents and systems built for your case',
          'Diagnosis → implementation → maintenance',
          'Available today: we start whenever you like',
        ],
        ctaLabel: 'See STRATA Lab →',
        ctaHref: '#lab',
        price: 'available today · custom project',
      },
    ],
  },

  why: {
    kicker: 'Why STRATA',
    title: ['AI that pays for itself — ', 'usually in 3 to 6 months.'],
    lead: "We don't sell technology: we sell hours recovered, margin that doesn't slip away and decisions with the data in front of you. This is what changes in your business.",
    bento: {
      team: {
        title: 'One agent, or a whole team.',
        body: 'A general agent runs the day-to-day. You add specialists in sales, operations or finance — each with its own expertise and memory.',
        channel: '#product-launch',
        agentCount: '4 agents',
        rows: [
          { initial: 'S', name: 'Sales Agent', detail: '3 leads qualified today · visit booked' },
          { initial: 'O', name: 'Operations Agent', detail: 'Order #4811 en route · on time' },
          { initial: 'F', name: 'Finance Agent', detail: '12 invoices reconciled · margin 18.4%' },
        ],
      },
      integrations: {
        title: 'Connect once. Automate everything.',
        body: 'CRM, email, WhatsApp, ERP, bank and 50+ tools — one-click connection. No integration projects or developers.',
        more: '+50',
      },
      data: {
        title: 'Your data. Your control.',
        body: 'Supervised execution: you approve every critical action. Data sovereignty with European residency and per-client isolation.',
      },
      platform: {
        title: 'One platform. Sales, operations and finance.',
        body: "All under one panel: pick the agent, switch it on and forget it. Each area's impact, always in sight.",
        tiles: [
          { label: 'Sales', value: '1,284', pct: 82 },
          { label: 'Hours saved', value: '312 h', pct: 64 },
          { label: 'Savings/mo', value: '€14.2k', pct: 71 },
        ],
      },
    },
    outcomesKicker: 'What you feel on the bottom line',
    outcomesTitle: 'The results we go after in your business — and measure with you.',
    outcomes: [
      {
        icon: 'users',
        value: '−20–30',
        suffix: '%',
        title: 'Lower staff costs',
        detail: 'AI absorbs repetitive work; you grow without scaling headcount at the same pace.',
      },
      {
        icon: 'calendar-check',
        value: '0',
        suffix: 'stoppages',
        title: 'No absences or bottlenecks',
        detail: "Agents don't get sick or take holidays: operations never stop.",
      },
      {
        icon: 'message',
        value: '+30–40',
        suffix: '%',
        title: 'More meetings booked',
        detail: 'No lead goes cold: instant, constant follow-up until the meeting is booked.',
      },
      {
        icon: 'trend',
        value: 'up to ×2',
        title: 'Higher website conversion',
        detail: 'Instant 24/7 replies: the visitor who asks at midnight converts too.',
      },
      {
        icon: 'headset',
        value: '<1',
        suffix: 'min',
        title: 'Better customer service',
        detail: 'Answers in seconds, no queues — more satisfaction, repeat business and referrals.',
      },
      {
        icon: 'euro',
        value: '−80–90',
        suffix: '%',
        title: 'Fewer finance errors',
        detail: 'Automatic reconciliation and invoicing: no more mismatches or forgotten payments.',
      },
      {
        icon: 'wallet',
        value: '+10–18',
        suffix: '%',
        title: 'More margin and cost control',
        detail: "You see each project's deviation in real time and fix it before it eats your profit.",
      },
      {
        icon: 'clock',
        value: '+200–300',
        suffix: 'h',
        title: 'Hours recovered per month',
        detail: 'Your team drops mechanical tasks and spends time on what truly grows the business.',
      },
    ],
    outcomesNote:
      'Indicative ranges for the impact we target in a STRATA implementation, not measured client results. The diagnosis estimates the specific range for your business — and how we will measure it — before you commit to anything.',
    ctaLabel: 'Diagnosis in 3 weeks →',
    ctaNote: 'We tell you where AI creates value in your business — with estimated ROI, before you commit to anything.',
  },

  agents: {
    kicker: 'Your departments, running themselves',
    title: ["We don't sell software. We sell the ", 'outcome, already done.'],
    lead: 'Service-as-a-software: you do not hire a lone agent, you hire a whole department. Inside each one a team of specialised agents splits the work of that area and delivers the full service. Sales sells, support supports, finance collects. You pay for finished work — that\'s the business.',
    items: [
      {
        icon: 'send',
        name: 'Marketing',
        status: 'Department',
        description:
          'The demand service: creates content, nurtures leads and publishes across your channels in your brand voice.',
        tags: ['Social', 'Email', 'CMS'],
      },
      {
        icon: 'chart',
        name: 'Sales',
        status: 'Department',
        description:
          'The service of selling: qualifies leads, prepares quotes and follows up all the way to close.',
        tags: ['CRM', 'Email', 'WhatsApp'],
      },
      {
        icon: 'headset',
        name: 'Support',
        status: 'Department',
        description:
          'The support service: answers queries, handles orders and resolves issues 24/7. Only the exceptional reaches a person.',
        tags: ['Chat', 'Email', 'Tickets'],
      },
      {
        icon: 'shield',
        name: 'Legal',
        status: 'Department',
        description:
          'Day-to-day legal: drafts and reviews contracts, tracks renewal dates and keeps processes compliant.',
        tags: ['Contracts', 'E-sign', 'Renewals'],
      },
      {
        icon: 'euro',
        name: 'Finance',
        status: 'Department',
        description:
          'The finance service: invoices, reconciles payments and projects cash flow. Real margin, always in sight.',
        tags: ['Accounting', 'Bank', 'Excel'],
      },
      {
        icon: 'bolt',
        name: 'Product & Dev',
        status: 'Department',
        description:
          'The technical service: collects requests, prioritises the roadmap and chases issues until they are closed.',
        tags: ['Roadmap', 'Repos', 'Issues'],
      },
      {
        icon: 'people',
        name: 'People',
        status: 'Department',
        description:
          'The people service: runs each new joiner through onboarding and keeps absence, shifts and paperwork in order.',
        tags: ['Onboarding', 'Absence', 'Shifts'],
      },
      {
        icon: 'layers',
        name: 'Ops',
        status: 'Department',
        description:
          'The operations service: coordinates orders, routes and job reports; spots bottlenecks and flags them before they bite.',
        tags: ['ERP', 'Calendar', 'Routing'],
      },
      {
        icon: 'node',
        name: 'Leadership',
        status: 'Department',
        description:
          'The governance layer: consolidates what every area is doing into one cockpit and puts the decisions waiting on you front and centre.',
        tags: ['KPIs', 'Reports', 'Approvals'],
      },
    ],
    feedTitle: 'Example of a single day of activity',
    feedLive: '● Demo',
    feedDone: 'Done',
    /*
     * Each line is labelled "Department · agent", because a department is not
     * one moving part: whoever builds quotes is not whoever qualifies leads.
     * That is what makes the area, rather than the individual agent, the unit
     * you buy.
     */
    feedLines: [
      { agent: 'Sales · Quoting', text: 'Quote #2041 sent to client' },
      { agent: 'Support · Orders', text: 'Order ticket resolved in 40s' },
      { agent: 'Finance · Reconciliation', text: '12 invoices reconciled' },
      { agent: 'Ops · Routing', text: 'Delivery route optimized' },
      { agent: 'Marketing · Content', text: '3 posts published to social' },
      { agent: 'Legal · Contracts', text: 'Contract generated, sent to sign' },
      { agent: 'Sales · Qualification', text: 'Lead qualified, visit booked' },
      { agent: 'People · Onboarding', text: 'New joiner fully onboarded' },
      { agent: 'Product & Dev · Issues', text: 'Issue #318 closed and shipped' },
      { agent: 'Support · Queries', text: 'FAQ answered and case closed' },
      { agent: 'Ops · Stock', text: 'Stock alert sent to owner' },
      { agent: 'Leadership · Decisions', text: '2 approvals waiting on you' },
    ],
    ctaLabel: 'See launch pricing →',
    ctaNote: 'These departments are part of STRATA OS, which opens soon. Need a custom agent today? We build it at ',
    ctaNoteLink: 'STRATA Lab',
    ctaNoteAfter: '.',
  },

  product: {
    kicker: 'The product',
    title: ['A dashboard the owner opens ', 'every morning.'],
    lead: 'The Business OS is the panel every bit of company AI is governed from. At its centre sits Jarvis, the core you ask by voice or by text; around it, the views where you see what is happening and decide.',
    vistas: [
      {
        n: '01',
        title: 'Getting started',
        summary: 'The ramp-up: you connect your tools, load your company knowledge and get the first departments operating.',
      },
      {
        n: '02',
        title: 'My day',
        summary: 'What is on you today and nothing else: what happened since yesterday and what is in front of you now.',
      },
      {
        n: '03',
        title: 'Inbox',
        summary: 'What is waiting on your decision. Routine work never shows up here; only what needs someone to say yes.',
      },
      {
        n: '04',
        title: 'Overview',
        summary: 'The business cockpit: targets, revenue, active agents and — if you run several companies — all of them at a glance.',
      },
      {
        n: '05',
        title: 'Live',
        summary: 'What is happening right now, as it happens.',
      },
      {
        n: '06',
        title: 'Work',
        summary: 'Work in progress, by department and with its status.',
      },
      {
        n: '07',
        title: 'Agent chat',
        summary: 'You talk to the agents directly, without opening a different tool for every task.',
      },
      {
        n: '08',
        title: 'Hire your team',
        summary: 'You bring an agent on as you would hire someone: pick the role and it starts working.',
      },
      {
        n: '09',
        title: 'Evolution loop',
        summary: 'The system reviews how it is doing and proposes its own improvements, for you to approve or drop.',
      },
    ],
  },
  how: {
    kicker: 'How it works',
    title: ['Jarvis decides. ', 'The agents execute.'],
    columns: [
      [
        { title: 'The company', summary: 'emails · calls · leads · orders' },
        { title: 'The owner', summary: 'voice or text · “ask the system”' },
      ],
      [{ title: 'Jarvis · the core', summary: 'classifies intent · picks department, agent and model', hot: true }],
      [
        { title: 'Marketing · Sales · Support', summary: 'content · leads · tickets' },
        { title: 'Ops · Finance · Legal', summary: 'orders · collections · contracts' },
        { title: 'People · Product & Dev · Leadership', summary: 'team · roadmap · decisions' },
      ],
      [
        { title: 'Private memory', summary: "the company's data · theirs only" },
        { title: 'Business OS', summary: 'the owner governs it from the panel', hot: true },
      ],
    ],
    closing: "This isn't a marketing diagram: this system already runs ",
    closingStrong: 'our own business',
    closingAfter: ", 24/7, with our own departments running inside it. We're the first customer of our product.",
  },

  useCases: {
    kicker: 'Use cases',
    title: ['Built for every ', 'challenge in your business.'],
    youLabel: 'YOU',
    aiLabel: 'AI',
    items: [
      {
        tab: 'Sell more',
        title: 'Close more, chasing less',
        description:
          'The agent qualifies every lead, prepares the quote and follows up until close. Your team only steps in to close.',
        you: 'a lead comes in',
        ai: 'qualifies · quotes · follows up',
        caption: 'Sales Agent · demo',
        rows: [
          { title: 'Lead €120k qualified', sub: 'source: web · high intent', state: 'done', icon: 'check' },
          { title: 'Quote #2041 sent', sub: 'template + live prices', state: 'done', icon: 'check' },
          { title: 'Follow-up scheduled', sub: 'reminder in 3 days', state: 'active', icon: 'plus' },
        ],
      },
      {
        tab: 'Support 24/7',
        title: 'Support that never sleeps',
        description:
          'Answers questions, handles orders and resolves issues 24/7. Only the exceptional reaches a person.',
        you: 'a query arrives',
        ai: 'answers · handles · escalates only the odd case',
        caption: 'Support Agent · demo',
        rows: [
          { title: 'Query resolved in 40s', sub: 'order #4811 · shipped', state: 'done', icon: 'check' },
          { title: 'Return handled', sub: 'policy applied on its own', state: 'done', icon: 'check' },
          { title: 'Case escalated to human', sub: 'special payment terms', state: 'review', icon: 'plus' },
        ],
      },
      {
        tab: 'Run operations',
        title: 'Operations with no bottlenecks',
        description:
          'Coordinates orders, routes and job reports; spots bottlenecks and warns before they become a problem.',
        you: 'an order comes in',
        ai: 'plans · coordinates · alerts',
        caption: 'Operations Agent · demo',
        rows: [
          { title: 'Delivery route optimized', sub: '3 stops · -22% km', state: 'done', icon: 'check' },
          { title: 'Job report updated', sub: 'phase 4 · assembly', state: 'done', icon: 'check' },
          { title: 'Stock alert sent', sub: 'restock before Friday', state: 'notice', icon: 'plus' },
        ],
      },
      {
        tab: 'Control finances',
        title: 'Finances always up to date',
        description:
          "Invoices, reconciles payments and projects cash flow. Every project's real margin, always in sight.",
        you: 'an invoice arrives',
        ai: 'reconciles · projects · flags',
        caption: 'Finance Agent · demo',
        rows: [
          { title: '12 invoices reconciled', sub: 'auto-matched with bank', state: 'done', icon: 'check' },
          { title: 'Cash flow projected 60d', sub: '€1.24M forecast', state: 'done', icon: 'check' },
          { title: 'Pending payment flagged', sub: 'phase 2 · +12 days', state: 'notice', icon: 'plus' },
        ],
      },
      {
        tab: 'Grow marketing',
        title: 'Marketing on autopilot',
        description:
          'Creates content, nurtures leads and posts to your channels in your brand voice. You post once, the agent does the rest.',
        you: 'you post once',
        ai: 'schedules · engagement · analytics',
        caption: 'Marketing Agent · demo',
        rows: [
          { title: '3 posts published', sub: 'LinkedIn · Instagram · X', state: 'done', icon: 'check' },
          { title: 'Leads nurtured', sub: '4-email sequence', state: 'done', icon: 'check' },
          { title: 'Results report', sub: "this week's CTR", state: 'active', icon: 'plus' },
        ],
      },
    ],
  },

  pricing: {
    kicker: 'Pricing · STRATA OS',
    title: ['You hire departments, ', 'not licenses.'],
    lead: 'The unit is not the individual agent — it is the department. Each one is a team of specialised agents that delivers its area end to end. The Business OS comes included: it is where your digital workforce works, not an extra to be billed on the side.',
    comingSoonLabel: 'Coming soon',
    availabilityNote:
      'STRATA OS is not on sale yet: these are the launch rates and they cannot be purchased today. Join the list and we will let you know the moment we open — everyone on it comes in at this price. If you need something custom right now, STRATA Lab is available today.',
    setupLabel: 'Deployment · one-off',
    tiers: [
      {
        name: 'One department',
        setup: 'from €9,500',
        price: '€1,490',
        period: '/mo',
        meta: 'Your most painful area, running end to end',
        features: [
          'One department of your choice, from the nine available',
          'Every agent in that department, not a single one',
          'Business OS included: panel, oversight and an audit trail of every action',
          'Integration with the tools you already run',
          'Email support and a monthly results review',
        ],
        comingSoon: true,
        ctaLabel: 'Join the launch list',
        ctaHref: '#lanzamiento',
      },
      {
        name: 'Three departments',
        setup: 'from €18,000',
        price: '€2,900',
        period: '/mo',
        meta: 'Areas coordinate with each other and the system starts compounding',
        badge: 'Most popular',
        highlight: true,
        features: [
          'Three departments of your choice, with all their agents',
          'Work chains across areas: sales hands off to operations, operations to finance, with nobody retyping anything',
          'Business OS included, with reporting on the value generated',
          'Custom integrations on top of your ERP and CRM',
          'Priority support and continuous tuning of the system',
        ],
        comingSoon: true,
        ctaLabel: 'Join the launch list →',
        ctaHref: '#lanzamiento',
      },
      {
        name: 'Whole company',
        setup: 'scoped per project',
        price: 'Custom',
        meta: 'All nine departments, plus what only exists in your company',
        features: [
          'All nine departments operating in coordination',
          'Custom agents built for your unique processes, in STRATA Lab',
          'Dedicated VPC · EU data residency · SLA',
          'Diagnosis → implementation → ongoing operation',
          'A named STRATA lead assigned to your account',
          'Available today: the price is set after the diagnosis, not before',
        ],
        ctaLabel: 'See STRATA Lab →',
        ctaHref: '#lab',
      },
    ],
    billingKicker: "How it's billed",
    billingNote:
      'Deployment is a one-off: connecting your systems, loading your company knowledge and getting the agents genuinely working. The monthly fee covers keeping them running, the oversight and the improvements. Adding a department later carries its own deployment and adjusts the fee. No lock-in once deployed. Prices exclude VAT and may be adjusted before launch.',
  },

  method: {
    kicker: 'The method',
    title: ["We don't install a tool. We build a system, ", 'level by level.'],
    lead: 'Every company is at a different point. We take you up the ladder without skipping steps — and only build custom what truly gives you an edge. What the market already does better, we integrate.',
    rungs: [
      {
        n: '01',
        name: 'Fundamentals',
        who: 'Your whole team',
        detail: 'Your people using AI with judgment day to day. The highest-return step almost everyone skips.',
        filled: 1,
      },
      {
        n: '02',
        name: 'Projects & Skills',
        who: 'Internal champions',
        detail: "Your company's knowledge —tone, catalog, processes— captured once and reusable.",
        filled: 2,
      },
      {
        n: '03',
        name: 'Integrate',
        who: 'Your lead + STRATA',
        detail: 'We connect the best tools that already exist and leave them running inside the business.',
        filled: 3,
      },
      {
        n: '04',
        name: 'Own agents',
        who: 'STRATA · custom',
        detail: 'We build agents that run entire processes — only where they give real advantage.',
        filled: 4,
      },
    ],
    capstoneTitle: 'The destination: your Business OS',
    capstoneBody:
      "The four levels don't stay loose: they converge into a single panel — your business's brain, from which you see and govern all the company's AI.",
  },

  lab: {
    kicker: 'STRATA Lab · custom solutions',
    title: ['Need something unique? ', 'We build it with you.'],
    lead: "When the standard OS isn't enough, STRATA Lab designs, builds and operates custom AI for your business — with a three-step model and per-project pricing.",
    steps: [
      {
        n: '1',
        title: 'Diagnosis',
        price: 'from €9,500',
        body: 'In 3 weeks we map your operation and tell you where AI creates value, with estimated ROI per initiative. One-off — and credited if we continue.',
        gives: '→ defines your starting point',
      },
      {
        n: '2',
        title: 'Implementation',
        body: 'We build and integrate your system and train your team. You pick one of three options depending on how far up the ladder you want to go.',
        gives: '→ one of 3 options · one-off',
      },
      {
        n: '3',
        title: 'Maintenance',
        body: 'Fixed monthly fee: we keep the system alive, operate it and fine-tune it with you. Scales with the level you use — no surprises.',
        gives: '→ monthly operations',
      },
    ],
    dealKicker: 'The deal',
    dealBody: 'The diagnosis decides your level — and the level sets the investment. The target we set with you is to recover it in ',
    dealHighlight: '3–6 months',
    dealAfter: '.',
  },

  reviews: {
    kicker: 'Reviews',
    title: ['What those already ', 'running on STRATA say.'],
  },

  gallery: [
    {
      image: 'gfx-network.png',
      alt: "Diagram of STRATA's agent network connected to a central router",
      label: 'The system',
      caption: 'eight agents, one router',
    },
    {
      image: 'gfx-panel.png',
      alt: 'View of the Business OS panel with real-time metrics',
      label: 'The panel',
      caption: 'your business in real time',
    },
    {
      image: 'gfx-growth.png',
      alt: 'Chart showing margin growth over time',
      label: 'The result',
      caption: 'margin that grows',
    },
  ],

  team: {
    kicker: 'The people',
    title: ['Three partners. Zero employees. ', 'By design.'],
    lead: "The partners decide and show their face. Our own agents run the operation — we're the product's first success case.",
    members: [
      {
        photo: 'founder-gonzalo.jpg',
        name: 'Gonzalo',
        role: 'Co-CEO · CPO · CEO of OFFTV',
        bio: 'CEO of OFFTV. Product, marketing and growth; leads delivery and the orchestration of the Business OS.',
      },
      {
        photo: 'founder-borja.jpg',
        name: 'Borja',
        role: 'Co-CEO · CRO',
        bio: 'Revenue, GTM and operations between Spain and Silicon Valley. Legal background as a lawyer; network of funds and advisors.',
      },
      {
        photo: 'founder-lucia.jpg',
        name: 'Lucía',
        role: 'CTO · Ex-Sharpei AI · Forbes 30U30',
        bio: 'Ex-CTO of Sharpei AI. Architecture of the AI Brain and Business OS: agents, infrastructure and AI.',
      },
    ],
  },

  partners: {
    kicker: 'Partners',
    title: ['We grow with those who already have ', "companies' trust."],
    lead: "We don't sell alone. We work with those who already advise the companies in our profile — with a clear referral model, always under the STRATA brand.",
    types: [
      {
        icon: 'bank',
        title: 'Funds & family offices',
        detail: 'We install AI in their portfolio companies and raise their value. Referral for each client closed.',
      },
      {
        icon: 'shield',
        title: 'Advisors & firms',
        detail: 'Tax advisors, lawyers and consultancies who want to offer AI without building it. Fee per client.',
      },
      {
        icon: 'people',
        title: 'Industry associations',
        detail: 'We bring training and diagnoses to their members — a channel of qualified leads by sector.',
      },
      {
        icon: 'node',
        title: 'Integrators & agencies',
        detail: 'Already helping companies go digital? Add our system to your offer and grow with us.',
      },
    ],
    logosKicker: 'They work with us',
    cta: 'Become a partner →',
  },

  faq: {
    kicker: 'FAQ',
    title: ['What we usually ', 'get asked.'],
    items: [
      {
        q: 'Can I buy STRATA OS today?',
        a: 'Not yet. We are finishing it with a small group of companies and opening in phases: join the launch list and you will be in the first intake, at the founding rate. What you can buy today is STRATA Lab, our custom-project side, starting with the diagnosis.',
      },
      {
        q: 'How is this different from a normal AI chat?',
        a: 'A chat answers; our agents execute. They connect to your tools, do the work end to end and only ask for your approval on what matters.',
      },
      {
        q: 'Do I need a technical team to use it?',
        a: 'No. We install it, integrate it with what you already use and operate it. You govern everything from a single panel, without touching code.',
      },
      {
        q: 'How will STRATA OS be billed?',
        a: 'By department, not by individual agent and not per user. Each department carries a one-off deployment — from €9,500, which is connecting your systems and getting the agents working — plus a monthly fee from €1,490 covering operation, oversight and improvements. The Business OS is included. No lock-in once deployed. These are launch rates and may be adjusted before that date.',
      },
      {
        q: 'What if I need something custom now, without waiting for the OS?',
        a: "That's where STRATA Lab comes in, and it is available today: we design and build agents and systems for your case, with a diagnosis → implementation → maintenance model and per-project pricing. We start with the diagnosis, in 3 weeks.",
      },
      {
        q: 'What about the security of my data?',
        a: 'Your data is yours. Inference with European residency, per-client isolation and a human in the loop at every sensitive point — the agent proposes, a person approves and everything is logged.',
      },
    ],
  },

  contact: {
    kicker: 'STRATA Lab · available today',
    title: ['Got a company', 'to scale with AI?'],
    lead: 'No need to wait for the OS launch: in 3 weeks we tell you where AI creates value in your business, with estimated ROI per initiative.',
    ctaPrimary: 'Book your diagnosis →',
    ctaSecondary: 'Looking for the OS? Join the list',
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      message: 'Tell us about your case',
      messagePlaceholder: 'Which part of your operation is costing you the most time or margin?',
      submit: 'Book your diagnosis →',
      sending: 'Sending…',
      success: "Got it. We'll be in touch within 24 working hours.",
      error: "We couldn't send it. Write to us directly at",
      consent:
        'By submitting you agree that we process your details in order to reply. We do not share them with third parties or add you to any list.',
      required: 'required',
    },
  },

  footer: {
    tagline: 'Applied AI company',
  },

  chat: {
    fabLabel: 'Open assistance chat',
    name: 'STRATA Assistant',
    status: 'Guided answers',
    greeting:
      "Hi! I'm STRATA's guided assistant — I answer the questions below. For anything else we'll put you in touch with the team.",
    placeholder: 'Type your question…',
    send: 'Send',
    close: 'Close',
    quicks: ['What do you do?', 'When does the OS launch?', 'Pricing', 'Book a diagnosis'],
    answers: {
      launch:
        'STRATA OS is in development and we are opening in phases. There is no public date yet: join the launch list and you will be among the first in, at the founding rate. In the meantime, STRATA Lab is available today.',
      what: 'Two things. STRATA OS is the product — agents per department and a panel you govern them from — and it launches soon: you can join the list. STRATA Lab is our custom side, and that one is available today.',
      price:
        'STRATA OS is not on sale yet. It is bought by department: deployment from €9,500 (one-off) and a fee from €1,490/mo, with the Business OS included. Everyone on the list comes in at the launch rate. What you can buy today is STRATA Lab: it starts with a diagnosis from €9,500 (credited if we continue), and implementation plus the monthly fee depend on the level you choose.',
      diagnosis:
        'In 3 weeks we map your operation and tell you where AI creates value, with estimated ROI. This is the side that is already available: fill in the contact form and we get started.',
      trust:
        "We run our own business on this system 24/7 — we're our first success case. And we stay inside until your team uses it and it delivers.",
    },
    fallback: "That one's beyond me: I'm a guided assistant, not an open AI. Write to us and a person will reply:",
  },
};
