import { ref } from "vue";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/shared/lib/localStorage";
import { validateForm } from "@/shared/lib/validation";
import { fetchEditableProducts } from "./api";
import type { EditableProduct, ApplicationEditForm } from "../types";
import type { ProductColor } from "@/entities/product/model/types";

const PRODUCTS_CACHE_KEY = "products-cache";
export const COLOR_OPTIONS: ProductColor[] = ["blue", "red", "green", "yellow"];

export const useApplicationEdit = (applicationId: number) => {
  const products = ref<EditableProduct[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const validationError = ref<string | null>(null);

  const loadProducts = async (): Promise<EditableProduct[]> => {
    const cached = getLocalStorageItem<EditableProduct[]>(PRODUCTS_CACHE_KEY);
    if (cached) {
      products.value = cached;
      return products.value;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await fetchEditableProducts();
      products.value = response;
      setLocalStorageItem(PRODUCTS_CACHE_KEY, response);
    } catch (err) {
      console.error("[ApplicationEdit] Failed to load products:", err);
      error.value = "Не удалось загрузить список товаров";
    } finally {
      loading.value = false;
      return products.value;
    }
  };

  const save = (): boolean => {
    validationError.value = null;

    const rules = products.value.flatMap((product, idx) => {
      const prefix = `products.${idx}`;
      return [
        {
          field: `${prefix}.quantity`,
          validator: "quantity",
          value: product.quantity,
          isValid: (val: unknown) => {
            if (typeof val !== "string") return false;
            const s = val.trim();
            return s !== "" && /^\d+(\.\d+)?$/.test(s);
          },
          message: "Некорректное количество",
        },
        {
          field: `${prefix}.price`,
          validator: "price",
          value: product.price,
          isValid: (val: unknown) => {
            if (typeof val !== "string") return false;
            const s = val.trim();
            return s !== "" && /^\d+(\.\d+)?$/.test(s);
          },
          message: "Некорректная цена",
        },
        {
          field: `${prefix}.color`,
          validator: "color",
          value: product.color,
          isValid: (val: unknown) => {
            return val !== null && COLOR_OPTIONS.includes(val as ProductColor);
          },
          message: "Выберите цвет",
        },
      ];
    });

    const formErrors = validateForm(rules);

    if (Object.keys(formErrors).length > 0) {
      validationError.value = "Ошибка валидации";
      return false;
    }

    const formData: ApplicationEditForm = {
      id: applicationId,
      products: products.value,
    };
    setLocalStorageItem(`application-${applicationId}`, formData);

    return true;
  };

  return {
    products,
    loading,
    error, // ошибка загрузки
    validationError, // ошибка валидации
    colorOptions: COLOR_OPTIONS,
    loadProducts,
    save,
  };
};
