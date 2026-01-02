<template>
  <div>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Spotly Logo" class="logo-outside" />
    </div>

    <header class="header">
      <nav class="nav">
        
        <router-link to="/">Home</router-link>
        <router-link to="/">Spots</router-link> 
        
        <router-link to="/map">Karte</router-link> 
        
        <router-link to="/about">Über uns</router-link>
        
        <router-link to="/support">Support</router-link>

   

        <a href="#" class="search-icon">
          <img src="@/assets/search.svg" alt="Suche">
        </a>
      </nav>
    </header>
    <Button
        class="login-btn"
        :variant="isAuthenticated ? 'secondary' : 'accent'"
        @click="handleAuth"
    >
      {{ isAuthenticated ? 'Log Out' : 'Log In' }}
    </Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useAuth0 } from '@auth0/auth0-vue';

// Auth0-Funktionen laden
const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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
  font-weight: 500;
}

.nav a:hover {
  text-decoration: underline;
}

/* Login Button */
.login-btn {
  position: absolute;
  top: 60px;
  right: 70px;
  z-index: 20;
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
  }

  .login-btn {
    position: static;
    margin-top: 15px;
    display: block;
  }
}
</style>
