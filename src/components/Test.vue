<template>
  <div class="flex flex-col" style="background-color: #101828">
    <div class="flex justify-center pt-3">
      <Grid
        :height="gridHeight"
        :width="gridWidth"
        :enemys="enemys"
        :location="user?.location"
        :action="action"
      />
    </div>
    <div class="flex flex-col justify-center items-center p-3">
      <div v-if="action === ACTIONS.READY" class="flex">
        <el-button @click="handleClickRun">Chạy</el-button>
        <el-button @click="handleClickShoot">Bắn</el-button>
      </div>
      <el-button v-else @click="action = ACTIONS.READY">trở lại</el-button>
      <div class="p-2 text-white">Player: {{ user?.username }}</div>
      <div class="p-2 text-white">Kills: 0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Grid from "./Grid.vue";
import { ACTIONS } from "../utils";
import { useLtvGameStore } from "../stores";

// Import vue -> external -> component -> dev -> local (alphabet) -> @types

defineOptions({
  name: "Test",
});

// Emits

// Props

// Constants

// Stores
const ltvGameStore = useLtvGameStore();

// Composables

// Refs
const gridWidth = ref(10);
const gridHeight = ref(10);

const action = ref(ACTIONS.READY);

// Computed
const user = computed(() => {
  return {
    id: ltvGameStore.user.id,
    ...ltvGameStore.rooms[ltvGameStore.user.id],
  };
});
const enemys = computed(() => {
  return Object.keys(ltvGameStore.rooms)
    .filter((id) => id !== user.value?.room)
    .map((key) => {
      return {
        id: key,
        name: ltvGameStore.rooms[key].name,
        location: ltvGameStore.rooms[key].location,
      };
    });
});

// Reactive

// Watch

// Hooks
onMounted(() => {
  ltvGameStore.setUser();
});

// Functions
const handleClickShoot = () => {
  action.value = ACTIONS.SHOOT;
};

const handleClickRun = () => {
  action.value = ACTIONS.RUN;
};

// Expose
</script>

<style lang="scss" scoped></style>
