<template>
  <div
    class="w-8 h-8 p-1 flex justify-center items-center text-white empty-area"
  >
    <div v-if="action === ACTIONS.RUN">+</div>
    <div v-else class="w-0.5 h-0.5 bg-white"></div>
  </div>
</template>

<script setup lang="ts">
import { ACTIONS } from "../utils";

// Import vue -> external -> component -> dev -> local (alphabet) -> @types

defineOptions({
  name: "EmptyArea",
});

// Emits

// Props
defineProps<{
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
.empty-area:hover {
  background-color: red;
}
</style>
