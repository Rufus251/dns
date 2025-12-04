<template>
  <!-- 
   Жесть вы хитрые, border-collapse не работает с border-radius, у меня нет времени перевёрстывать на grid
   Ведь ещё и всплывашки в селекте добавили чтобы overflow:hidden всё ложил 
   Сделал второй компонент TableGrid на дивах с grid, но он по семантике не подходит для табличных данных
   Этот оставил так, с бордер коллапс и без скруглений
   -->
   <!-- А ещё узнал от коллеги что можно через portal телепортнуть наверх поле селекта и тогда пофиг на overflow будет, но уже поздно -->
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

.table {
  box-sizing: border-box;
  border: 1px solid $stroke-border;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0;
}

.th {
  background-color: $background-primary;
  color: $text-tertiary;
  font-weight: 700;
  text-align: left;
  padding: 16px 20px;
  border: none;
  border-bottom: 1px solid $stroke-border;
}

.td {
  padding: 20px;
  border-bottom: 1px solid $border-light;
}

.tr:last-child .td {
  border-bottom: none;
}
</style>
