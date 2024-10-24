<template>
  <div class="flex flex-col h-screen" style="background-color: #101828">
    <div class="flex justify-center pt-3 h-[350px]">
      <div
        class="static flex justify-center items-center text-9xl"
        :class="countdown <= 5 ? 'text-red-600' : ''"
      >
        {{ countdown }}
      </div>
      <Grid
        class="absolute"
        :height="gridHeight"
        :width="gridWidth"
        :enemys="enemys"
        :action="action"
        :area="game?.area"
      />
    </div>
    <div class="flex flex-col justify-center items-center p-3">
      <div v-if="game?.status === 'waiting'" class="flex">
        <el-button @click="handleClickStart">Bắt đầu</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Grid from "./Grid.vue";
import { ACTIONS } from "../utils";
import { useLtvGameStore } from "../stores";
import { useRoute } from "vue-router";
import { updateGame, updateRoom } from "../firebase";

// Import vue -> external -> component -> dev -> local (alphabet) -> @types

defineOptions({
  name: "Test",
});

// Stores
const ltvGameStore = useLtvGameStore();

// Composables
const route = useRoute();

// Refs
const gridWidth = ref(10);
const gridHeight = ref(10);
const room = ref("");
const liveInterval = ref<NodeJS.Timeout | null>(null);
const secondInterval = ref<NodeJS.Timeout | null>(null); // Second interval ref
const action = ref(ACTIONS.READY);

// Time tracking refs
const intervalStartTime = ref<number>(0);
const countdown = ref<number>(15); // Countdown from 15 seconds

// Computed
const enemys = computed(() => {
  return Object.keys(ltvGameStore.rooms).map((key) => {
    return {
      ...ltvGameStore.rooms[key],
      id: key,
    };
  });
});

const game = computed(() => {
  return ltvGameStore.game;
});

// Hooks
onMounted(() => {
  room.value = route.query.room as string;
  ltvGameStore.setLtvGame(room.value);
});

// Functions

const handleClickStart = () => {
  let step = 0;
  let status = "playing";
  intervalStartTime.value = Date.now(); // Record the start time

  updateGame(room.value, {
    status,
    step,
    area: {
      x: 1,
      y: 1,
      w: 10,
      h: 10,
    },
  });

  // Start the main interval
  liveInterval.value = setInterval(() => {
    if (step === 50) {
      clearInterval(liveInterval.value as NodeJS.Timeout);
      clearInterval(secondInterval.value as NodeJS.Timeout);
      return;
    }
    console.log("Step", step);
    const res = logicGame();
    updateRoom(room.value, res.newEnemysObj);
    updateGame(room.value, {
      status: res.status,
      step: step++,
      time: countdown.value,
      area: {
        x: 1,
        y: 1,
        w: 10,
        h: 10,
      },
    });
    if (res.status === "end") {
      clearInterval(liveInterval.value as NodeJS.Timeout);
      clearInterval(secondInterval.value as NodeJS.Timeout);
    }
  }, 15000);

  // Start the second interval
  secondInterval.value = setInterval(() => {
    if (countdown.value === 0) {
      countdown.value = 15;
      return;
    }
    countdown.value--;
  }, 1000);
};

const logicGame = () => {
  let status = "playing";
  const newEnemys = enemys.value
    .filter(
      (enemy) =>
        !enemys.value.some((e) => {
          if (enemy.run !== "") {
            return e.shoot === enemy.run;
          }
          if (enemy.location === e.shoot) {
            return true;
          }
          return false;
        })
    )
    .map((e) => e.id);
  const newEnemysObj = enemys.value.reduce((acc, cur) => {
    if (newEnemys.includes(cur.id)) {
      acc[cur.id] = {
        ...cur,
        location: cur.run ? cur.run : cur.location,
        shoot: "",
        run: "",
        oldLocation: cur.location,
        live: true,
        shield: false,
        energy: 0,
      };
      return acc;
    }
    acc[cur.id] = {
      ...cur,
      location: "",
      shoot: "",
      run: "",
      oldLocation: "",
      live: false,
      shield: false,
      energy: 0,
    };
    return acc;
  }, {});
  if (newEnemys.length === 1) {
    status = "end";
    clearInterval(liveInterval.value as NodeJS.Timeout);
    clearInterval(secondInterval.value as NodeJS.Timeout);
  }
  return {
    status,
    newEnemysObj,
  };
};
</script>
