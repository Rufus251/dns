<template>
  <div style="padding: 12px; display: flex; flex-direction: column; gap: 12px">
    <div>
      <h2>Buttons</h2>
      <Button @click="handleClick">Сохранить</Button>
      <Button disabled @click="handleClick">Редактировать</Button>
      <Button variant="secondary" @click="handleClick">Отправить</Button>
      <Button variant="secondary" disabled @click="handleClick"
        >Какой-то текст</Button
      >
    </div>
    <div>
      <h2>Input</h2>
      <Input v-model="searchQuery" placeholder="Введите название товара..." />
    </div>
    <div>
      <h2>Select</h2>
      <Select
        v-model="selectedColor"
        :options="colorOptions"
        placeholder="Выберите цвет"
      />
    </div>
    <div>
      <h2>Table</h2>
      <Table :headers="headers" :rows="rows">
        <template #header-2>
          <span>Статус11</span>
        </template>

        <template #cell-3="{ row }">
          <Button> {{ row[3] }} </Button>
          <Button> {{ row[3] }} </Button>
        </template>
      </Table>
    </div>
    <div>
      <h2>sidebar</h2>
      <Sidebar v-model="activeTab" :items="sidebarItems" @toggle="onToggle" />
    </div>
    <div>
      <h2>application list widget</h2>
      <ApplicationList />
    </div>
    <div>
      <h2>application edit widget</h2>
      <ApplicationEdit :application-id="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/shared/lib/toast/useToast";
import Button from "~/shared/ui/Button.vue";
import Input from "@/shared/ui/Input.vue";
import Select from "@/shared/ui/Select.vue";
import Table from "@/shared/ui/Table.vue";
import Sidebar from '@/shared/ui/Sidebar/Sidebar.vue';
import ApplicationList from "~/widgets/application-list/ApplicationList.vue";
import ApplicationEdit from "~/widgets/application-edit/ApplicationEdit.vue";
import type { SidebarItem } from "~/shared/ui/Sidebar/types";

import SidebarIcon from "@/assets/sidebar-icon.svg";

// Button
const { showError } = useToast();

const handleClick = () => {
  showError("Какая-то ошибка при клике на кнопку...");
};

// Search
const searchQuery = ref("");

// Select
const selectedColor = ref<string | null>(null);

const colorOptions = [
  { value: "red", label: "Красный" },
  { value: "green", label: "Зелёный" },
  { value: "blue", label: "Синий" },
];

// Sidebar
const sidebarItems: SidebarItem[] = [
  { id: "applications", icon: SidebarIcon, text: "Заявки" },
  { id: "analytics", icon: SidebarIcon, text: "Аналитика" },
  { id: "settings", icon: SidebarIcon, text: "Настройки" },
];

const activeTab = ref("applications");

const onToggle = (expanded: boolean) => {
  console.log("Sidebar toggled:", expanded);
};

// Table
const headers = ["Номер", "Создано", "Статус", "Действие", "test"];
const rows = [
  [1, "2025-03-10", "Черновик", "1", "123"],
  [2, "2025-03-11", "Проверка", "1", "123"],
];
</script>
