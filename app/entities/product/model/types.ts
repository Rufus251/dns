export type ProductColor = 'blue' | 'red' | 'green' | 'yellow';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  color: ProductColor;
}