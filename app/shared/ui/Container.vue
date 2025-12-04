<template>
  <div :class="$style.container">
    <h2 :class="$style.containerHeader"><slot name="header"></slot></h2>
    <div :class="$style.containerBody"><slot></slot></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.container {
  width: 100%;
  height: 100%;

  background-color: $background-secondary;
  border-radius: 16px;

  .containerHeader {
    font-weight: 700;
    font-style: Bold;
    font-size: 24px;
    line-height: 130%;
    letter-spacing: 0%;

    padding: 16px 24px;

    border-bottom: 1px solid $border-light;
  }
  .containerBody {
    padding: 24px;
    height: calc(100% - 65px);
  }
}
</style>
