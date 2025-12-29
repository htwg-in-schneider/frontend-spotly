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

    <Button @click="handleLogin" class="login-btn">
      <span class="btn-text">
        {{ isAuthenticated ? 'Log Out' : 'Log In' }}
      </span>

      <span class="user-icon">
        <img
            :src="isAuthenticated ? user.picture : '/src/assets/people.png'"
            height="30"
            width="30"
            style="border-radius: 50%"
        />
      </span>
    </Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useAuth0 } from '@auth0/auth0-vue';

// Diese Funktionen kommen direkt aus dem Auth0-Paket
const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

const handleLogin = () => {
  loginWithRedirect(); // Das leitet den User zur Auth0-Seite weiter
};

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
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


    /* ... deine anderen Styles für logo-outside, header, nav ... */

    .login-btn {
      /* Positionierung: Schwebt rechts oben */
      position: absolute;
      top: 25px;
      right: 20px;
      z-index: 1100; /* Muss über dem Header (1000) liegen */

      /* Form: Kreis */
      width: 55px;
      height: 55px;
      border-radius: 50%;

      /* Inhalt zentrieren */
      display: flex;
      align-items: center;
      justify-content: center;

      /* Design */
      background: #0084ff;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      padding: 0;
    }

    /* Text auf Mobile verstecken */
    .btn-text {
      display: none;
    }

    /* Icon auf Mobile groß anzeigen */
    .user-icon {
      display: block;
      font-size: 24px;
      color: white;
    }
  }

  /* ===== DESKTOP (Voreinstellung) ===== */
  /* Damit das Icon auf dem Desktop nicht stört: */
  @media (min-width: 769px) {
    .user-icon {
      display: none;
    }
  }
</style>
