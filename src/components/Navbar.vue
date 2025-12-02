<template>
  <div>
    <!-- Logo -->
    <div class="logo-container">
      <img 
        src="@/assets/logo.png" 
        alt="Spotly Logo" 
        class="logo-outside"
      />
    </div>

    <!-- Navigation -->
    <header class="header">
      <nav class="nav">
        <a href="#">Home</a>
        <a href="#">Spots</a>
        <a href="#">Karte</a>
        <a href="#">Über uns</a>
        <a href="#">Support</a>

        <a href="#" class="search-icon">
          <img src="@/assets/search.svg" alt="Suche">
        </a>
      </nav>
    </header>

    <!-- LOGIN BUTTON: nur dieser wird hier verbessert -->
    <Button class="login-btn" variant="accent">Log In</Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
</script>

<style scoped>
/* DEIN bestehendes Logo — UNVERÄNDERT */
.logo-outside {
  position: relative;
  top: 25px;
  left: 40px;
  height: 170px;
}

/* DEIN bestehender Header — UNVERÄNDERT */
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

/* DEINE Links — UNVERÄNDERT */
.nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #1c1c1c;
  font-weight: 500;
}

.nav a:hover {
  text-decoration: underline;
}

/* 👉 LOGIN BUTTON — KORREKT PLATZIERT OHNE ALLES ZU ZERSTÖREN */
.login-btn {
  position: absolute;
  top: 60px;   /* höher oder tiefer anpassen */
  right: 70px;   /* weiter rechts oder links anpassen */
  z-index: 20;
}

/* Responsive version — sauber */
@media (max-width: 768px) {
  .header {
    width: 80%;
    top: 0;
    flex-direction: column;
    padding: 10px 20px;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav a {
    margin: 8px 10px;
    font-size: 14px;
  }

  .logo-outside {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 120px;
  }

  /* Login-Button wird auf kleinen Screens zentriert */
  .login-btn {
    position: static;
    margin: 15px auto;
    display: block;
  }
}
</style>
