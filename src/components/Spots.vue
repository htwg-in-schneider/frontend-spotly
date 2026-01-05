<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "./Button.vue";

const API_BASE = import.meta.env.VITE_API_URL;
const { isAuthenticated } = useAuth0();

const allSpots = ref([]);
const categories = ref([]);
const searchTitle = ref("");
const searchCategory = ref("");

onMounted(async () => {
  try {
    const spotRes = await fetch(`${API_BASE}/spots`);
    if (spotRes.ok) allSpots.value = await spotRes.json();

    const catRes = await fetch(`${API_BASE}/category`);
    if (catRes.ok) {
      const catData = await catRes.json();
      categories.value = catData.map(c => typeof c === 'string' ? { name: c } : c);
    } else {
      categories.value = [
        { name: "Natur & Aussicht" }, { name: "Shops & Märkte" },
        { name: "Events & Kultur" }, { name: "Cafés & Essen" },
        { name: "Sport & Freizeit" }, { name: "Andere" }
      ];
    }
  } catch (err) {
    console.error("Verbindungsfehler:", err);
  }
});

const filteredSpots = computed(() => {
  return allSpots.value.filter(spot => {
    const matchesTitle = spot.title.toLowerCase().includes(searchTitle.value.toLowerCase());
    const matchesCategory = searchCategory.value === "" || (spot.category && spot.category.name === searchCategory.value);
    return matchesTitle && matchesCategory;
  });
});
</script>

<template>
  <div class="spots-page">
    <div class="top-left-nav">
      <router-link to="/">
        <Button variant="secondary" round>&lt;</Button>
      </router-link>
    </div>

    <div class="content-wrapper">
      <h1 class="main-title">Spots</h1>

      <div class="header-controls">
        <div class="search-filter-card">
          <div class="search-input-group">
            <div class="search-icon-wrapper">
              <img src="@/assets/search.svg" alt="Suche" class="white-icon">
            </div>
            <input type="text" placeholder="Suche..." v-model="searchTitle">
          </div>
          <div class="filter-input-group">
            <span class="icon">≡</span>
            <select v-model="searchCategory" class="filter-select">
              <option value="">Alle Kategorien</option>
              <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>
        </div>

        <div v-if="isAuthenticated" class="auth-buttons-column">
          <router-link to="/create-spot">
            <Button style="width: 100%; padding: 8px 15px;">+ Spot erstellen</Button>
          </router-link>
          <router-link to="/meine-spots">
            <Button variant="secondary" style="width: 100%; padding: 8px 15px;">🗁 Meine Spots</Button>
          </router-link>
        </div>
      </div>

      <div class="spot-list">
        <router-link v-for="spot in filteredSpots" :key="spot.id" :to="'/spot/' + spot.id" class="spot-card">
          <div class="card-content">
            <div class="image-container">
              <img v-if="spot.imageUrl" :src="spot.imageUrl" alt="Spot">

              <div v-else class="placeholder-container">
                <img src="@/assets/img.png" alt="Platzhalter" class="placeholder-icon">
              </div>
            </div>
            <div class="text-container">
              <h3>{{ spot.title }}</h3>
              <p>{{ spot.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-left-nav { position: absolute; top: 20px; left: 20px; z-index: 100; }
.spots-page { position: relative; min-height: 100vh; background: linear-gradient(180deg, #f0f7ff 0%, #c9e4ff 100%); padding-top: 80px; display: flex; justify-content: center; }
.content-wrapper { width: 95%; max-width: 650px; }
.main-title { color: #0084ff; font-size: 48px; font-weight: 800; margin-bottom: 25px; }

.header-controls { display: flex; gap: 15px; align-items: flex-start; margin-bottom: 30px; }
.search-filter-card { background: #6eb5f3; padding: 15px; border-radius: 25px; flex: 1; }

.search-input-group, .filter-input-group {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 8px 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: white;
}

.white-icon {
  filter: brightness(0) invert(1);
  width: 18px;
  height: 18px;
  display: block;
}

.filter-select { background: transparent; border: none; color: white; width: 100%; margin-left: 10px; outline: none; cursor: pointer; }
.filter-select option { color: #333; }

input { background: transparent; border: none; color: white; margin-left: 10px; outline: none; width: 100%; }
input::placeholder { color: white; }

.auth-buttons-column { display: flex; flex-direction: column; gap: 10px; min-width: 180px; }

.spot-card { display: block; background: white; border-radius: 25px; padding: 15px; margin-bottom: 15px; text-decoration: none; color: inherit; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.card-content { display: flex; gap: 15px; align-items: center; }

.image-container img { width: 130px; height: 95px; border-radius: 15px; object-fit: cover; }

.placeholder-container {
  width: 130px;
  height: 95px;
  background: #f9f9f9;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}

.placeholder-icon {
  width: 50px !important;
  height: 50px !important;
  opacity: 0.2;
  object-fit: contain !important;
}

.text-container h3 { margin: 0; font-size: 18px; font-weight: 700; }
.text-container p { margin-top: 5px; font-size: 13px; color: #666; }
</style>