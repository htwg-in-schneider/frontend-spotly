<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';

const API_BASE = import.meta.env.VITE_API_URL;
const { isAuthenticated } = useAuth0();

const allSpots = ref([]); // Originale Liste vom Backend
const categories = ref([]); // Kategorien für den Filter

// Such-Variablen
const searchTitle = ref("");
const searchCategory = ref("");

// 1. Daten laden
onMounted(async () => {
  try {
    // 1. Spots laden
    const spotRes = await fetch(`${API_BASE}/spots`);
    if (spotRes.ok) {
      allSpots.value = await spotRes.json();
    }

    // 2. Kategorien laden & Format vereinheitlichen
    const catRes = await fetch(`${API_BASE}/category`);
    if (catRes.ok) {
      const catData = await catRes.json();
      // Wir speichern nur die Namen für den einfachen Vergleich im Filter
      categories.value = catData.map(c => typeof c === 'string' ? { name: c } : c);
    } else {
      categories.value = [
        { name: "Natur & Aussicht" }, { name: "Shops & Märkte" },
        { name: "Events & Kultur" }, { name: "Cafés & Essen" },
        { name: "Sport & Freizeit" }, { name: "Andere" }
      ];
    }
  } catch (err) {
    console.error("Verbindungsfehler zum Backend:", err);
  }
});

// 2. FILTER-LOGIK: Hier passiert die Magie
const filteredSpots = computed(() => {
  return allSpots.value.filter(spot => {
    // Prüfe ob der Name passt
    const matchesTitle = spot.title.toLowerCase().includes(searchTitle.value.toLowerCase());

    // Prüfe ob die Kategorie passt (falls eine ausgewählt wurde)
    const matchesCategory = searchCategory.value === "" ||
        (spot.category && spot.category.name === searchCategory.value);

    return matchesTitle && matchesCategory;
  });
});
</script>

<template>
  <div class="spots-page">
    <div class="content-wrapper">
      <h1 class="main-title">Spots</h1>

      <div class="header-controls">
        <div class="search-filter-card">
          <div class="search-input-group">
            <span class="icon">🔍</span>
            <input type="text" placeholder="Suche..." v-model="searchTitle">
          </div>

          <div class="filter-input-group">
            <span class="icon">≡</span>
            <select v-model="searchCategory" class="filter-select">
              <option value="">Alle Kategorien</option>
              <option v-for="cat in categories" :key="cat.name" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="isAuthenticated" class="auth-buttons-column">
          <router-link to="/create-spot" class="auth-action-btn">
            <span class="btn-icon">+</span> Spot erstellen
          </router-link>
          <router-link to="/my-own-spots" class="auth-action-btn">
            <span class="btn-icon">📁</span> Meine Spots
          </router-link>
        </div>
      </div>

      <div class="spot-list">
        <router-link
            v-for="spot in filteredSpots"
            :key="spot.id"
            :to="'/spot/' + spot.id"
            class="spot-card"
        >
          <div class="card-content">
            <div class="image-container">
              <img :src="spot.imageUrl" alt="Spot">
            </div>
            <div class="text-container">
              <h3>{{ spot.title }}</h3>
              <p>{{ spot.description }}</p>
            </div>
          </div>
        </router-link>

        <p v-if="filteredSpots.length === 0" class="no-results">
          Keine Spots gefunden...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spots-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f7ff 0%, #c9e4ff 100%);
  padding-top: 60px;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 95%;
  max-width: 650px;
}

.main-title {
  color: #0084ff;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 25px;
}

.header-controls {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  margin-bottom: 30px;
}

.search-filter-card {
  background: #6eb5f3;
  padding: 15px;
  border-radius: 25px;
  flex: 1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.search-input-group, .filter-input-group {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 8px 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: white;
}

.filter-select {
  background: transparent;
  border: none;
  color: white;
  width: 100%;
  margin-left: 10px;
  outline: none;
  font-size: 15px;
  cursor: pointer;
}

.filter-select option {
  color: #333; /* Sichtbarkeit im Dropdown */
}

input {
  background: transparent;
  border: none;
  color: white;
  margin-left: 10px;
  outline: none;
  width: 100%;
}
input::placeholder { color: white; }

.auth-buttons-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 160px;
}

.auth-action-btn {
  background: white;
  border: 2px solid #0084ff;
  color: #0084ff;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon { font-size: 18px; font-weight: 800; }

.spot-card {
  display: block;
  background: white;
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 15px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.card-content { display: flex; gap: 15px; align-items: center; }
.image-container img { width: 130px; height: 95px; border-radius: 15px; object-fit: cover; }
.text-container h3 { margin: 0; font-size: 18px; font-weight: 700; }
.text-container p { margin-top: 5px; font-size: 13px; color: #666; }
.no-results { text-align: center; color: #0084ff; margin-top: 20px; font-weight: 600; }
</style>