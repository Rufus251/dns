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

      <ApplicationEdit
        v-if="!pending"
        :initial-products="resolvedProducts"
        :application-id="applicationId"
        @save="onSave"
      />
      <Loader v-else />
    </Container>
  </div>
</template>

<script setup lang="ts">
import { fetchApplicationProducts } from "@/features/application/application-edit/api";
import ApplicationEdit from "@/widgets/application-edit/ApplicationEdit.vue";
import Loader from "@/shared/ui/Loader.vue";
import Container from "@/shared/ui/Container.vue";


const route = useRoute();
const applicationId = Number(route.query.id);
if (isNaN(applicationId) || applicationId <= 0) {
  throw createError({ statusCode: 400, message: "Invalid application ID" });
}

const { data: products, pending, error } = await useAsyncData(
  `application-products-${applicationId}`,
  () => fetchApplicationProducts(),
  {
    default: () => [],
  }
);
const resolvedProducts = error.value ? [] : products.value ?? [];

const onSave = () => navigateTo("/");
const backToList = () => navigateTo("/");
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