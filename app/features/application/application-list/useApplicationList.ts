import { ref } from "vue";
import { getLocalStorageItem } from "@/shared/lib/localStorage";
import { fetchApplications } from "./api";
import type { Application } from "@/entities/application/model/types";

export interface ApplicationListItem extends Application {
  hasDraft: boolean;
}

export const useApplicationList = () => {
  const applications = ref<ApplicationListItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadApplications = async () => {
    loading.value = true;
    error.value = null;

    try {
      const baseApplications = await fetchApplications();
      const enrichedApplications: ApplicationListItem[] = [];

      for (const app of baseApplications) {
        try {
          const hasDraft =
            getLocalStorageItem(`application-${app.id}`) !== null;
          enrichedApplications.push({
            ...app,
            hasDraft,
            validationStatus: hasDraft ? "valid" : null,
          });
        } catch (storageError) {
          console.warn(
            `[ApplicationList] Failed to read localStorage for app ${app.id}:`,
            storageError
          );
          enrichedApplications.push({
            ...app,
            hasDraft: false,
            validationStatus: null,
          });
        }
      }

      applications.value = enrichedApplications;
    } catch (apiError) {
      console.error("[ApplicationList] Failed to load applications:", apiError);
      error.value =
        "Не удалось загрузить список заявок. Попробуйте обновить страницу.";
      applications.value = [];
    } finally {
      loading.value = false;
    }
  };

  const reload = () => loadApplications();

  return {
    applications,
    loading,
    error,
    loadApplications,
    reload,
  };
};
