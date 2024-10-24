<template>
  <div class="m-1 border">
    <div v-for="i in height" class="flex" :key="i">
      <div v-for="j in width" :key="`${i}-${j}`">
        <div :class="getClassArea(i, j)">
          <Card
            v-if="location === `${j}-${i}`"
            @click="handleClickLocation(`${j}-${i}`, AREA_TYPES.MY_LOCATION)"
          />

          <div
            v-else-if="enemys.some((enemy) => enemy.location === `${j}-${i}`)"
          >
            <Enemy
              v-if="action === ACTIONS.READY"
              :action="action"
              :name="
                enemys.find((enemy) => enemy.location === `${j}-${i}`)?.name ||
                ''
              "
            />
            <el-popconfirm
              v-else
              :title="
                action === ACTIONS.RUN
                  ? 'Bạn muốn chạy đến vị trí của ' +
                    enemys.find((enemy) => enemy.location === `${j}-${i}`)
                      ?.name +
                    ' ?'
                  : 'Bạn muốn nã đạn vào ' +
                    enemys.find((enemy) => enemy.location === `${j}-${i}`)
                      ?.name +
                    ' ?'
              "
              @confirm="
                handleClickLocation(`${j}-${i}`, AREA_TYPES.ENEMY_LOCATION)
              "
            >
              <template #reference>
                <Enemy
                  :action="action"
                  :name="
                    enemys.find((enemy) => enemy.location === `${j}-${i}`)
                      ?.name || ''
                  "
                />
              </template>
            </el-popconfirm>
          </div>
          <div v-else>
            <EmptyArea v-if="action === ACTIONS.READY" :action="action" />
            <el-popconfirm
              v-else
              :title="
                action === ACTIONS.RUN
                  ? 'Bạn muốn di chuyển đến ô này?'
                  : 'Bạn muốn nã đạn vào ô này?'
              "
              @confirm="handleClickLocation(`${j}-${i}`, AREA_TYPES.EMPTY_AREA)"
              ><template #reference><EmptyArea :action="action" /></template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import vue -> external -> component -> dev -> local (alphabet) -> @types
import { ACTIONS, Player } from "../utils";
import Card from "./Card.vue";
import EmptyArea from "./EmptyArea.vue";
import Enemy from "./Enemy.vue";

defineOptions({
  name: "Grid",
});

// Emits
const emit = defineEmits(["shoot", "run"]);

// Props
const props = defineProps<{
  width: number;
  height: number;
  location?: string;
  enemys: Player[];
  action: string;
  area: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
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
  if (props.action === ACTIONS.SHOOT) {
    console.log("Shoot to", location);
    emit("shoot", location);
  }
  if (props.action === ACTIONS.RUN && area === AREA_TYPES.EMPTY_AREA) {
    console.log("Run to", location);
    emit("run", location);
  }
};

const getClassArea = (i: number, j: number) => {
  if (!props.area) {
    return "";
  }
  if (
    i < props.area.y ||
    i > props.area.h ||
    j < props.area.x ||
    j > props.area.w
  ) {
    return "bg-red-500";
  }

  let newClass = "";
  //   if (i === area.y && i <= area.w && j >= area.x && j <= area.w) {
  //     newClass += " border-t";
  //   }
  //   if (i === area.h && i >= area.x && j >= area.x && j <= area.w) {
  //     newClass += " border-b";
  //   }
  //   if (j === area.x && i >= area.y && i <= area.h && j <= area.h) {
  //     newClass += " border-l";
  //   }
  //   if (j === area.w && i >= area.y && i <= area.h && j >= area.y) {
  //     newClass += " border-r";
  //   }
  return newClass;
};

// Expose
</script>

<style lang="scss" scoped></style>
