import { ref } from "vue";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/shared/lib/localStorage";
import { sendApplicationApi } from "./api";
import type { ApplicationEditForm } from "../types";
import type { ApplicationSend } from "../types";

export const useApplicationSend = (applicationId: number) => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const send = async (): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const draft = getLocalStorageItem<ApplicationEditForm>(
        `application-${applicationId}`
      );
      if (!draft) {
        error.value = "Нет данных для отправки";
        return false;
      }

      const payload: ApplicationSend = {
        id: applicationId,
        products: draft.products.map((p) => ({
          id: p.id,
          name: p.name,
          // price уже прошёл валидацию в application-edit - безопасно в число
          price: Number(p.price),
        })),
      };

      const response = await sendApplicationApi(payload);

      if (!response.success) {
        error.value = "Сервер не подтвердил отправку";
        return false;
      }

      removeLocalStorageItem(`application-${applicationId}`);

      return true;
    } catch (err) {
      console.error("[ApplicationSend] Failed to send application:", err);
      error.value = "Не удалось отправить заявку";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    send,
  };
};
