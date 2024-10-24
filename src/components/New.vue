<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex-1">
      <el-card style="max-width: 480px" class="m-auto">
        <template #header>
          <div class="card-header">
            <span>Join</span>
          </div>
        </template>
        <div class="flex flex-col justify-center items-center">
          <el-input
            v-model="form.name"
            placeholder="Name"
            clearable
            size="small"
            class="mb-2 !w-[240px]"
          />
          <el-input
            v-model="form.room"
            placeholder="Room"
            clearable
            size="small"
            class="mb-2 !w-[240px]"
          />
          <el-input
            v-model="form.password"
            placeholder="Password"
            clearable
            size="small"
            class="mb-2 !w-[240px]"
          />
          <div class="flex justify-center">
            <el-button type="primary" @click="goTo('/game')">Start</el-button>
            <el-button @click="handleJoin">Test</el-button>
          </div>
        </div>
        <template #footer>Footer content</template>
      </el-card>
    </div>
    <div class="flex justify-end">
      <el-button type="primary" @click="goTo('/')">Home</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import vue -> external -> component -> dev -> local (alphabet) -> @types
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createNewGame, getRoom, joinRoom, writeUserData } from "../firebase";

defineOptions({
  name: "New",
});

// Emits

// Props

// Constants

// Stores

// Composables
const router = useRouter();

// Refs
const form = ref({
  name: "",
  room: "",
  password: "",
});

// Computed

// Reactive

// Watch

// Hooks

// Functions
const goTo = (path: string) => {
  router.push(path);
};

const handleJoin = async () => {
  // new id v4
  const id = Math.random().toString(36).substring(7);
  await writeUserData(id, form.value.name, form.value.room);
  localStorage.setItem("ltv-g-u-id", id);
  const room = await getRoom(form.value.room);
  let locations: string[] = [];
  if (room) {
    locations = Object.keys(room).map((key) => `${room[key].x}-${room[key].y}`);
  } else {
    await createNewGame(form.value.room);
  }
  const newLocation = getNewLocation(locations);
  await joinRoom(form.value.room, {
    id,
    name: form.value.name,
    location: newLocation,
  });
  goTo("/test");
};

const getNewLocation = (locations: string[]) => {
  let newLocation = `${Math.floor(Math.random() * 10) + 1}-${
    Math.floor(Math.random() * 10) + 1
  }`;
  while (locations.includes(newLocation)) {
    newLocation = `${Math.floor(Math.random() * 10)}-${Math.floor(
      Math.random() * 10
    )}`;
  }
  return newLocation;
};
// Expose
</script>

<style lang="scss" scoped></style>
