import { createRouter, createWebHistory } from "vue-router";
import SpotDetail from "@/components/SpotDetail.vue";
import SpotCatalog from "@/components/SpotCatalog.vue";
import EditSpot from "@/components/EditSpot.vue";
import CreateSpot from "@/components/CreateSpot.vue";
import Support from "@/components/Support.vue";
import Impressum from "@/components/Impressum.vue";
import Datenschutz from "@/components/Datenschutz.vue";

// Neue Admin-Komponenten importieren
import AdminDashboard from "@/components/AdminDashboard.vue";
import AdminUsers from "@/components/AdminUsers.vue";
import AdminSpots from "@/components/AdminSpots.vue";
import AdminSupport from "@/components/AdminSupport.vue";

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
            path: "/create-spot",
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
        },

        // --- ADMIN BEREICH (Anforderung b) ---
        {
            path: "/admin",
            name: "admin-dashboard",
            component: AdminDashboard
        },
        {
            path: "/admin/users",
            name: "admin-users",
            component: AdminUsers
        },
        {
            path: "/admin/spots", // Der Pfad für deine neue Orte-Verwaltung
            name: "admin-spots",
            component: AdminSpots
        },
        {
            path: "/admin/support",
            name: "admin-support",
            component: AdminSupport
        }
    ],
});

export default router;