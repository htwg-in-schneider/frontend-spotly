<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from '@/stores/userStore';
import Button from "./Button.vue";
import SpotReviews from "@/components/SpotReviews.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const API_BASE = import.meta.env.VITE_API_URL;
const spot = ref(null);

async function loadSpotData() {
  const spotId = route.params.id;

  try {
    const res = await fetch(`${API_BASE}/spots/${spotId}`);

    if (!res.ok) {
      throw new Error(`Spot mit ID ${spotId} nicht gefunden.`);
    }

    const data = await res.json();

    spot.value = {
      id: data.id,
      title: data.title,
      category: data.category?.name || data.category || "Unbekannt",
      location: data.location ?? "Konstanz",
      description: data.description || "Keine Beschreibung vorhanden.",
      image: data.imageUrl,
      reviews: data.reviews || [],
      author: data.authorName || "Ein Spotly-Nutzer",
      date: data.createdAt ? new Date(data.createdAt).toLocaleDateString("de-DE") : "unbekannt",
      averageRating: data.averageRating,
      reviewCount: data.reviewCount
    };

  } catch (err) {
    console.error("Fehler beim Laden des Spots:", err);
  }
}

onMounted(() => {
  loadSpotData();
});

function editSpot() {
  router.push(`/spot/${route.params.id}/edit`);
}

</script>

<template>
  <div class="top-left-nav">
    <router-link to="/spots">
      <Button variant="secondary" round/>
    </router-link>
  </div>

  <div v-if="spot" class="detail-container">
    <div class="card">
      <img :src="spot.image" class="spot-image"/>

      <h2 class="spot-name">{{ spot.title }}</h2>

      <div v-if="spot.reviewCount > 0" class="rating-badge">
        <span class="star-icon">⭐</span>
        <span class="rating-val">{{ spot.averageRating?.toFixed(1) }}</span>
        <span class="rating-count">({{ spot.reviewCount }} Bewertungen)</span>
      </div>
      <div v-else class="rating-badge no-reviews">
        Noch keine Bewertungen
      </div>

      <p class="info-line">
        <strong>Kategorie:</strong> {{ spot.category.name }}
      </p>

      <p class="info-line">
        <strong>Standort:</strong> {{ spot.location }}
      </p>

      <div class="description-box">
        <strong>Beschreibung:</strong>
        <p>{{ spot.description }}</p>
      </div>

      <div class="user-info">
        <p class="meta-text">
          Erstellt von: <strong>{{ spot.author }}</strong> am {{ spot.date }}
        </p>
      </div>

      <SpotReviews :spotId="spot.id" @review-posted="loadSpotData"/>

      <div v-if="userStore.userProfile?.role === 'ADMIN'">
        <button class="edit-btn" @click="editSpot">Bearbeiten</button>
      </div>
    </div>
  </div>

  <div v-else class="loading">Lade Spot...</div>
</template>

<style scoped>
.top-left-nav {
  position: absolute;
  top: 300px;
  left: 25px;
  z-index: 100;
}

.detail-container {
  max-width: 900px;
  margin: 140px auto;
  text-align: center;
}

.card {
  background: rgba(240, 240, 240, 0.95);
  border-radius: 25px;
  padding: 30px;
  width: 85%;
  margin: 0 auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.spot-image {
  width: 100%;
  border-radius: 25px;
  margin-bottom: 25px;
}

.spot-name {
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}

.info-line {
  font-size: 18px;
  color: #000;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 5px;
}

.description-box {
  background: #d8e6f7;
  padding: 20px;
  border-radius: 20px;
  text-align: left;
  margin: 20px 0;
}

.description-box strong {
  color: #000;
  font-size: 18px;
}

.description-box p {
  font-size: 16px;
  margin-top: 8px;
  color: #000;
  line-height: 1.5;
}

.edit-btn {
  background: #0084ff;
  border: none;
  color: white;
  padding: 14px 40px;
  border-radius: 40px;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.2s;
}

.edit-btn:hover {
  background: #0072d6;
}

.loading {
  text-align: center;
  margin-top: 150px;
  font-size: 22px;
}

.user-info {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.meta-text {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.rating-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8f9fa;
  padding: 6px 12px;
  border-radius: 20px;
  width: fit-content;
  margin: 10px 0;
  font-weight: 600;
  border: 1px solid #e9ecef;
}

.star-icon {
  color: #ffc107;
}

.rating-val {
  color: #333;
}

.rating-count {
  color: #6c757d;
  font-size: 0.9em;
  font-weight: 400;
}

.no-reviews {
  font-style: italic;
  color: #adb5bd;
  font-size: 0.9em;
}
</style>
