<template>
  <div :class="$style.wrapper">
    <div
      :class="$style.inner"
      :style="{ '--table-column-count': Math.max(1, headers.length) }"
    >
      <div :class="$style.headerRow">
        <div
          v-for="(header, index) in headers"
          :key="`header-${index}`"
          :class="$style.headerCell"
        >
          <slot :name="`header-${index}`" :header="header">
            {{ typeof header === "string" ? header : "" }}
          </slot>
        </div>
      </div>

      <div :class="$style.body">
        <div
          v-for="(row, rowIndex) in rows"
          :key="`row-${rowIndex}`"
          :class="[
            $style.dataRow,
            { [$style.lastRow]: rowIndex === rows.length - 1 },
          ]"
        >
          <div
            v-for="(cell, cellIndex) in row"
            :key="`cell-${rowIndex}-${cellIndex}`"
            :class="$style.dataCell"
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
          </div>
        </div>
      </div>
    </div>
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

.wrapper {
  width: 100%;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0;
  box-sizing: border-box;
}

.inner {
  border: 1px solid $stroke-border;
  border-radius: 12px;
}

.headerRow {
  display: grid;
  grid-template-columns: repeat(var(--table-column-count, 1), 1fr);
  width: 100%;
  align-items: stretch;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.body:empty {
  display: none;
}

.body {
  display: flex;
  flex-direction: column;
}

.dataRow {
  display: grid;
  grid-template-columns: repeat(var(--table-column-count, 1), 1fr);
  width: 100%;
  align-items: stretch;
}

.headerCell,
.dataCell {
  display: flex;
  align-items: center;
  padding: 20px;
}

.headerCell {
  color: $text-tertiary;
  font-weight: 700;
  text-align: left;
  padding: 16px 20px;
  border-bottom: 1px solid $stroke-border;
  background-color: $background-primary;
}

.dataCell {
  padding: 20px;
  border-bottom: 1px solid $border-light;
}

.lastRow .dataCell {
  border-bottom: none;
}

.inner:has(.body:empty) .headerRow,
.inner:not(:has(.body > *)) .headerRow {
  border-radius: 12px;
}
</style>
