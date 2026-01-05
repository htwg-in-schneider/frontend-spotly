<template>
  <div>
    <div class="logo-container">
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="Spotly Logo" class="logo-outside" />
      </router-link>
    </div>

    <header class="header">
      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/spots">Spots</router-link>
        <router-link to="/map">Karte</router-link>
        <router-link to="/about">Über uns</router-link>
        <router-link to="/support">Support</router-link>

        <a href="#" class="search-icon">
          <img src="@/assets/search.svg" alt="Suche">
        </a>
      </nav>
    </header>

    <div class="auth-controls">
      <Button
          class="login-btn"
          :variant="isAuthenticated ? 'secondary' : 'accent'"
          @click="handleAuth"
      >
        {{ isAuthenticated ? 'Log Out' : 'Log In' }}
      </Button>

      <Button
          v-if="userStore.userProfile?.role === 'ADMIN'"
          class="admin-btn"
          @click="router.push('/admin')"
      >Dashboard
      </Button>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'; // WICHTIG: watch und onMounted importieren
import Button from "@/components/Button.vue";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter} from "vue-router";
import { useUserStore } from '@/stores/userStore';

const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
const userStore = useUserStore();
const router = useRouter();

// Funktion zum Laden des Profils
const loadProfile = async () => {
  if (isAuthenticated.value) {
    try {
      const token = await getAccessTokenSilently();
      await userStore.fetchProfile(token); // Dein Store braucht diese Methode
      console.log("Profil geladen:", userStore.userProfile);
    } catch (error) {
      console.error("Fehler beim Laden des Profils:", error);
    }
  }
};

// 1. Beim ersten Laden der Komponente prüfen
onMounted(loadProfile);

// 2. Sobald sich der Login-Status ändert (Login erfolgt), Profil laden
watch(isAuthenticated, (newVal) => {
  if (newVal) {
    loadProfile();
  } else {
    userStore.userProfile = null; // In der Navbar (ohne .value)
    // Falls das immer noch rot ist, schau in den Store-Code.
  }
});
const handleAuth = () => {
  if (!isAuthenticated.value) {
    loginWithRedirect();
  } else {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }
};
</script>

<style scoped>
/* Logo */
.logo-outside {
  position: relative;
  top: 25px;
  left: 40px;
  height: 170px;
}

/* Header */
.header {
  position: relative;
  max-width: 540px;
  top: -100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  margin: 0 auto;
  width: 40%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #1c1c1c;
  font-weight: normal;
}

.nav a:hover {
  text-decoration: underline;
}

/* Der Container bekommt jetzt die Position oben rechts */
.auth-controls {
  position: absolute;
  top: 60px;
  right: 70px;
  z-index: 20;

  /* Flexbox sorgt für das Untereinander */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Abstand zwischen den Buttons */
  width: 120px; /* Optional: Feste Breite, damit beide gleich breit sind */
}

/* Die Buttons füllen den Container komplett aus */
.login-btn, .admin-btn {
  position: static; /* WICHTIG: absolute Positionierung entfernen! */
  width: 100%;      /* Beide Buttons sind exakt gleich breit */
  margin: 0;

  display: flex;
  justify-content: center; /* Horizontal mittig */
  align-items: center;     /* Vertikal mittig */
  text-align: center;
}

.logo-link {
  cursor: pointer;
  display: inline-block; /* Sorgt dafür, dass der Link genau so groß wie das Bild ist */
  transition: transform 0.2s ease; /* Optional: Kleiner Effekt beim Klicken */
}

.logo-link:hover {
  opacity: 0.9; /* Optional: Logo wird leicht blasser beim Drüberfahren */
}



/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .logo-outside {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 120px;
  }

  .header {
    width: 90%;
    top: 15px;
    padding: 15px 20px;
    flex-direction: column;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .nav a {
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
  }

  /* Der Container bekommt jetzt die Position oben rechts */
  .auth-controls {
    position: absolute;
    top: 60px;
    right: 70px;
    z-index: 20;

    /* Flexbox sorgt für das Untereinander */
    display: flex;
    flex-direction: column;
    gap: 10px; /* Abstand zwischen den Buttons */
    width: 120px; /* Optional: Feste Breite, damit beide gleich breit sind */
  }

  /* Die Buttons füllen den Container komplett aus */
  .login-btn, .admin-btn {
    position: static; /* WICHTIG: absolute Positionierung entfernen! */
    width: 100%;      /* Beide Buttons sind exakt gleich breit */
    margin: 0;
  }
}
</style>
