export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspect: '16:9' | '4:3' | '3:4' | '1:1';
  offsetClass?: string; // custom staggered masonry dynamic styling
  description: string;
  year: string;
  metrics: string[]; // data-backed digital marketing proof
  link?: string;
}

export interface MouseCoordinates {
  x: number;
  y: number;
}
