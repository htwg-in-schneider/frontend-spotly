import { createRouter, createWebHistory } from "vue-router";
import SpotDetail from "@/components/SpotDetail.vue";
import SpotCatalog from "@/components/SpotCatalog.vue";
import EditSpot from "@/components/EditSpot.vue";
import CreateSpot from "@/components/CreateSpot.vue";    

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
    },
    {
      path: "/spot/:id/edit",         // <---- NEUE ROUTE
      name: "spot-edit",
      component: EditSpot,
      props: true,
    },
   {
      path: "/spot/create",
      name: "spot-create",
      component: CreateSpot,   // <- CreateSpot hat eigene Route
    }
  

  ]
});

export default router;
