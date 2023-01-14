export class CartItem {
  id: number;
  name: string;
  author: string;
  unitPrice: number;
  quantity: number;
  format: {
    id: number;
    formatName: string;
  };
  imageUrl: string;
}
