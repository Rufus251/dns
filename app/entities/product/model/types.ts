export type ProductColor = 'Белый' | 'Чёрный' | 'Синий' | 'Красный' | 'Зелёный' | 'Жёлтый';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  color: ProductColor;
}