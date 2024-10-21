<template>
  <div class="p-1 w-[420px]">
    <div v-for="i in height" class="flex" :key="i">
      <div v-for="j in width" :key="`${i}-${j}`">
        <Card
          v-if="location === `${j}-${i}`"
          @click="handleClickLocation(`${j}-${i}`, AREA_TYPES.MY_LOCATION)"
        />
        <Enemy
          v-else-if="enemys.some((enemy) => enemy.location === `${j}-${i}`)"
          :action="action"
          :name="
            enemys.find((enemy) => enemy.location === `${j}-${i}`)?.name || ''
          "
          @click="handleClickLocation(`${j}-${i}`, AREA_TYPES.ENEMY_LOCATION)"
        />
        <EmptyArea
          :action="action"
          v-else
          @click="handleClickLocation(`${j}-${i}`, AREA_TYPES.EMPTY_AREA)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import vue -> external -> component -> dev -> local (alphabet) -> @types
import { Player } from "../utils";
import Card from "./Card.vue";
import EmptyArea from "./EmptyArea.vue";
import Enemy from "./Enemy.vue";

defineOptions({
  name: "Grid",
});

// Emits

// Props
defineProps<{
  width: number;
  height: number;
  location: string;
  enemys: Player[];
  action: string;
}>();

// Constants
const AREA_TYPES = {
  MY_LOCATION: "MyLocation",
  ENEMY_LOCATION: "EnemyLocation",
  EMPTY_AREA: "EmptyArea",
};

// Stores

// Composables

// Refs

// Computed

// Reactive

// Watch

// Hooks

// Functions
const handleClickLocation = (location: string, area: string) => {
  console.log(location, area);
};

// Expose
</script>

<style lang="scss" scoped></style>
