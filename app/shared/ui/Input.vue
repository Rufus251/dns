<template>
  <!-- ИИ компонент с минимальными изменениями, не было времени -->
  <!-- TODO: чекнуть чё тут происходит -->
  <div :class="$style.wrapper">
    <input
      v-model="localValue"
      :class="[$style.input, hasError ? $style.hasError : '']"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <button
      v-if="localValue && isFocused"
      :class="$style.clearButton"
      type="button"
      @mousedown.prevent
      @click="clear"
      aria-label="Очистить поле"
    >
      <img src="@/assets/icon-close.svg" alt="close" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    hasError?: boolean;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    hasError: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const localValue = ref(props.modelValue);
const isFocused = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const clear = () => {
  localValue.value = "";
  emit("update:modelValue", "");
};
</script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.input {
  width: 100%;
  height: 36px;
  min-height: 36px;
  max-height: 36px;
  padding: 8px 8px 8px 12px;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid $border-light;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  vertical-align: middle;
  opacity: 1;
  background-color: $background-secondary;
  color: $text-primary;

  &::placeholder {
    color: $text-tertiary;
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: $border-brand;
  }
}

.hasError {
  border: 1px solid $border-error;
}

.clearButton {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 16px;
  height: 16px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  img {
    width: 16px;
    height: 16px;
    display: block;
  }
}
</style>
