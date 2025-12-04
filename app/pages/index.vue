<template>
  <!-- 
   Решил не делать async на главной, тк состояние кнопки зависит от наличия данных в локал сторадже
   Можно конечно сделать проверку на клиенте, но тогда будет мигать кнопка при загрузке страницы, это надо будет фиксить и я даже знаю как, но времени нет.
   Поэтому проще оставить синхронный рендеринг 
  -->
  <div :class="$style.wrapper">
    <Sidebar v-model="activeTab" :items="sidebarItems" />
    <Container>
      <template #header> Заявки </template>

      <ApplicationList @change="onEdit" />
    </Container>
  </div>
</template>

<script setup lang="ts">
// Sidebar
import Sidebar from "@/shared/ui/Sidebar/Sidebar.vue";
import SidebarIcon from "@/assets/sidebar-icon.svg";
import type { SidebarItem } from "~/shared/ui/Sidebar/types";

// Container
import Container from "@/shared/ui/Container.vue";

// Application list
import ApplicationList from "@/widgets/application-list/ApplicationList.vue";

const sidebarItems: SidebarItem[] = [
  { id: "applications", icon: SidebarIcon, text: "Заявки" },
];
const activeTab = ref("applications");

function onEdit(id: number) {
  console.log(id);
  navigateTo(`/edit?id=${id}`);
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
</style>
