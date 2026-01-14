<script setup>
import { ref, onMounted } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "./Button.vue";

const API_BASE = import.meta.env.VITE_API_URL;
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const mySpots = ref([]);

async function fetchMySpots() {
  if (!isAuthenticated.value) return;
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE}/spots/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) mySpots.value = await res.json();
  } catch (err) {
    console.error("Fehler:", err);
  }
}

onMounted(fetchMySpots);
</script>

<template>
  <div class="my-spots-page">
    <div class="top-left-nav">
      <router-link to="/spots">
        <Button variant="secondary" round>&lt;</Button>
      </router-link>
    </div>

    <h1 class="title">Meine Spots</h1>

    <div class="spot-list">
      <div v-for="spot in mySpots" :key="spot.id" class="spot-item">
        <div class="card-content">
          <div class="image-container">
            <img v-if="spot.imageUrl" :src="spot.imageUrl" alt="Spot">

            <div v-else class="placeholder-container">
              <img src="@/assets/img.png" alt="Kein Bild" class="placeholder-icon">
            </div>
          </div>

          <div class="text-box">
            <h3>{{ spot.title }}</h3>
            <p>{{ spot.description }}</p>
            <div class="actions">
              <router-link :to="'/spot/' + spot.id + '/edit'">
                <Button variant="secondary" style="padding: 5px 15px; font-size: 12px;">Bearbeiten</Button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <p v-if="mySpots.length === 0" class="empty">Du hast noch keine Spots erstellt.</p>
    </div>
  </div>
</template>

<style scoped>
.top-left-nav { position: absolute; top: 20px; left: 20px; z-index: 100; }
.my-spots-page { position: relative; min-height: 100vh; padding: 100px 20px; display: flex; flex-direction: column; align-items: center; }
.title { color: #0084ff; font-size: 42px; font-weight: 800; margin-bottom: 40px; }

.spot-item { width: 100%; max-width: 500px; background: white; border-radius: 30px; padding: 20px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.card-content { display: flex; gap: 20px; align-items: center; }


.image-container img { width: 120px; height: 90px; border-radius: 15px; object-fit: cover; }

.placeholder-container {
  width: 120px;
  height: 90px;
  background: #f9f9f9;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}

.placeholder-icon {
  width: 40px !important;
  height: auto !important;
  opacity: 0.2;
  object-fit: contain !important;
}

.text-box h3 { margin: 0; font-size: 20px; font-weight: 700; }
.text-box p { font-size: 14px; color: #666; margin: 5px 0; }
.actions { margin-top: 10px; }
.empty { color: #666; font-style: italic; margin-top: 20px; }
</style>