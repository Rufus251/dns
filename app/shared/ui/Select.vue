<template>
  <!-- ИИ компонент с минимальными изменениями, не было времени -->
  <!-- TODO: чекнуть чё тут происходит -->
  <div
    :class="[$style.wrapper, hasError ? $style.hasError : '']"
    @click="toggle"
    @keyup.enter="toggle"
    @keyup.space="toggle"
    tabindex="0"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-haspopup="true"
  >
    <span :class="$style.selectedText">
      {{ selectedLabel || placeholder }}
    </span>

    <img
      src="@/assets/arrow-up.svg"
      :class="[$style.arrow, { [$style.open]: isOpen }]"
      alt=""
    />

    <div v-if="isOpen" :class="$style.dropdown" ref="dropdownRef">
      <div :class="$style.itemsContainer">
        <div
          v-for="option in options"
          :key="option.value"
          :class="[
            $style.item,
            { [$style.selected]: option.value === modelValue },
          ]"
          @click="select(option)"
          @mouseenter="hoveredValue = option.value"
          @mouseleave="hoveredValue = null"
        >
          <span :class="$style.itemText">{{ option.label }}</span>
          <img
            v-if="hoveredValue === option.value"
            src="@/assets/agree.svg"
            :class="$style.agreeIcon"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    options: { value: string | number; label: string }[];
    placeholder?: string;
    hasError?: boolean;
  }>(),
  {
    modelValue: undefined,
    placeholder: "Выберите...",
    hasError: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const isOpen = ref(false);
const hoveredValue = ref<string | number | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected?.label || "";
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const select = (option: { value: string | number; label: string }) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (
    !dropdownRef.value?.contains(e.target as Node) &&
    e.target !== dropdownRef.value?.parentElement
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 36px;
  max-height: 36px;
  padding: 8px 8px 8px 12px;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid $border-light;
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  vertical-align: middle;
  opacity: 1;
  background-color: $background-secondary;
  color: $text-primary;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: $border-dark;
  }
}

.hasError {
  border: 1px solid $border-error;
}

.selectedText {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  width: 16px;
  height: 16px;
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(0deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10200;
  width: 220px;
  max-height: 256px;
  margin-top: 8px;
  border-radius: 12px;
  padding: 8px;
  background-color: $background-secondary;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.itemsContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  color: $text-primary;
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  transition: color 0.15s ease;

  &:hover {
    color: $brand-dark;
  }
}

.item.selected {
  color: $brand-dark;
}

.agreeIcon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
</style>
