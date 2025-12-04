export interface ValidationRule {
  // Уникальное имя поля (например, "products.0.price")
  field: string;

  // Тип валидатора (для отладки или кастомных сообщений)

  validator: string;

  // Значение поля на момент валидации
  value: unknown;

  /**
   * Функция, проверяющая валидность значения.
   * Должна вернуть true, если значение корректно.
   */
  isValid: (value: unknown) => boolean;

  // Сообщение об ошибке при провале валидации
  errorMessage?: string;
}

// Результат валидации: имя поля - сообщение об ошибке
export type ValidationErrors = Record<string, string>;

const DEFAULT_MESSAGES: Record<string, string> = {
  required: "Обязательное поле",
  minLength: "Слишком короткое значение",
  maxLength: "Слишком длинное значение",
  quantity: "Некорректный формат",
};
/**
 * @param rules — массив правил для всех полей
 * @returns объект ошибок (пустой, если всё валидно)
 */
export const validateForm = (rules: ValidationRule[]): ValidationErrors => {
  const errors: ValidationErrors = {};

  for (const { field, validator, value, isValid, errorMessage } of rules) {
    if (!isValid(value)) {
      const errorMsg =
        errorMessage || DEFAULT_MESSAGES[validator] || "Некорректное значение";
      errors[field] = errorMsg;
    }
  }

  return errors;
};

export const clearValidationError = (
  errors: Record<string, string>,
  key: string
): Record<string, string> => {
  const { [key]: _, ...rest } = errors;
  return rest;
};

export const validators = {
  required: (value: unknown): boolean => {
    if (value == null) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  minLength:
    (min: number) =>
    (value: unknown): boolean => {
      if (typeof value !== "string") return false;
      return value.length >= min;
    },

  maxLength:
    (max: number) =>
    (value: unknown): boolean => {
      if (typeof value !== "string") return false;
      return value.length <= max;
    },

  integer: (value: unknown): boolean => {
    if (typeof value !== "string") return false;
    const s = value.trim();
    return s !== "" && /^\d+$/.test(s);
  },

  decimal: (value: unknown): boolean => {
    if (typeof value !== "string") return false;
    const s = value.trim();
    return s !== "" && /^\d+(\.\d+)?$/.test(s);
  },

  inList:
    <T>(list: T[]) =>
    (value: unknown): boolean => {
      return list.includes(value as T);
    },
};
