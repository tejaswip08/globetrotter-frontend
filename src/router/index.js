import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "FirstPage",
    component: () => import("@/views/MainPages/FirstPage.vue"),
  },
  {
    path: "/play-quiz",
    name: "GamePage",
    component: () => import("@/views/ChildPages/GamePage.vue"),
  },
  {
    path: "/score-card",
    name: "ScoreCardPage",
    component: () => import("@/views/ChildPages/ScoreCard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
