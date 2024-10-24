<template>
  <div class="flex flex-col h-screen" style="background-color: #101828">
    <div class="flex justify-center pt-3 h-[350px]">
      <div
        class="static flex justify-center items-center text-9xl"
        :class="game.time <= 5 ? 'text-red-600' : ''"
      >
        {{ game.time }}
      </div>
      <Grid
        class="absolute"
        :height="gridHeight"
        :width="gridWidth"
        :enemys="enemys"
        :location="user?.location"
        :action="action"
        :area="game.area"
        @shoot="handleActionShoot"
        @run="handleActionRun"
      />
    </div>
    <div
      v-if="game.status === 'playing'"
      class="flex flex-col justify-center items-center p-3"
    >
      <div v-if="action === ACTIONS.WAIT" class="flex text-white">Wait..</div>
      <div v-else-if="action === ACTIONS.READY" class="flex">
        <el-button @click="handleClickRun">Chạy</el-button>
        <el-button @click="handleClickShoot">Bắn</el-button>
      </div>
      <el-button v-else @click="action = ACTIONS.READY">trở lại</el-button>
      <div class="p-2 text-white">Player: {{ user?.name }}</div>
      <div class="p-2 text-white">Kills: 0</div>
    </div>
    <div v-else class="flex flex-col justify-center items-center p-3">
      <div class="p-2 text-white">Waiting..</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import Grid from "./Grid.vue";
import { ACTIONS } from "../utils";
import { useLtvGameStore } from "../stores";
import { actionStep } from "../firebase";
import { ElNotification } from "element-plus";

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
    name: ltvGameStore.user.name,
    room: ltvGameStore.user.room,
    ...ltvGameStore.rooms[ltvGameStore.user.id],
  };
});
const enemys = computed(() => {
  return Object.keys(ltvGameStore.rooms)
    .filter((id) => id !== user.value?.room)
    .map((key) => {
      return {
        ...ltvGameStore.rooms[key],
        id: key,
      };
    });
});

const game = computed(() => {
  return ltvGameStore.game;
});

// Reactive

// Watch
watch(
  () => user.value,
  (value) => {
    if (value.live !== undefined && !value.live) {
      ElNotification.error({
        title: "Game Over",
        message: "You are dead",
        position: "top-left",
      });
      return;
    }
  }
);

watch(
  () => game.value,
  (value) => {
    if (value.status === "end" && user.value.live) {
      ElNotification.success({
        title: "Game Over",
        message: "You are win",
        position: "top-left",
      });
    }
  }
);

watch(
  () => game.value.step,
  () => {
    action.value = ACTIONS.READY;
  }
);

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

const handleActionShoot = (lo: string) => {
  actionStep(user.value.room, {
    ...user.value,
    shoot: lo,
    run: "",
  });
  action.value = ACTIONS.WAIT;
};

const handleActionRun = (lo: string) => {
  actionStep(user.value.room, {
    ...user.value,
    shoot: "",
    run: lo,
  });
  action.value = ACTIONS.WAIT;
};

// Expose
</script>

<style lang="scss" scoped></style>
