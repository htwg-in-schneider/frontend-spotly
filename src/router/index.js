import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/components/HomeView.vue";
import SpotDetailView from "@/components/SpotDetailView.vue";

const router = createRouter({
  history: createWebHistory("/frontend-spotly/"), 
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/spot/:id",
      name: "spot-detail",
      component: SpotDetailView,
      props: true,
    }
  ]
});

export default router;
