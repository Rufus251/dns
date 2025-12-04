<template>
  <div class="application-list">
    <Loader v-if="loading" />
    <Table
      v-else
      :headers="headers"
      :rows="tableRows"
      class="application-list__table"
    >
      <template #cell-1="{ cell }">
        <span class="application-list__status">
          {{ cell }}
        </span>
      </template>

      <template #cell-2="{ cell }">
        <span class="application-list__result">
          {{ cell }}
        </span>
      </template>

      <template #cell-4="{ cell }">
        <Button v-if="!cell.hasDraft" variant="secondary" @click="onEdit(cell.id)">
          Редактировать
        </Button>
        <Button
          v-else
          :disabled="sendingId === cell.id"
          @click="onSend(cell.id)"
        >
          {{ sendingId === cell.id ? "Отправка..." : "Отправить" }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from "@/shared/ui/Table.vue";
import Button from "@/shared/ui/Button.vue";
import {
  useApplicationList,
  type ApplicationListItem,
} from "@/features/application/application-list/useApplicationList";
import { useApplicationSend } from "@/features/application/application-send/useApplicationSend";
import { ref } from "vue";
import { useToast } from "~/shared/lib/toast/useToast";
import Loader from "@/shared/ui/Loader.vue";

const { applications, loading, error, loadApplications, reload } =
  useApplicationList();

const toast = useToast();

const sendingId = ref<number | null>(null);

const emit = defineEmits<{
  (e: "change", id: number): void;
}>();

const onEdit = (id: number) => {
  emit("change", id);
};

const onSend = async (id: number) => {
  sendingId.value = id;
  try {
    const { send } = useApplicationSend(id);
    const response = await send();
    if (response) {
      reload();
    }
  } catch (e) {
    toast.showError(error.value ?? "Ошибка загрузки...");
  }
  sendingId.value = null;
};

const headers = ["Номер", "Статус", "Результат", "Дата", "Действие"];

const tableRows = computed(() =>
  applications.value.map((app: ApplicationListItem) => [
    app.name,
    app.applicationStatus,
    app.process,
    app.createdAt,
    { id: app.id, hasDraft: app.hasDraft },
  ])
);

onMounted(() => {
  loadApplications();
  console.log("table mounted");
});

onUnmounted(() => {
  console.log("table unmounted");
});
</script>

<style scoped lang="scss">
@use "@/shared/styles/vars" as *;

.application-list {
  &__error {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    color: var(--color-error);
    border: 1px solid var(--color-error);
    border-radius: 4px;
    margin-bottom: 16px;
  }

  &__status {
    display: inline-block;
    font-weight: 700;
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0%;
    color: $text-success;
    background-color: $background-success-light;
    padding: 4px 8px;
  }

  &__result {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    color: $text-tertiary;
  }
}
</style>
