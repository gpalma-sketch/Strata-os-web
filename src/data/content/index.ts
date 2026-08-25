import type { Locale } from '../site';
import type { Content } from './types';
import { es } from './es';
import { en } from './en';

export const content: Record<Locale, Content> = { es, en };

export type { Content } from './types';
export * from './types';
