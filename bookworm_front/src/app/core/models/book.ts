import { BookCategory } from './book-category';
import { BookFormat } from './book-format';

export class Book {
  id: number;
  sku: string;
  name: string;
  author: string;
  description: string;
  unitPrice: number;
  pageCount: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;
  category: BookCategory;
  format: BookFormat;
}
