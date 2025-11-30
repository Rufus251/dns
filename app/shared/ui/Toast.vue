<template>
  <div
    v-if="isVisible"
    role="alert"
    aria-live="polite"
    :class="[$style.toast, $style[type], { [$style.hiding]: isHiding }]"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type {
  ToastType,
} from "@/shared/lib/toast/toast.interface";

const props = withDefaults(
  defineProps<{
    text: string;
    type?: ToastType;
    duration?: number;
  }>(),
  {
    type: "info",
    duration: 5000,
  }
);

const isVisible = ref(true);
const isHiding = ref(false);

const startHide = () => {
  isHiding.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, 400);
};

onMounted(() => {
  const timer = setTimeout(startHide, props.duration);
  onUnmounted(() => clearTimeout(timer));
});
</script>

<style lang="scss" module>
@use '@/shared/styles/vars' as *;
.toast {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 10100;
  margin: 0;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 320px;
  word-wrap: break-word;
  pointer-events: auto;
  animation: fadeIn 0.2s ease-out;

  &.info { background-color: $toast-success; }
  &.warning { background-color: $toast-warning; }
  &.error { background-color: $toast-error; }

  &.hiding {
    animation: fadeOut 0.2s ease-in forwards;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}
</style>
