/**
 * The shape of every string on the page.
 *
 * The design prototype translated itself at runtime by matching rendered
 * textContent against a dictionary — which broke on whitespace, could not be
 * indexed by search engines and left half the body in Spanish when a key was
 * missed. Here each locale is a fully-typed object rendered at build time into
 * its own route (`/` and `/en`), so a missing string is a type error rather
 * than a silent fallback.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface Stat {
  /** Big number. Kept as a string so ranges and units read exactly as designed. */
  value: string;
  /** Optional smaller unit rendered inside the number. */
  unit?: string;
  /** Two-line caption under the number. */
  caption: [string, string];
  /** Renders the number in gold instead of mint. */
  gold?: boolean;
  /** Animate from 0 on scroll. Only for values that are a plain integer. */
  countTo?: number;
}

export interface Pillar {
  tag: string;
  name: string;
  summary: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  price: string;
}

export interface Outcome {
  /** Icon key — see components/icons.ts */
  icon: string;
  value: string;
  /** Smaller suffix inside the number (%, "bajas que paran", …). */
  suffix?: string;
  title: string;
  detail: string;
}

export interface Agent {
  icon: string;
  name: string;
  status: string;
  description: string;
  tags: string[];
}

export interface FeedLine {
  agent: string;
  text: string;
}

export interface Vista {
  n: string;
  title: string;
  summary: string;
}

export interface FlowNode {
  title: string;
  summary: string;
  hot?: boolean;
}

export interface UseCase {
  tab: string;
  title: string;
  description: string;
  you: string;
  ai: string;
  caption: string;
  rows: Array<{ title: string; sub: string; state: string; icon: 'check' | 'plus' }>;
}

export interface PriceTier {
  name: string;
  /**
   * One-off deployment fee, rendered above the recurring price.
   *
   * Every serious player in this market charges to put agents into a business
   * — Sierra bills setup on top of the subscription, and Spanish AI projects
   * close at €15k–60k before any monthly fee. Selling a department that runs a
   * company for a monthly amount and no deployment cost reads as a tool, not
   * as a system, so the figure is part of the offer rather than a surprise.
   */
  setup?: string;
  price: string;
  /** Rendered small next to the price, e.g. "/mes". */
  period?: string;
  meta: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  highlight?: boolean;
  /**
   * Marks a tier as not purchasable yet. Renders the "coming soon" chip and
   * turns the CTA into a waitlist link instead of a checkout.
   */
  comingSoon?: boolean;
}

export interface Rung {
  n: string;
  name: string;
  who: string;
  detail: string;
  /** How many of the four progress ticks are lit. */
  filled: number;
}

export interface Step {
  n: string;
  title: string;
  price?: string;
  body: string;
  gives: string;
}

export interface Member {
  /** Filename under src/assets. */
  photo: string;
  name: string;
  role: string;
  bio: string;
}

export interface PartnerType {
  icon: string;
  title: string;
  detail: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Content {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    skipToContent: string;
    menuLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    kicker: string;
    /** Rendered as two lines. */
    title: [string, string];
    leadTop: string;
    leadPrefix: string;
    rotor: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    statusChip: string;
    devicesKicker: string;
    devicesTitle: string;
    windowTitle: string;
    sectors: string[];
  };
  stats: Stat[];
  /**
   * STRATA OS launch waitlist. Replaces the prototype's "start your company
   * tonight, no card, in minutes" band, which promised an instant self-serve
   * signup that does not exist — the product is not purchasable yet.
   */
  waitlist: {
    kicker: string;
    title: [string, string];
    lead: string;
    /** Three reasons to join now, rendered as the old counter row. */
    reasons: Array<{ value: string; unit?: string; caption: [string, string]; gold?: boolean }>;
    /** Capability ticker — what the agents do, not invented sign-ups. */
    ticker: Array<[string, string]>;
    form: {
      label: string;
      placeholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      consent: string;
      /** Shown instead of the form when no endpoint is configured. */
      fallbackCta: string;
    };
  };
  pillars: {
    kicker: string;
    title: [string, string];
    items: [Pillar, Pillar];
  };
  why: {
    kicker: string;
    title: [string, string];
    lead: string;
    bento: {
      team: { title: string; body: string; channel: string; agentCount: string; rows: Array<{ initial: string; name: string; detail: string }> };
      integrations: { title: string; body: string; more: string };
      data: { title: string; body: string };
      platform: { title: string; body: string; tiles: Array<{ label: string; value: string; pct: number }> };
    };
    outcomesKicker: string;
    outcomesTitle: string;
    outcomes: Outcome[];
    /** Required disclaimer under the outcome grid. */
    outcomesNote: string;
    ctaLabel: string;
    ctaNote: string;
  };
  agents: {
    kicker: string;
    title: [string, string];
    lead: string;
    items: Agent[];
    feedTitle: string;
    feedLive: string;
    feedDone: string;
    feedLines: FeedLine[];
    ctaLabel: string;
    ctaNote: string;
    ctaNoteLink: string;
    ctaNoteAfter: string;
  };
  product: {
    kicker: string;
    title: [string, string];
    lead: string;
    vistas: Vista[];
  };
  how: {
    kicker: string;
    title: [string, string];
    columns: FlowNode[][];
    closing: string;
    closingStrong: string;
    closingAfter: string;
  };
  useCases: {
    kicker: string;
    title: [string, string];
    youLabel: string;
    aiLabel: string;
    items: UseCase[];
  };
  pricing: {
    kicker: string;
    title: [string, string];
    lead: string;
    tiers: PriceTier[];
    billingKicker: string;
    billingNote: string;
    /** Chip on every not-yet-purchasable tier. */
    comingSoonLabel: string;
    /** Caption above each tier's one-off deployment fee. */
    setupLabel: string;
    /** Band above the tiers stating plainly that the OS is not on sale yet. */
    availabilityNote: string;
  };
  method: {
    kicker: string;
    title: [string, string];
    lead: string;
    rungs: Rung[];
    capstoneTitle: string;
    capstoneBody: string;
  };
  lab: {
    kicker: string;
    title: [string, string];
    lead: string;
    steps: Step[];
    dealKicker: string;
    dealBody: string;
    dealHighlight: string;
    dealAfter: string;
  };
  reviews: {
    kicker: string;
    title: [string, string];
  };
  gallery: Array<{ image: string; alt: string; label: string; caption: string }>;
  team: {
    kicker: string;
    title: [string, string];
    lead: string;
    members: Member[];
  };
  /**
   * Sección "para quién es". Se llamaba `partners` y describía el canal de
   * referidos; ahora describe a los clientes, que es la pregunta que se hace
   * quien llega a la web. El canal sobrevive como una línea al final —sigue
   * siendo una vía de entrada real— pero deja de ocupar una sección entera.
   * La clave conserva el nombre para no romper el ancla `#partners`.
   */
  partners: {
    kicker: string;
    title: [string, string];
    lead: string;
    types: PartnerType[];
    logosKicker: string;
    cta: string;
    /** Cierre para quien no es cliente sino canal. */
    partnerNote: string;
    partnerCta: string;
  };
  faq: {
    kicker: string;
    title: [string, string];
    items: Faq[];
  };
  contact: {
    kicker: string;
    title: [string, string];
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      consent: string;
      required: string;
    };
  };
  footer: {
    tagline: string;
  };
  chat: {
    fabLabel: string;
    name: string;
    status: string;
    greeting: string;
    placeholder: string;
    send: string;
    close: string;
    quicks: string[];
    answers: { what: string; launch: string; price: string; diagnosis: string; trust: string };
    fallback: string;
  };
}
