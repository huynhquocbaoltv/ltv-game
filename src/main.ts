import { createApp } from "vue";
import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { createPersistedState } from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import Home from "./components/Home.vue";
import New from "./components/New.vue";
import Join from "./components/Join.vue";
import Game from "./components/Game.vue";
import Test from "./components/Test.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
    },
    {
      path: "/new",
      component: New,
      name: "new",
    },
    {
      path: "/join",
      component: Join,
      name: "join",
    },
    {
      path: "/game",
      component: Game,
      name: "game",
    },
    {
      path: "/test",
      component: Test,
      name: "test",
    },
  ],
});

const pinia = createPinia();
pinia.use(createPersistedState());

createApp(App).use(ElementPlus).use(pinia).use(router).mount("#app");
