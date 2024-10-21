<template>
  <el-tooltip :content="name" placement="top">
    <div
      class="flex flex-col w-8 h-8 m-1 enemy-area border rounded-md"
      style="background-color: #4a6997"
      :class="{ 'enemy-shoot-area': action === ACTIONS.SHOOT }"
    ></div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ACTIONS } from "../utils";

// Import vue -> external -> component -> dev -> local (alphabet) -> @types

defineOptions({
  name: "Enemy",
});

// Emits

// Props
defineProps<{
  name: string;
  action: string;
}>();

// Constants

// Stores

// Composables

// Refs

// Computed

// Reactive

// Watch

// Hooks

// Functions

// Expose
</script>

<style lang="css" scoped>
.enemy-area:hover {
  border-radius: 12px;
}
.enemy-shoot-area:hover {
  background-color: red !important;
  border-radius: 22px;
}
</style>
