<template>
  <button
    :class="[
      $style.button,
      { [$style.active]: active },
      { [$style.buttonExpanded]: !expanded },
    ]"
    @click="$emit('click')"
  >
    <div
      :class="[
        $style.imgContainer,
        { [$style.imgContainerExpanded]: !expanded },
      ]"
    >
      <img :src="icon" :class="$style.icon" alt="" />
    </div>
    <p :class="[$style.label, { [$style.labelExpanded]: !expanded }]">
      {{ text }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  expanded: boolean;
  icon: string;
  text: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style module lang="scss">
@use "@/shared/styles/vars" as *;

.button {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  border-radius: 0;
  transition: padding 0.5s ease;
}

.button::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: transparent;
}

.button.active::before {
  background: $border-brand;
}

.buttonExpanded {
  padding: 0 18px;
}

.imgContainer {
  padding: 8px;
  border-radius: 8px;
  background-color: $background-secondary;

  transition: 0.5s ease;
}

.imgContainerExpanded {
  background-color: $background-date-range;
}

.icon {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border-radius: 4px;
  background: $background-secondary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.label {
  margin-left: 16px;
  color: $text-brand;
  white-space: nowrap;
  color: $text-tertiary;
  transition: margin-left 0.5s ease;
}

.labelExpanded {
  margin-left: 100px;
}

.button.active .label {
  color: $text-brand;
}
</style>
