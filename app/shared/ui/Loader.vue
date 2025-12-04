<template>
  <div :class="$style.loader" />
</template>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.loader {
  width: 20px;
  height: 20px;
  border: 3px dashed $border-brand;
  border-radius: 50%;

  animation: 1s linear 0s normal none infinite running rot;
  -webkit-animation: 1s linear 0s normal none infinite running rot;
}
@keyframes rot {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
