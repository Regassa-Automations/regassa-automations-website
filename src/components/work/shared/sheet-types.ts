/** Cell model for SheetMock (spreadsheet-style illustration tables). */
export type SheetCell =
  | string
  | { kind: 'id'; text: string }
  | { kind: 'chip'; tone: 'ok' | 'req' | 'fail'; text: string }
  | { kind: 'check'; on: boolean }
  | { kind: 'dd'; text: string }
  | { kind: 'wrap'; text: string }
  | { kind: 'kept'; text: string; label: string }
  | { kind: 'changed'; text: string; label: string }
  | { kind: 'muted'; text: string }
  | { kind: 'score'; text: string; strong?: boolean };

export interface SheetColumn {
  label: string;
  /** Highlighted header (Record ID column). */
  highlight?: boolean;
  /** Header text is visually hidden (still read by screen readers). */
  hidden?: boolean;
}

export interface SheetRow {
  cells: SheetCell[];
  /** Highlighted row (page-scoped fill); its row header names it, so no extra label. */
  highlight?: boolean;
  /** Tinted row whose meaning is carried by a visually hidden label (quotes before/after). */
  tone?: 'yellow' | 'pink';
  toneLabel?: string;
}
