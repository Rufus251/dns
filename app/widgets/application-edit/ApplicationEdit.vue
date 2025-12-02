<template>
  <div class="application-edit">
    <div v-if="error" class="application-edit__error">
      {{ error }}
    </div>

    <div v-else-if="loading" class="application-edit__loading">
      Загрузка товаров...
    </div>

    <form v-else class="application-edit__form" @submit.prevent="onSubmit">
      <Table
        :headers="headers"
        :rows="tableRows"
        class="application-edit__table"
      >
        <template #cell-0="{ cell }">
          <div class="application-edit__name">
            {{ cell }}
          </div>
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

      <div v-if="validationError" class="application-edit__validation-error">
        {{ validationError }}
      </div>

      <div class="application-edit__actions">
        <Button type="submit" variant="primary">Сохранить</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Table from "@/shared/ui/Table.vue";
import Input from "@/shared/ui/Input.vue";
import Select from "@/shared/ui/Select.vue";
import Button from "@/shared/ui/Button.vue";
import {
  COLOR_OPTIONS,
  useApplicationEdit,
} from "@/features/application/application-edit/useApplicationEdit";
import type { ProductColor } from "@/entities/product/model/types";
import type { EditableProduct } from "~/features/application/types";

const props = defineProps<{
  applicationId: number;
}>();

const emit = defineEmits<{
  (e: "save"): void;
}>();

const {
  products,
  loading,
  error,
  validationError,
  validationErrors,
  colorOptions,
  loadProducts,
  save,
} = useApplicationEdit(props.applicationId);

const localProducts = ref([...products.value]);

watch(products, (newProducts) => {
  localProducts.value = [...newProducts];
});

loadProducts();

const updateField = (
  index: number,
  field: keyof EditableProduct,
  value: unknown
) => {
  const current: EditableProduct | undefined = localProducts.value[index];
  if (!current) return;

  const validationKey = `products.${index}.${field}`;
  if (validationErrors.value[validationKey] !== undefined) {
    const { [validationKey]: _, ...newErrors } = validationErrors.value;
    validationErrors.value = newErrors;
    
    if (Object.keys(newErrors).length === 0) {
      validationError.value = null;
    }
  }

  const updatedProduct: EditableProduct = {
    id: current.id,
    name: current.name,
    quantity: current.quantity,
    price: current.price,
    color: current.color,
  };

  if (field === "quantity" || field === "price") {
    updatedProduct[field] = String(value ?? "");
  } else if (field === "color") {
    const strValue = String(value ?? "");
    updatedProduct.color = COLOR_OPTIONS.includes(strValue as ProductColor)
      ? (strValue as ProductColor)
      : null;
  }

  localProducts.value[index] = updatedProduct;
};

const headers = ["Название", "Количество", "Цена", "Цвет"];

const tableRows = computed(() => {
  return localProducts.value.map((product) => [
    product.name,
    product.quantity,
    product.price,
    product.color,
  ]);
});

const hasError = (field: string) => {
  return validationErrors.value[field] !== undefined;
};

const onSubmit = () => {
  products.value = [...localProducts.value];
  const success = save();
  if (success) {
    emit("save");
  }
};
</script>

<style scoped lang="scss">
@use "@/shared/styles/vars" as *;

.application-edit {
  &__error,
  &__validation-error {
    padding: 12px;
    color: $text-disabled;
    border: 1px solid $border-error;
    border-radius: 4px;
    margin-bottom: 16px;
    color: $border-error;
  }

  &__loading {
    padding: 24px;
    text-align: center;
    color: $text-tertiary;
  }

  &__table {
    margin-bottom: 24px;
  }

  &__name {
    font-weight: 600;
    color: $text-primary;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
