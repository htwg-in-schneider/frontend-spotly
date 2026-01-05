<script setup>
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

const API_BASE = import.meta.env.VITE_API_URL;
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const mySpots = ref([]);

async function fetchMySpots() {
  if (!isAuthenticated.value) return;

  try {
    // 1. Token holen
    const token = await getAccessTokenSilently();
    console.log("Token erhalten, lade eigene Spots...");

    // 2. Fetch mit korrektem Header
    const res = await fetch(`${API_BASE}/spots/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      mySpots.value = await res.json();
    } else if (res.status === 401) {
      console.error("Nicht autorisiert! Token prüfen.");
    }
  } catch (err) {
    console.error("Fehler beim Abrufen der Spots:", err);
  }
}

onMounted(fetchMySpots);
</script>

<template>
  <div class="my-spots-page">
    <h1 class="title">Meine Spots</h1>

    <div class="spot-list">
      <div v-for="spot in mySpots" :key="spot.id" class="spot-item">
        <div class="card-content">
          <img :src="spot.imageUrl" alt="Spot">
          <div class="text-box">
            <h3>{{ spot.title }}</h3>
            <p>{{ spot.description }}</p>
            <div class="actions">
              <router-link :to="'/spot/' + spot.id + '/edit'" class="edit-link">
                Bearbeiten
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
.my-spots-page { min-height: 100vh; background: linear-gradient(180deg, #f0f7ff 0%, #c9e4ff 100%); padding: 100px 20px; display: flex; flex-direction: column; align-items: center; }
.title { color: #0084ff; font-size: 42px; font-weight: 800; margin-bottom: 40px; }
.spot-item { width: 100%; max-width: 500px; background: white; border-radius: 30px; padding: 20px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.card-content { display: flex; gap: 20px; align-items: center; }
.card-content img { width: 120px; height: 90px; border-radius: 15px; object-fit: cover; }
.text-box h3 { margin: 0; font-size: 20px; }
.actions { margin-top: 10px; }
.edit-link { color: #0084ff; text-decoration: underline; font-size: 14px; font-weight: 600; }
.empty { color: #666; font-style: italic; margin-top: 20px; }
</style>