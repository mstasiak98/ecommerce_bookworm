import { Book } from './book';

export class OrderItemDto {
  id: number;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  bookId: number;
  formatName: string;
  book: Book;
}
