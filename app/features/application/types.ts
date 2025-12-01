import type { ProductColor } from "@/entities/product/model/types";

export interface EditableProduct {
  id: number;
  name: string;
  quantity: string;
  price: string;
  color: ProductColor | null;
}

export interface SendProduct {
  id: number;
  name: string;
  price: number;
}

export interface ApplicationEditForm {
  id: number;
  products: EditableProduct[];
}

export interface ApplicationSend {
  id: number;
  products: SendProduct[];
}
