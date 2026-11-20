import type { ImageMetadata } from 'astro';

export interface GalleryItem {
  image: ImageMetadata;
  title: string;
  caption: string;
  alt: string;
  /** CSS max-width for narrow captures in the dialog (e.g. '646px'); default 100%. */
  maxWidth?: string;
}
