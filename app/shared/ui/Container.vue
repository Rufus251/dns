<template>
  <div class="container">
    <h2><slot name="header"></slot></h2>
    <div><slot></slot></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.container {
  background-color: $background-secondary;
  border-radius: 16px;

  h2 {
    font-weight: 700;
    font-style: Bold;
    font-size: 24px;
    line-height: 130%;
    letter-spacing: 0%;
  }
}
</style>
