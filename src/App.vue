<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />

  <!-- Hier wird die aktuelle View angezeigt -->
  <router-view />

  <Footer />
</template>
