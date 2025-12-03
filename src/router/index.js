import { createRouter, createWebHistory } from "vue-router";
import SpotDetail from "@/components/SpotDetail.vue";
import SpotCatalog from "@/components/SpotCatalog.vue";

const router = createRouter({
  history: createWebHistory("/frontend-spotly/"), 
  routes: [
    {
      path: "/",
      name: "home",
      component: SpotCatalog,
    },
    {
      path: "/spot/:id",
      name: "spot-detail",
      component: SpotDetail,
      props: true,
    }
    
  ]
});

export default router;
