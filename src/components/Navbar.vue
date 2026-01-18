<template>
  <div class="navbar-wrapper">
    <div class="logo-container">
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="Spotly Logo" class="logo-outside" />
      </router-link>
    </div>

    <header class="header" :class="{ 'is-open': isMenuOpen }">
      <div class="menu-trigger" @click="isMenuOpen = !isMenuOpen">
        <span class="menu-text">Menü</span>
        <span class="chevron" :class="{ 'rotate': isMenuOpen }">▼</span>
      </div>

      <nav class="nav" :class="{ 'dropdown-visible': isMenuOpen }">
        <router-link to="/" @click="isMenuOpen = false">Home</router-link>
        <router-link to="/spots" @click="isMenuOpen = false">Spots</router-link>
        <router-link to="/map" @click="isMenuOpen = false">Karte</router-link>
        <router-link to="/about" @click="isMenuOpen = false">Über uns</router-link>
        <router-link to="/support" @click="isMenuOpen = false">Support</router-link>

        <div class="mobile-auth-links" v-if="isMenuOpen">
          <hr class="divider" />
          <button @click="router.push('/profileview'); isMenuOpen = false" v-if="userStore.userProfile?.role === 'USER'">Profil</button>
          <button @click="router.push('/admin'); isMenuOpen = false" v-if="userStore.userProfile?.role === 'ADMIN'">Dashboard</button>
          <button @click="handleAuth(); isMenuOpen = false">{{ isAuthenticated ? 'Log Out' : 'Log In' }}</button>
        </div>
      </nav>
    </header>

    <div class="auth-controls desktop-only">
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

      <Button
          v-if="userStore.userProfile?.role === 'USER'"
          class="login-btn"
          @click="router.push('/profileview')"
      >Profil
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'; // ref hinzugefügt für das Menü
import Button from "@/components/Button.vue";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter} from "vue-router";
import { useUserStore } from '@/stores/userStore';

const isMenuOpen = ref(false);

const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
const userStore = useUserStore();
const router = useRouter();

const loadProfile = async () => {
  if (isAuthenticated.value) {
    try {
      const token = await getAccessTokenSilently();
      await userStore.fetchProfile(token);
    } catch (error) {
      console.error("Fehler beim Laden des Profils:", error);
    }
  }
};

onMounted(loadProfile);

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    loadProfile();
  } else {
    userStore.userProfile = null;
  }
});

const handleAuth = () => {
  if (!isAuthenticated.value) {
    loginWithRedirect();
  } else {
    const returnUrl = window.location.origin;

    logout({
      logoutParams: {
        returnTo: returnUrl
      }
    });
  }
};
</script>

<style scoped>

.logo-outside {
  position: relative;
  top: 25px;
  left: 40px;
  height: 170px;
}

.header {
  position: relative;
  max-width: 600px;
  top: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  margin: 0 auto;
  width: 45%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.nav a {
  margin: 0 5px;
  padding: 8px 16px;
  text-decoration: none;
  color: #1c1c1c;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 510;
}

.nav a:hover {
  background-color: rgba(0, 132, 255, 0.1);
  color: #0084ff;
  transform: translateY(-1px);
}

.auth-controls {
  position: absolute;
  top: 60px;
  right: 70px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 120px;
}

.login-btn, .admin-btn {
  position: static;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.menu-trigger { display: none; }


@media (max-width: 900px) {
  .desktop-only { display: none; }

  .logo-outside {
    height: 100px;
    top: 10px;
    left: 20px;
  }

  .header {
    top: 20px;
    width: auto;
    max-width: 200px;
    flex-direction: column;
    padding: 12px 20px;
    cursor: pointer;
  }

  .header.is-open {
    max-width: 280px;
    border-radius: 20px;
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    color: #0084ff;
  }

  .nav {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 15px;
    gap: 10px;
  }

  .nav.dropdown-visible { display: flex; }

  .mobile-auth-links {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .divider {
    border: 0;
    border-top: 1px solid #eee;
    margin: 5px 0;
  }

  .mobile-auth-links button {
    background: none;
    border: none;
    color: #0084ff;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
  }

  .chevron { font-size: 10px; transition: transform 0.3s; }
  .chevron.rotate { transform: rotate(180deg); }
}
</style>