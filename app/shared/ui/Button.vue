<template>
  <!-- ИИ компонент с минимальными изменениями, не было времени -->
  <!-- TODO: чекнуть чё тут происходит -->
  <button
    :class="[$style.button, $style[variant], { [$style.disabled]: disabled }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    disabled: false,
  }
);
</script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 114px;
  height: 36px;
  min-height: 36px;
  max-height: 36px;
  padding: 0 12px;
  gap: 4px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0;
  opacity: 1;
  cursor: pointer;

  &:disabled,
  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.button.primary {
  font-weight: 700;
  background: $background-primary-btn;
  color: $text-contrast;
  border: none;

  &:not(:disabled):hover {
    background: $brand-dark;
  }
}

.button.secondary {
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  line-height: 20px;
  background-color: transparent;
  color: $text-primary;
  border: 1px solid $border-light;

  &:not(:disabled):hover {
    background-color: $background-secondary;
    border-color: $border-brand;
  }

  &:disabled,
  &.disabled {
    border-color: $border-light;
    color: $text-disabled;
  }
}
</style>
