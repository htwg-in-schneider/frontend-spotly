import { createRouter, createWebHistory } from "vue-router";
import SpotDetail from "@/components/SpotDetail.vue";
import SpotCatalog from "@/components/SpotCatalog.vue";
import EditSpot from "@/components/EditSpot.vue";
import CreateSpot from "@/components/CreateSpot.vue";
import Support from "@/components/Support.vue";
import Impressum from "@/components/Impressum.vue";
import Datenschutz from "@/components/Datenschutz.vue";

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
            path: "/spot/:id/edit",
            name: "spot-edit",
            component: EditSpot,
            props: true,
        },
        {
            path: "/create-spot",   // ⭐ WICHTIG ⭐
            name: "spot-create",
            component: CreateSpot,
        },
        {
            path: "/support",
            name: "support",
            component: Support
        },
        {
            path: "/impressum",
            name: "impressum",
            component: Impressum
        },
        {
            path: "/datenschutz",
            name: "datenschutz",
            component: Datenschutz
        }

    ],
});

export default router;
