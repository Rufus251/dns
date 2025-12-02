import { ref } from "vue";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/shared/lib/localStorage";
import { validateForm, validators } from "@/shared/lib/validation";
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
  const validationErrors = ref<Record<string, string>>({});

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
    validationErrors.value = {};

    const rules = products.value.flatMap((product, idx) => {
      const prefix = `products.${idx}`;
      return [
        {
          field: `${prefix}.quantity`,
          validator: "integer",
          value: product.quantity,
          isValid: validators.integer,
          errorMessage: "Количество должно быть целым числом",
        },
        {
          field: `${prefix}.price`,
          validator: "decimal",
          value: product.price,
          isValid: validators.decimal,
          errorMessage: "Некорректная цена",
        },
        {
          field: `${prefix}.color`,
          validator: "inList",
          value: product.color,
          isValid: validators.inList(COLOR_OPTIONS),
          errorMessage: "Выберите цвет из списка",
        },
      ];
    });

    const formErrors = validateForm(rules);
    validationErrors.value = formErrors;

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
    error,
    validationError,
    validationErrors,
    colorOptions: COLOR_OPTIONS,
    loadProducts,
    save,
  };
};