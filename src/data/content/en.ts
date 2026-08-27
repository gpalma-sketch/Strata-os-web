import type { Content } from './types';
import { rutaHref } from '../rutas';

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
    // Las entradas del menú están en `src/data/rutas.ts` (etiqueta + slug de
    // cada idioma juntos). Aquí quedan sólo los textos que no son un destino.
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
        price: 'coming soon · from {{cuota_desde}}',
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
    title: ['AI that pays for itself. ', 'And you see it in the bank.'],
    lead: "We don't sell technology: we sell hours recovered, margin that doesn't slip away and decisions with the data in front of you. This is what changes in your business.",
    bento: {
      team: {
        title: 'One agent, or a whole team.',
        body: 'A general agent runs the day-to-day. You add specialists in sales, operations or finance — each with its own expertise and memory.',
        channel: '#product-launch',
        agentCount: '4 agents',
        rows: [
          { initial: 'S', name: 'Sales Agent', detail: '3 leads qualified today · visit booked' },
          { initial: 'O', name: 'Ops Agent', detail: 'Order #4811 en route · on time' },
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
    shotsLabel: 'The Business OS, screen by screen',
    shots: [
      {
        image: 'os-dia-en.png',
        alt: 'The Business OS "start here" panel, with six proposed actions: close the books, chase payments, find leads, publish to social, compare quotes and watch competitors',
        title: 'What it offers the moment you open it',
        caption: 'Close the month, chase the outstanding invoices, find 50 leads that match your ideal customer. One click and your team gets on it.',
      },
      {
        image: 'os-equipo-en.png',
        alt: 'The Business OS "hire your team" screen, showing the Marketing agent cards and a headcount of 132',
        title: 'You hire agents the way you hire people',
        caption: 'Each with a role, what it delivers, the accounts it needs and what not to ask it for. Hire the ones you need, let the rest go.',
      },
      {
        image: 'os-depto-en.png',
        alt: 'The Marketing & Growth department map in the Business OS, showing fifteen functions — calendar, messages, content factory, social, brand, web, SEO, email, paid, conversion, launches, creators, PR, retail and analytics — with the work pending in each',
        title: 'And inside, a whole department',
        caption: 'Marketing & Growth is not "a marketing agent": it is fifteen functions with their own work in progress, from the content factory to SEO and conversion.',
      },
      {
        image: 'os-aprobar-en.png',
        alt: 'The approval queue by department in the Business OS, with Marketing, Sales and Finance awaiting review',
        title: 'And nothing ships without your approval',
        caption: 'The agents work and leave what is finished in their department queue. You review, approve or discard — and only then does it go out.',
      },
    ],
  },
  how: {
    kicker: 'How it works',
    title: ['Jarvis decides. ', 'The agents execute. You approve.'],
    columns: [
      [
        { title: 'The business', summary: 'emails · calls · leads · orders' },
        { title: 'The owner', summary: 'voice or text · “ask the system”' },
      ],
      [{ title: 'Jarvis · the core', summary: 'classifies intent · picks department, agent and model', hot: true }],
      [
        { title: 'Department heads', summary: 'a C-level per area: prioritises and reviews its own', hot: true },
        { title: 'Marketing · Sales · Support', summary: 'content · leads · tickets' },
        { title: 'Ops · Finance · Legal', summary: 'orders · payments · contracts' },
        { title: 'People · Product & Dev · Leadership', summary: 'team · roadmap · decisions' },
      ],
      [
        { title: 'Auditor agent', summary: 'checks the work before it reaches you' },
        { title: 'Your approval', summary: 'anything critical waits for your sign-off', hot: true },
        { title: 'Evolution loop', summary: 'measures what went wrong and proposes the fix' },
        { title: 'Private memory', summary: "the company's data · theirs alone" },
      ],
    ],
    closing: 'This is not a marketing diagram: the system already runs ',
    closingStrong: 'our own business',
    closingAfter: ", 24/7, with our own departments operating inside it. We are our product's first client.",
  },

  engine: {
    kicker: 'The engine',
    title: ['We do not depend on one model. ', 'We use whichever wins the task.'],
    lead: 'No single model is good at everything. The one that reasons best is not the one that searches your documentation best, nor the cheapest for sorting a thousand emails. For each task we pick whichever available model gives the best result at the right cost — and that choice changes without touching your agents.',
    layers: [
      {
        icon: 'bolt',
        job: 'Reasoning and writing',
        who: 'Claude · Anthropic',
        detail: 'The engine behind Jarvis and the agents: it understands what you asked, decides which department handles it and writes the result.',
      },
      {
        icon: 'layers',
        job: 'Semantic memory',
        who: 'Embeddings · OpenAI',
        detail: 'The brain that searches inside your company knowledge. It finds the contract, the price or the conversation even when you cannot remember what it was called.',
      },
      {
        icon: 'headset',
        job: 'Voice',
        who: 'ElevenLabs',
        detail: 'Jarvis listens and answers out loud. Ask it things while driving and get the day summarised without looking at a screen.',
      },
      {
        icon: 'doc',
        job: 'Image and document',
        who: 'Multimodal',
        detail: 'Attach a photo of a delivery note, a screenshot or a PDF and the agent works from that. Not all of a company\'s work is text.',
      },
    ],
    swapKicker: 'And the point',
    swapNote: 'What matters is not which model we use today, but that we depend on none of them. A better one ships every few months; when it does, the routing changes and your agents, your processes and your knowledge stay exactly as they were. A competitor locked to one provider has to wait for that provider to improve.',
  },

  rollout: {
    kicker: 'Rollout and control',
    title: ['It installs in six steps. ', 'And it does nothing without your say-so.'],
    lead: 'The question that matters is not how the system gets into your company, but who is in charge once it is there. You are — and these are the brakes.',
    steps: [
      {
        title: 'Choose where it lives',
        detail: 'The Business OS runs on your server or on ours, and you choose which. Keep it in-house and your data never leaves the building for the system to work.',
      },
      {
        title: 'Decide what it may do',
        detail: 'Three levels per agent: propose only, execute with your permission, or act on its own. You start at the first and give rope as you come to trust it.',
      },
      {
        title: 'Connect your models',
        detail: 'You bring your own API keys. You pay usage straight to the provider, you see what you spend, and you switch models whenever you like.',
      },
      {
        title: 'Connect your stack',
        detail: 'CRM, ERP, bank, email, social, store. Every account you plug in gives your agents the real context of the business instead of guesswork.',
      },
      {
        title: 'Tell us about your business',
        detail: 'A handful of quick questions. From those the system knows who you are, what you sell, to whom and in what tone.',
      },
      {
        title: 'Generate your Business OS',
        detail: 'From your context and your connections, the brain produces your diagnosis, your improvement plan and populates your panel with the departments you need.',
      },
    ],
    stackLabel: 'Some of the accounts that plug in',
    controlKicker: 'Where the brakes are',
    controls: [
      {
        icon: 'check',
        title: 'Approvals',
        detail: 'Nothing critical ships without your sign-off. Each department has its own queue: review, approve or discard.',
      },
      {
        icon: 'wallet',
        title: 'Spend cap',
        detail: 'A daily consumption limit you set. The system stops before it overruns, not after the invoice.',
      },
      {
        icon: 'shield',
        title: 'Audit trail',
        detail: 'Every action is logged: which agent, when, on what data and what it produced. Nothing happens without a trace.',
      },
      {
        icon: 'trend',
        title: 'Evolution loop',
        detail: 'The system audits its own performance and proposes what to tune. Proposes — whether it applies is your call.',
      },
    ],
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
        caption: 'Ops Agent · demo',
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
        planKey: 'un_departamento',
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
        planKey: 'tres_departamentos',
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
        planKey: 'empresa_completa',
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
        // Pricing lives on /en/pricing and STRATA Lab on /en/the-os: this link
        // crosses pages, so it comes from the route map rather than from a
        // '#lab' that would not exist on this page.
        ctaHref: `${rutaHref('el-os', 'en')}#lab`,
      },
    ],
    billingKicker: "How it's billed",
    billingNote:
      'Deployment is a one-off: connecting your systems, loading your company knowledge and getting the agents genuinely working. The monthly fee covers keeping them running, the oversight and the improvements. Adding a department later carries its own deployment and adjusts the fee. No lock-in once deployed. Prices exclude VAT and may be adjusted before launch.',
  },

  permisos: {
    kicker: 'Permissions and control',
    title: ['It starts closed. ', 'You open it, one gesture at a time.'],
    lead: 'The first screen decides whether an owner carries on or uninstalls. That is why the system asks for no permission at all when it installs: it asks for each thing when it is needed, and explains what for.',

    principleKicker: 'The principle',
    principleTitle: 'Nobody decides permissions on day one',
    principleBody:
      'Asking for everything up front is the biggest cause of abandonment in this kind of software. The owner does not yet know what each agent needs, so they either grant too much out of inertia or too little out of fear, and both end badly. Asking in context — when one specific agent needs one specific thing for a task you just asked for — turns every permission into an easy decision.',

    doorsKicker: 'Three doors that must all be open',
    doorsNote:
      'It is not a scale, it is a conjunction: an agent can only act if all three allow it, and the most restrictive one always wins.',
    doors: [
      {
        icon: 'layers',
        n: '01',
        name: 'The house',
        question: '"Where does my data end up, and who can get in?"',
        detail:
          'It is the first question in any data-protection review, and the one that decides whether anything gets signed. We do not have a single answer because there should not be one: you choose.',
        levels: [
          {
            label: 'On our server',
            body: 'Infrastructure in the European Union, isolated per client. You sign in with your corporate email, and anyone not on the list cannot even see that it exists.',
          },
          {
            label: 'On yours',
            body: 'The same system deployed at your place. Your data never leaves, and the only third party that sees anything is the model provider — using your keys.',
            open: true,
          },
        ],
      },
      {
        icon: 'node',
        n: '02',
        name: 'The accounts',
        question: '"Can it read all my email, or only draft replies?"',
        detail:
          'Each account connects with the least permission the job needs, and only when it is needed. Revoking one is a click and takes effect immediately.',
        levels: [
          {
            label: 'Read only',
            body: 'It consults and uses the information as context, but changes nothing: it reads your mail and drafts replies. It does not send.',
          },
          {
            label: 'Read and write',
            body: 'It creates and edits. Anything leaving for the outside world still waits for your approval, however much rope that agent has.',
            open: true,
          },
        ],
      },
      {
        icon: 'bolt',
        n: '03',
        name: 'The agent',
        question: '"Is this going to do things without me knowing?"',
        detail:
          'Three levels per agent, not per system. With a workforce of more than a hundred, a single "autonomous mode" switch is not control: it is a bet.',
        levels: [
          {
            label: 'Proposes',
            body: 'Prepares the work and leaves it in its department queue. Every agent starts here.',
          },
          {
            label: 'Acts with approval',
            body: 'Does the real work and waits for your sign-off before anything leaves.',
          },
          {
            label: 'Acts alone',
            body: 'Executes and tells you in the daily report. For the repetitive and reversible: classifying, tagging, reconciling, summarising.',
            open: true,
          },
        ],
      },
    ],

    vetoKicker: 'And above all three',
    vetoTitle: 'The red list',
    vetoBody:
      'Some actions never run unattended, whatever level the agent holds and however open the three doors are. The veto cuts across all three planes and cannot be switched off.',
    vetoItems: [
      'Moving money or starting a payment',
      'Writing to more than a handful of external recipients',
      'Publishing in the open: site, social, store',
      'Signing or accepting a contract',
      'Deleting data',
      'Changing prices or commercial terms',
      'Granting permissions to another agent',
    ],

    dayOneKicker: 'Day one',
    dayOneTitle: 'What matters is what is not there',
    dayOneBody:
      'We connect your systems, load your company knowledge and leave the agents working. At no step are you asked to decide up front what each one may do: they all start by proposing, and each account connects in read-only the day the first task needs it. The conversation about permissions arrives once you know what for, not before.',

    upKicker: 'How the rope gets longer',
    upQuote: '"Your Marketing agent has had 12 deliveries approved without you changing a word. Let it act with approval?"',
    upBody:
      'The system proposes; it never promotes on its own, and always with the number in front of you. Demoting is immediate and asks nothing: one badly done job is enough to send it back to proposing.',
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
        price: 'from {{implantacion_desde}}',
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

  cases: {
    kicker: 'Our proving ground',
    title: ['We did not pilot it on you. ', 'We piloted it on ourselves.'],
    lead: 'Before selling this to anyone, we put it to work running our own businesses. Each has its own customers, its own invoices and its own emergencies — and all of them run on the same system we are proposing to you. Hover over any of them to see what it runs.',
    disclosure: 'Five of these are companies in our own group and one is a client. Each card says which, because they are not the same thing and we would rather not let it look that way. That most of them are ours is the point: if something breaks, we pay for it before anyone else does.',
    runningLabel: 'Running with agents',
    allDepartments: 'All nine departments',
    badgeGroup: 'Group company',
    badgeClient: 'Client',
    flipHint: 'Hover to see more →',
    flipHintTouch: 'Tap to see more →',
    carouselLabel: 'carousel',
    prev: 'Previous case',
    next: 'Next case',
  },
  partners: {
    kicker: 'Who it is for',
    title: ['For companies that have the problem ', 'and nobody to hand it to.'],
    lead: 'You do not need to be a multinational or have a technical department. You need enough repeated work for it to hurt, and nobody to pass it to. These are the profiles we work with.',
    types: [
      {
        icon: 'users',
        title: 'SMEs of 10 to 100 people',
        detail: 'The core profile: enough volume for repetitive work to weigh, and no IT team to hand it to.',
      },
      {
        icon: 'card',
        title: 'Ecommerce and D2C brands',
        detail: 'Spikes in orders and support, a catalogue that changes weekly, and a small team holding it together.',
      },
      {
        icon: 'doc',
        title: 'Accountants and advisory firms',
        detail: 'The same filing repeated for every client, every month. This is where the difference shows first.',
      },
      {
        icon: 'bank',
        title: 'Family offices and investment groups',
        detail: 'Install the system across portfolio companies and see the whole — not each company separately — from one panel.',
      },
      {
        icon: 'layers',
        title: 'Groups with several companies',
        detail: 'The cockpit consolidates all your companies at a glance, without reconciling spreadsheets at month end.',
      },
      {
        icon: 'send',
        title: 'Distribution and logistics',
        detail: 'Orders, routes, stock and job reports. A lot of coordination that today lives in calls and WhatsApp.',
      },
      {
        icon: 'headset',
        title: 'Clinics and professional services',
        detail: 'Scheduling, client or patient follow-up and invoicing, without it collapsing when reception is short-staffed.',
      },
      {
        icon: 'node',
        title: 'Multi-site businesses and franchises',
        detail: 'The same process repeated at every location, with the guarantee that it runs the same way in all of them.',
      },
    ],
    logosKicker: 'They trust us',
    cta: 'Tell us about your case →',
    partnerNote: 'Not a client but a channel? We work with funds, advisory firms, trade associations and integrators who already advise companies of this profile, on a clear referral model and always under the STRATA brand.',
    partnerCta: 'Become a partner →',
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
        a: 'By department, not by individual agent and not per user. Each department carries a one-off deployment — from {{implantacion_desde}}, which is connecting your systems and getting the agents working — plus a monthly fee from {{cuota_desde_importe}} covering operation, oversight and improvements. The Business OS is included. No lock-in once deployed. These are launch rates and may be adjusted before that date.',
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
        'STRATA OS is not on sale yet. It is bought by department: deployment from {{implantacion_desde}} (one-off) and a fee from {{cuota_desde}}, with the Business OS included. Everyone on the list comes in at the launch rate. What you can buy today is STRATA Lab: it starts with a diagnosis from {{implantacion_desde}} (credited if we continue), and implementation plus the monthly fee depend on the level you choose.',
      diagnosis:
        'In 3 weeks we map your operation and tell you where AI creates value, with estimated ROI. This is the side that is already available: fill in the contact form and we get started.',
      trust:
        "We run our own business on this system 24/7 — we're our first success case. And we stay inside until your team uses it and it delivers.",
    },
    fallback: "That one's beyond me: I'm a guided assistant, not an open AI. Write to us and a person will reply:",
  },
};
