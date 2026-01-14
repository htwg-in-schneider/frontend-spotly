import { createRouter, createWebHistory } from "vue-router";
import SpotDetail from "@/components/SpotDetail.vue";
import SpotCatalog from "@/components/SpotCatalog.vue";
import EditSpot from "@/components/EditSpot.vue";
import CreateSpot from "@/components/CreateSpot.vue";
import Support from "@/components/Support.vue";
import Impressum from "@/components/Impressum.vue";
import Datenschutz from "@/components/Datenschutz.vue";
import { useUserStore } from "@/stores/userStore";
import Spots from "@/components/Spots.vue";
import MeineSpots from "@/components/MeineSpots.vue";
import About from "@/components/About.vue";

// Neue Admin-Komponenten importieren
import AdminDashboard from "@/components/AdminDashboard.vue";
import AdminUsers from "@/components/AdminUsers.vue";
import AdminSpots from "@/components/AdminSpots.vue";
import AdminSupport from "@/components/AdminSupport.vue";
import ProfileView from "@/components/ProfileView.vue";

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
            component: CreateSpot
        },
        {
            path: "/about",
            name: "about",
            component: About
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

        {
            path: "/admin",
            name: "admin-dashboard",
            component: AdminDashboard,
            meta: { requiresAdmin: true }
        },
        {
            path: "/admin/users",
            name: "admin-users",
            component: AdminUsers,
            meta: { requiresAdmin: true }
        },
        {
            path: "/admin/spots",
            name: "admin-spots",
            component: AdminSpots,
            meta: { requiresAdmin: true }
        },
        {
            path: "/admin/support",
            name: "admin-support",
            component: AdminSupport,
            meta: { requiresAdmin: true }

        },
        {
            path: '/map',
            name: 'Map',
            component: () => import('../components/MapView.vue')
        },
        {
            path: "/spots", // <--- NEU: Die Route für deine Transaktionen (Aufgabe c)
            name: "spots",
            component: Spots,
            meta: { requiresAuth: true }
        },
        {
            path: "/meine-spots", // <--- NEU: Die Seite für die eigenen erstellten Spots
            name: "meine-spots",
            component: MeineSpots,
            meta: { requiresAuth: true }
        },
        {
            path: "/profileview", // <--- NEU: Die Seite für die eigenen erstellten Spots
            name: "profile-view",
            component: ProfileView,
            meta: { requiresAuth: true }
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (to.matched.some(record => record.meta.requiresAdmin)) {

        if (userStore.userProfile?.role === 'ADMIN') {
            next();
        } else {
            alert("Zugriff verweigert: Nur für Admins!");
            next('/');
        }
    } else {
        next();
    }
});

export default router;