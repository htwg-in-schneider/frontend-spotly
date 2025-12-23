<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div id="app-wrapper">
    <div class="global-background">
      <div class="ellipse ellipse1"></div>
      <div class="ellipse ellipse2"></div>
      <div class="ellipse ellipse3"></div>
      <img src="@/assets/background.jpeg" alt="Background" class="bg-image" />
    </div>
  <Navbar />

  <router-view />

  <Footer />
  </div>
</template>
<style>
/* WICHTIG: Hier kein 'scoped', damit der Hintergrund überall wirkt */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Liegt hinter allem */
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}

.ellipse {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.ellipse1 { width: 800px; height: 400px; top: 0; left: -200px; }
.ellipse2 { width: 900px; height: 500px; top: 200px; right: -300px; }
.ellipse3 { width: 700px; height: 350px; bottom: -100px; left: 100px; }

.main-content {
  position: relative;
  z-index: 1; /* Stellt sicher, dass der Inhalt über dem Hintergrund liegt */
}
</style>