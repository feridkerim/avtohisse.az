export interface Product {
  id: string;
  title: string;
  price: number;
  location: string;
  date: string;
  images: string[];
  isPremium?: boolean;
}
