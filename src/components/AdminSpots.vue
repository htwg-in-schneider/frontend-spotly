<template>
  <div class="admin-spots-page">
    <header class="header-section">
      <div class="nav-container">
        <router-link to="/admin" class="back-link">
          <Button variant="secondary" round />
        </router-link>
      </div>
      <h1 class="main-title">Orte verwalten</h1>
    </header>

    <main class="content-wrapper">
      <div v-if="currentView === 'list'" class="menu-card list-view">
        <div class="menu-header">
          <input v-model="searchQuery" placeholder="Spot suchen..." class="inner-search" />
        </div>

        <div class="spot-list-scroll">
          <div v-if="filteredSpots.length === 0" class="no-results-msg">
            <span class="no-data-icon">📍</span> Kein Ort gefunden.
          </div>

          <div v-else v-for="spot in filteredSpots" :key="spot.id" class="spot-card-item">
            <span class="spot-name">{{ spot.title }}</span>
            <div class="item-actions">
              <button @click="openDetail(spot, 'check')" class="btn-action-light">Ort prüfen</button>
              <button @click="openDetail(spot, 'delete')" class="btn-action-light">Ort löschen</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="detail-card full-view">
        <div class="detail-header-text">
          <h2 class="sub-view-title">{{ activeMode === 'delete' ? 'Ort löschen' : 'Ort prüfen' }}</h2>
        </div>

        <div class="preview-box">
          <div class="preview-main">
            <img :src="selectedSpot.imageUrl || 'https://via.placeholder.com/300x200'" class="spot-img" />
            <div class="preview-info">
              <h3 class="preview-name">{{ selectedSpot.title }}</h3>
              <div class="info-grid">
                <p><strong>Kategorie:</strong> {{ selectedSpot.category?.name || selectedSpot.category }}</p>
                <p><strong>Standort:</strong> {{ selectedSpot.location }}</p>
              </div>
            </div>
          </div>

          <div class="description-area">
            <strong>Beschreibung:</strong>
            <p>{{ selectedSpot.description }}</p>
          </div>

          <div class="admin-reviews-container">
            <h4>Bewertungen moderieren</h4>
            <SpotReviews :spotId="selectedSpot.id" :isAdminMode="true" />
          </div>
        </div>

        <div class="action-footer-btns">
          <button v-if="activeMode === 'delete'" @click="showOverlay = true" class="btn-danger-main">Jetzt Löschen</button>
        </div>
      </div>
    </main>

    <div v-if="showOverlay" class="overlay-backdrop">
      <div class="overlay-card">
        <p>Sind Sie sicher, dass Sie diesen Ort unwiderruflich löschen möchten?</p>
        <div class="overlay-btns">
          <button @click="confirmDelete" class="btn-overlay danger">Ja, löschen</button>
          <button @click="showOverlay = false" class="btn-overlay-alt">Abbrechen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import Button from "@/components/Button.vue";
import SpotReviews from "@/components/SpotReviews.vue";

export default {
  components: { Button, SpotReviews },
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    return { getAccessTokenSilently };
  },
  data() {
    return {
      spots: [],
      searchQuery: '',
      currentView: 'list',
      activeMode: '',
      selectedSpot: null,
      showOverlay: false,
      apiBaseUrl: 'https://backend-spotly.onrender.com/api/spots'
    };
  },
  computed: {
    filteredSpots() {
      return this.spots.filter(s =>
          s.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchSpots();
  },
  methods: {
    async fetchSpots() {
      try {
        const res = await fetch(this.apiBaseUrl);
        this.spots = await res.json();
      } catch (e) {
        console.error("Fehler beim Laden der Spots:", e);
      }
    },
    goBack() {
      this.currentView = 'list';
      this.showOverlay = false;
    },
    openDetail(spot, mode) {
      this.selectedSpot = spot;
      this.activeMode = mode;
      this.currentView = 'detail';
    },
    async confirmDelete() {
      try {
        const token = await this.getAccessTokenSilently();
        const response = await fetch(`${this.apiBaseUrl}/${this.selectedSpot.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error("Löschen fehlgeschlagen");
        this.showOverlay = false;
        this.currentView = 'list';
        await this.fetchSpots();
      } catch (e) {
        console.error("Fehler beim Löschen:", e);
      }
    }
  }
}
</script>

<style scoped>
.admin-spots-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  background: transparent;
}

.header-section {
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
}

.nav-container {
  position: absolute;
  left: 20px;
}

.main-title {
  color: #5daae0;
  font-size: 36px;
  font-weight: 800;
  margin: 0;
}

.content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.menu-card {
  background: #2a8df2;
  border-radius: 30px;
  width: 100%;
  max-width: 800px;
  padding: 30px;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.inner-search {
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  border: none;
  margin-bottom: 20px;
  outline: none;
  font-size: 16px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
}

.spot-list-scroll {
  overflow-y: auto;
  max-height: 60vh;
  padding-right: 10px;
}

.spot-card-item {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.spot-name {
  font-weight: 600;
  font-size: 18px;
}

.btn-action-light {
  background: #a1c9f1;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: transform 0.2s, background 0.2s;
}

.btn-action-light:hover {
  background: #b6d5f5;
  transform: translateY(-2px);
}

.detail-card {
  background: #eef7ff;
  border-radius: 30px;
  width: 100%;
  max-width: 900px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.sub-view-title {
  color: #4a90e2;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
}

.preview-main {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  align-items: flex-start;
}

.spot-img {
  width: 40%;
  max-height: 300px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.preview-info {
  flex: 1;
  text-align: left;
}

.preview-name {
  color: #333;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 15px;
}

.info-grid p {
  margin: 8px 0;
  color: #555;
  font-size: 16px;
}

.description-area {
  background: #d4e9ff;
  padding: 25px;
  border-radius: 20px;
  text-align: left;
  margin: 20px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.admin-reviews-container {
  margin-top: 30px;
  text-align: left;
  background: white;
  padding: 25px;
  border-radius: 20px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #c0d9eb;
}

.admin-reviews-container h4 {
  color: #4a90e2;
  margin-bottom: 15px;
  font-size: 20px;
}

.action-footer-btns {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.btn-danger-main {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-reject-main {
  background: #8ec5ef;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.overlay-card {
  background: #2a8df2;
  color: white;
  padding: 35px;
  border-radius: 30px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.overlay-btns {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  justify-content: center;
}

.btn-overlay {
  padding: 12px 25px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.btn-overlay.danger {
  background: #ff4757;
  color: white;
}

.btn-overlay-alt {
  padding: 12px 25px;
  border-radius: 20px;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 768px) {
  .preview-main {
    flex-direction: column;
  }
  .spot-img {
    width: 100%;
  }
  .spot-card-item {
    flex-direction: column;
    gap: 15px;
  }
  .item-actions {
    margin-left: 0;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>