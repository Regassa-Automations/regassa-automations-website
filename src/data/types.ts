/** Shared content types for page data transcribed from _handoff/content/. */

/** A run of text: plain, linked, bold or mono. Links starting with http open in a new tab. */
export type Segment =
  string | { text: string; href?: string; strong?: boolean; mono?: boolean; muted?: boolean };

export type Rich = Segment[];

export interface Pair {
  k: string;
  v: string;
  muted?: boolean;
  /** Numbers in journey panels render in the mono font. */
  mono?: boolean;
}

export interface LinkItem {
  label: string;
  href: string;
}
