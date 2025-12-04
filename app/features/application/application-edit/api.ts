import { api } from "@/shared/api/client";
import type { EditableProduct } from "../types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/shared/lib/localStorage";

interface RawProduct {
  id: number;
  name: string;
  price: number;
}

const mapToEditableProduct = (raw: RawProduct): EditableProduct => {
  return {
    id: raw.id,
    name: raw.name,
    quantity: "1",
    price: raw.price.toString(),
    color: null,
  };
};

export const fetchEditableProducts = async (): Promise<EditableProduct[]> => {
  try {
    const rawProducts = await api.get<RawProduct[]>("/products");
    return rawProducts.map(mapToEditableProduct);
  } catch (error) {
    console.error("[API] Failed to fetch products:", error);
    throw new Error("Не удалось загрузить товары");
  }
};

export const fetchApplicationProducts = async (): Promise<
  EditableProduct[]
> => {
  if (import.meta.client) {
    const cached = getLocalStorageItem<EditableProduct[]>("products-cache");
    if (cached) return cached;
  }

  const products = await fetchEditableProducts();

  if (import.meta.client) {
    setLocalStorageItem("products-cache", products);
  }

  return products;
};
