import { api } from '@/shared/api/client';

interface RawProduct {
  id: number;
  name: string;
  price: number;
}

import type { EditableProduct } from '../types';

const mapToEditableProduct = (raw: RawProduct): EditableProduct => {
  return {
    id: raw.id,
    name: raw.name,
    quantity: '1',
    price: raw.price.toString(),
    color: null,
  };
};

export const fetchEditableProducts = async (): Promise<EditableProduct[]> => {
  const rawProducts = await api.get<RawProduct[]>('/products');
  return rawProducts.map(mapToEditableProduct);
};