<template>
  <div :class="$style.wrapper">
    <Container>
      <template #header>
        <div :class="$style.container__header">
          <img
            :class="$style.container__header_back"
            src="@/assets/back.svg"
            alt="back"
            @click="backToList"
          />
          <h1>Товары</h1>
        </div>
      </template>
      <Suspense>
        <template #default>
          <ApplicationEdit :applicationId="applicationId" @save="onSave" />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </Container>
  </div>
</template>

<script setup lang="ts">
import ApplicationEdit from "@/widgets/application-edit/ApplicationEdit.vue";
import Loader from "@/shared/ui/Loader.vue";

import Container from "@/shared/ui/Container.vue";

const route = useRoute();
const applicationId = Number(route.query.id);
if (isNaN(applicationId) || applicationId <= 0) {
  throw new Error("Invalid application ID");
}

function onSave() {
  navigateTo("/");
}
function backToList() {
  navigateTo("/");
}
</script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.wrapper {
  width: 100%;
  height: 100vh;
  background-color: $background-primary;
  padding: 24px;

  display: flex;
  gap: 12px;
}

.container__header {
  display: flex;
  align-items: center;
  gap: 12px;

  &_back {
    cursor: pointer;
  }
}
</style>
