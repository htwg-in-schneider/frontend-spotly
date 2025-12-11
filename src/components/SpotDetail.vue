<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  import SpotReviews from "@/components/SpotReviews.vue";
  
  const route = useRoute();
  const router = useRouter();
  
  // API-Basis-URL verwenden
  const API_BASE = import.meta.env.VITE_API_URL; 
  
  const spot = ref(null);
  
  onMounted(async () => {
    // Die ID des Spots aus der Route
    const spotId = route.params.id; 
    
    try {
      // KORREKTUR: Aufruf Ihres Backends: /api/spots/{id}
      const res = await fetch(`${API_BASE}/spots/${spotId}`); 
      
      if (!res.ok) {
          throw new Error(`Spot mit ID ${spotId} nicht gefunden.`);
      }
      
      const data = await res.json();
  
      // KORREKTUR: Daten-Mapping an Ihr Backend-JSON anpassen
      spot.value = {
        id: data.id,
        title: data.title,
        category: data.category ?? "Unbekannt", // Verwenden Sie data.category
        location: data.location ?? "Konstanz", // Verwenden Sie data.location
        description: data.description || "Keine Beschreibung vorhanden.",
        image: data.imageUrl, // Verwenden Sie data.imageUrl
        reviews: data.reviews || []
      };
      
    } catch (err) {
      console.error("Fehler beim Laden des Spots:", err);
      // Optional: Fehler-Meldung anzeigen
      alert("Konnte Spot-Details nicht vom Backend laden. Prüfen Sie, ob die ID existiert.");
    }
  });
  
  function editSpot() {
    router.push(`/spot/${route.params.id}/edit`);
  }
  </script>


<template>
  <!-- Hintergrund -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>
    <img src="@/assets/background.jpeg" class="bg-image" />
  </div>

  <div v-if="spot" class="detail-container">

    <div class="card">

      <!-- Bild -->
      <img :src="spot.image" class="spot-image" />

      <!-- Titel -->
      <h2 class="spot-name">{{ spot.title }}</h2>

      <p class="info-line">
        <strong>Kategorie:</strong> {{ spot.category.name }}
      </p>

      <!-- Standort -->
      <p class="info-line">
        <strong>Standort:</strong> {{ spot.location }}
      </p>

      <!-- Beschreibung -->
      <div class="description-box">
        <strong>Beschreibung:</strong>
        <p>{{ spot.description }}</p>
      </div>

      <!-- ⭐ Bewertungen -->
      <SpotReviews :spotId="spot.id" />

      <!-- Button -->
      <button class="edit-btn" @click="editSpot">Bearbeiten</button>

    </div>

  </div>

  <div v-else class="loading">Lade Spot...</div>
</template>


<style scoped>
/* Hintergrund */
.background {
  position: fixed;
  inset: 0;
  z-index: -1;
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
  background: rgba(255,255,255,0.5);
}

.ellipse1 { width: 800px; height: 400px; top: 0; left: -200px; }
.ellipse2 { width: 900px; height: 500px; top: 200px; right: -300px; }
.ellipse3 { width: 700px; height: 350px; bottom: -100px; left: 100px; }

/* Inhalt */
.detail-container {
  max-width: 900px;
  margin: 140px auto;
  text-align: center;
}

/* Karte */
.card {
  background: rgba(240, 240, 240, 0.95);
  border-radius: 25px;
  padding: 30px;
  width: 85%;
  margin: 0 auto;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

.spot-image {
  width: 100%;
  border-radius: 25px;
  margin-bottom: 25px;
}

/* Titel */
.spot-name {
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}

/* Info */
.info-line {
  font-size: 18px;
  color: #000;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 5px;
}

/* Beschreibung */
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

/* Button */
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
</style>
