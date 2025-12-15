export type GalleryCategory = 'dol' | 'place' | 'hanbok';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  palette: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}
