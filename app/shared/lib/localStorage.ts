const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * @returns значение заданного типа T или null, если ошибка/нет данных
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  if (!isLocalStorageAvailable()) return null;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`[localStorage] Failed to parse item "${key}"`, e);
    return null;
  }
};

/**
 * Сохраняет значение в localStorage как JSON
 * @returns true при успехе, false при ошибке
 */
export const setLocalStorageItem = <T>(key: string, value: T): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (e) {
    console.warn(`[localStorage] Failed to set item "${key}"`, e);
    return false;
  }
};

/**
 * Удаляет один ключ из localStorage
 * @returns true при успехе, false при ошибке
 */
export const removeLocalStorageItem = (key: string): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`[localStorage] Failed to remove item "${key}"`, e);
    return false;
  }
};

/**
 * Полностью очищает localStorage
 * @returns true при успехе, false при ошибке
 */
export const clearLocalStorage = (): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.clear();
    return true;
  } catch (e) {
    console.warn("[localStorage] Failed to clear storage", e);
    return false;
  }
};
