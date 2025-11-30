<template>
  <div :class="$style.tableWrapper">
    <table :class="$style.table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="`header-${index}`"
            :class="$style.th"
          >
            <slot :name="`header-${index}`" :header="header">
              {{ typeof header === "string" ? header : "" }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="`row-${rowIndex}`"
          :class="$style.tr"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="`cell-${rowIndex}-${cellIndex}`"
            :class="$style.td"
          >
            <slot
              :name="`cell-${cellIndex}`"
              :cell="cell"
              :row="row"
              :rowIndex="rowIndex"
              :cellIndex="cellIndex"
            >
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    headers: (string | Record<string, any>)[];
    rows: any[][];
  }>(),
  {
    headers: () => [],
    rows: () => [],
  }
);
</script>

<style lang="scss" module>
@use "@/shared/styles/vars" as *;

.tableWrapper {
  border: 1px solid $stroke-border;
  border-radius: 12px;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: none;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0;
}

.th {
  background-color: $background-primary;
  color: $text-tertiary;
  font-weight: 700;
  text-align: left;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid $stroke-border;
}

.td {
  padding: 12px 16px;
  vertical-align: top;
  border: none;
  border-bottom: 1px solid $border-light;
}

.tr:last-child .td {
  border-bottom: none;
}
</style>
