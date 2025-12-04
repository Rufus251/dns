import { ref } from "vue";
import {
  validateForm,
  validators,
  clearValidationError,
} from "@/shared/lib/validation";
import { setLocalStorageItem } from "@/shared/lib/localStorage";
import type { EditableProduct, ApplicationEditForm } from "../types";
import type { ProductColor } from "@/entities/product/model/types";

export const COLOR_OPTIONS: ProductColor[] = ["blue", "red", "green", "yellow"];

// HARD_VALIDATION — если true, ошибки не будут очищаться при изменении полей
export const useApplicationEditForm = (
  initialProducts: EditableProduct[],
  applicationId: number,
  HARD_VALIDATION = false
) => {
  const products = ref<EditableProduct[]>([...initialProducts]);
  const validationError = ref<string | null>(null);
  const validationErrors = ref<Record<string, string>>({});

  const updateField = (
    index: number,
    field: keyof EditableProduct,
    value: unknown
  ) => {
    const current = products.value[index];
    if (!current) return;

    const validationKey = `products.${index}.${field}`;
    if (validationErrors.value[validationKey] !== undefined && !HARD_VALIDATION) {
      _clearFieldError(validationKey);
    }

    const updated = { ...current };

    // Все поля — строки, кроме цвета, хз как норм типизировать чтобы понятно было, так оставил
    if (field === "quantity" || field === "price") {
      updated[field] = String(value ?? "");
    } else if (field === "color") {
      const strValue = String(value ?? "");
      updated.color = COLOR_OPTIONS.includes(strValue as ProductColor)
        ? (strValue as ProductColor)
        : null;
    }

    products.value[index] = updated;
  };

  const save = (): boolean => {
    validationError.value = null;
    validationErrors.value = {};

    const rules = products.value.flatMap((product, idx) => {
      const prefix = `products.${idx}`;
      return [
        {
          field: `${prefix}.quantity`,
          value: product.quantity,
          validator: "integer",
          isValid: validators.integer,
          errorMessage: "Количество должно быть целым числом",
        },
        {
          field: `${prefix}.price`,
          value: product.price,
          validator: "decimal",
          isValid: validators.decimal,
          errorMessage: "Некорректная цена",
        },
        {
          field: `${prefix}.color`,
          value: product.color,
          validator: "inList",
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

    if (import.meta.client) {
      setLocalStorageItem(`application-${applicationId}`, formData);
    }

    return true;
  };

  const hasError = (field: string) => {
    return validationErrors.value[field] !== undefined;
  };

  const _clearFieldError = (fieldKey: string) => {
    const newErrors = clearValidationError(validationErrors.value, fieldKey);
    validationErrors.value = newErrors;
    if (Object.keys(newErrors).length === 0) {
      validationError.value = null;
    }
  };

  return {
    products,
    validationError,
    validationErrors,
    hasError,
    updateField,
    save,
    colorOptions: COLOR_OPTIONS,
  };
};
