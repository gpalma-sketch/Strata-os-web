/**
 * Single source of truth for everything that is a business decision rather
 * than a design decision: launch status, contact addresses, form endpoints,
 * and the data that gates sections which are not ready to ship.
 *
 * Anything still marked TODO must be resolved before launch — see
 * LAUNCH-CHECKLIST.md.
 */

export const site = {
  name: 'STRATA',
  /** Registered at GoDaddy. Must match `site` in astro.config.mjs. */
  domain: 'stratalabai.com',

  /**
   * The mailbox that actually exists on the domain (Gmail / Google Workspace).
   * Used by every mailto: CTA, the chat fallback and the form error states —
   * so it must be real: it is the only route left when a form fails.
   *
   * Swap to hola@ / partners@ once those aliases exist and are being read.
   */
  email: 'gpalma@stratalabai.com',
  partnersEmail: 'gpalma@stratalabai.com',

  /**
   * Launch status of the two product lines.
   *
   * STRATA OS is not purchasable yet, so the whole page has to read as
   * "coming soon, join the list" rather than "buy now": pricing tiers carry a
   * badge instead of a checkout CTA, the hero points at the waitlist, and the
   * chat says so when asked about buying. Flip `osAvailable` to true on launch
   * day and the badges, the CTA labels and the waitlist copy all follow.
   *
   * STRATA Lab is a service the team can deliver today, so it stays fully
   * contactable — that is the one thing on the page you can actually buy.
   */
  osAvailable: false,
  labAvailable: true,

  /**
   * Waitlist signups (STRATA OS launch list). Email only — the point is zero
   * friction. Posts `FormData` and expects any 2xx back, which Formspree,
   * Basin, Web3Forms, Netlify Forms, Mailchimp and Beehiiv all satisfy, so the
   * site stays fully static.
   *
   * Unset → the waitlist form is replaced by a mailto: link, so an
   * unconfigured deploy never silently swallows a signup.
   */
  waitlistEndpoint: import.meta.env.PUBLIC_WAITLIST_ENDPOINT ?? '',

  /**
   * Diagnosis enquiries (STRATA Lab). Same contract as above; a separate
   * endpoint so launch-list emails and real sales leads don't land in one pile.
   */
  contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? '',

  /**
   * Customer testimonials.
   *
   * Deliberately empty. The design prototype shipped three quotes its own
   * author flagged as written "by archetype" rather than collected from
   * customers; publishing invented endorsements as real ones is a fabricated
   * testimonial, and for an EU-facing site an unfair commercial practice under
   * Directive 2005/29/EC Annex I.
   *
   * To turn the section on: add real, attributable quotes (with permission),
   * drop any photos into src/assets, and it renders exactly as designed.
   */
  testimonials: [] as Testimonial[],

  /**
   * Partner logos. Same rule: the strip only renders once there are real
   * partners to show.
   */
  partnerLogos: [] as PartnerLogo[],
} as const;

export interface Testimonial {
  /** Verbatim quote, with permission to publish. */
  quote: string;
  /** Attribution — a real name, or a role if the client prefers anonymity. */
  author: string;
  /** Company or sector. */
  org: string;
  /** 1–5. Omit entirely rather than inventing one. */
  rating?: number;
  /** Path under src/assets, e.g. 'client-acme.jpg'. */
  photo?: string;
}

export interface PartnerLogo {
  name: string;
  /** Path under src/assets. */
  logo: string;
  href?: string;
}

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

/** Root-relative path for a locale ('' for the default locale). */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'es' ? clean : `/en${clean === '/' ? '' : clean}`;
}
