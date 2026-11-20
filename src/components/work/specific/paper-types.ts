/** One author block on a PaperPage illustration. */
export interface PaperEntry {
  letter?: string;
  author: string;
  quotes: Array<{ text: string; categories: string }>;
}
