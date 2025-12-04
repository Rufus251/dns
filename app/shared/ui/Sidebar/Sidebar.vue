<template>
  <!-- Нейронка наговнокодила, по времени успел только поправить до рабочего состояния :) -->
  <aside :class="[$style.sidebar, { [$style.sidebarExpanded]: isExpanded }]">
    <button
      :class="$style.toggleButton"
      @click="toggle"
      aria-label="Toggle sidebar"
    >
      <img :src="arrowIcon" :class="$style.toggleIcon" alt="" />
    </button>

    <nav :class="$style.menu">
      <SidebarItem
        v-for="item in items"
        :key="item.id"
        :active="item.id === modelValue"
        :expanded="isExpanded"
        :icon="item.icon"
        :text="item.text"
        @click="() => onSelect(item.id)"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import arrowIcon from "@/assets/arrow-up.svg";
import SidebarItem from "./SidebarItem.vue";
import type { SidebarItem as SidebarItemType } from "./types";

const props = defineProps<{
  modelValue?: string | number;
  items: SidebarItemType[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", id: string | number): void;
}>();

const isExpanded = ref(true);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

const onSelect = (id: string | number) => {
  emit("update:modelValue", id);
};
</script>

<style module lang="scss">
@use "@/shared/styles/vars" as *;

.sidebar {
  flex-shrink: 0;
  width: 68px;
  height: 100%;
  background-color: $background-secondary;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  transition: width 0.5s ease;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 0 2px 0 #0000001a;
  white-space: nowrap;
}

.sidebarExpanded {
  width: 280px;
}

.toggleButton {
  width: 36px;
  height: 36px;
  background: $background-primary;
  border: none;
  border-radius: 8px;
  margin-left: auto;
  margin-right: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.toggleIcon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: rotate(90deg);
}

.sidebarExpanded .toggleIcon {
  transform: rotate(-90deg);
}

.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
</style>
