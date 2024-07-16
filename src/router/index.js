import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index.js";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/QuestCenter",
    name: "QuestCenter",
    component: () => import("../views/QuestCenterView.vue"),
  },
  {
    path: "/QuestCenter/:id",
    name: "QuestCenterId",
    component: () => import("../views/QuestMoreInfoView.vue"),
  },
  {
    path: "/Battlefield",
    name: "Battlefield",
    component: () => import("../views/BattlefieldView.vue"),
  },
  {
    path: "/Attendance/:uid",
    name: "Attendance",
    component: () => import("../views/AttendanceView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/QuestSubmission/:uid",
    name: "QuestSubmission",
    component: () => import("../views/QuestSubmissionView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/MyQuest",
    name: "MyQuest",
    component: () => import("../views/MyQuestView.vue"),
  },
  {
    path: "/QRCode",
    name: "QRCode",
    component: () => import("../views/QRCodeView.vue"),
  },
  {
    path: "/AddQuest",
    name: "AddQuest",
    component: () => import("../views/AddQuestView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/AddTeam",
    name: "AddTeam",
    component: () => import("../views/AddTeamView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/AssignPlayers",
    name: "AssignPlayers",
    component: () => import("../views/AssignPlayersToTeamsView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/Leaderboard",
    name: "Leaderboard",
    component: () => import("../views/LeaderboardView.vue"),
    // meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = store.state.user; // Get the user object from the state
  const isAuthenticated = user !== null; // Check if the user is authenticated
  const isAdmin = user && user.role === 'ADMIN'; // Check if the user has the admin role

  if (to.matched.some((record) => record.meta.requiresAuth) && (!isAuthenticated || !isAdmin))  {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});
export default router;
