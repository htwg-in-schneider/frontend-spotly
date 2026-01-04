<template>
  <div class="transparent-view">
    <div class="header">
      <h1 class="title">Admin Dashboard</h1>
    </div>

    <div class="menu-container">
      <button @click="router.push('/admin/spots')" class="menu-btn">
        <span class="icon">🗺️</span>
        Orte verwalten
        <span class="arrow">>></span>
      </button>

      <button @click="router.push('/admin/users')" class="menu-btn">
        <span class="icon">👤</span>
        Benutzer verwalten
        <span class="arrow">>></span>
      </button>

      <button @click="router.push('/admin/support')" class="menu-btn">
        <span class="icon">⚙️</span>
        Support
        <span class="arrow">>></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.transparent-view {
  min-height: 80vh; /* Damit der Footer nicht überdeckt wird */
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent; /* Hierdurch wird der App.vue Hintergrund sichtbar */
}

/* Der Rest bleibt gleich, damit das Design erhalten bleibt */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.title { color: #5daae0; font-size: 36px; font-weight: 800; margin-left: 550px }
.logo-img { height: 60px; }

.menu-container { width: 100%; max-width: 320px; }
.menu-btn {
  width: 100%;
  background-color: rgba(93, 170, 224, 0.9); /* Leicht transparentes Blau */
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.arrow { margin-left: auto; }
</style>
<script setup lang="ts">
import {useRouter} from 'vue-router';
const router = useRouter();
</script>