<template>
  <div class="h-full w-full">
    <el-card style="max-width: 480px" class="m-auto">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <div class="flex justify-center">
        <el-button type="primary" @click="goTo('/new')">New</el-button>
        <el-button @click="goTo('/join')">Join</el-button>
      </div>
      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// Import vue -> external -> component -> dev -> local (alphabet) -> @types
import { useRouter } from "vue-router";

defineOptions({
  name: "Home",
});

// Emits

// Props

// Constants

// Stores

// Composables
const router = useRouter();

// Refs

// Computed

// Reactive

// Watch

// Hooks

// Functions
const goTo = (path: string) => {
  router.push(path);
};

// Expose
</script>

<style lang="scss" scoped></style>
