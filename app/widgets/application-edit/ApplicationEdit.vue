<template>
  <div class="application-edit">
    <form class="application-edit__form" @submit.prevent="onSubmit">
      <div class="application-edit__actions">
        <Button type="submit" variant="primary">Сохранить</Button>
      </div>
      <Table
        :headers="headers"
        :rows="tableRows"
        class="application-edit__table"
      >
        <template #cell-0="{ cell }">
          <div class="application-edit__name">{{ cell }}</div>
        </template>

        <template #cell-1="{ cell, rowIndex }">
          <Input
            :model-value="cell"
            :hasError="hasError(`products.${rowIndex}.quantity`)"
            @update:model-value="updateField(rowIndex, 'quantity', $event)"
          />
        </template>

        <template #cell-2="{ cell, rowIndex }">
          <Input
            :model-value="cell"
            :hasError="hasError(`products.${rowIndex}.price`)"
            @update:model-value="updateField(rowIndex, 'price', $event)"
          />
        </template>

        <template #cell-3="{ cell, rowIndex }">
          <Select
            :model-value="cell"
            :options="colorOptions.map((c) => ({ value: c, label: c }))"
            :hasError="hasError(`products.${rowIndex}.color`)"
            @update:model-value="updateField(rowIndex, 'color', $event)"
          />
        </template>
      </Table>
    </form>
  </div>
</template>

<script setup lang="ts">
// Core
import { computed } from "vue";
// UI Components
import Table from "@/shared/ui/TableGrid.vue";
import Input from "@/shared/ui/Input.vue";
import Select from "@/shared/ui/Select.vue";
import Button from "@/shared/ui/Button.vue";
// Types
import type { EditableProduct } from "@/features/application/types";
// Composable
import { useApplicationEditForm } from "@/features/application/application-edit/useApplicationEditForm";

const props = defineProps<{
  initialProducts: EditableProduct[];
  applicationId: number;
}>();

const emit = defineEmits<{
  (e: "save"): void;
}>();

const { products, hasError, updateField, save, colorOptions } =
  useApplicationEditForm(props.initialProducts, props.applicationId);

const headers = ["Название", "Количество", "Цена", "Цвет"];

const tableRows = computed(() =>
  products.value.map((p) => [p.name, p.quantity, p.price, p.color])
);

const onSubmit = () => {
  if (save()) {
    emit("save");
  }
};
</script>

<style scoped lang="scss">
@use "@/shared/styles/vars" as *;

.application-edit {
  &__table {
    margin-top: 20px;
  }

  &__actions {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
