<template>

  <div class="admin-spots-page">
    <div class="header-section"></div>

    <div class="top-left-nav">
      <router-link to="/admin">
        <Button variant="secondary" round />
      </router-link>
    </div>

    <div class="content-wrapper">
      <div v-if="currentView === 'list'" class="menu-card">
        <div class="menu-header">Orte verwalten</div>
        <div class="search-container">
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

      <div v-else class="detail-card">
        <div class="detail-header-text">
          <h2 class="sub-view-title">{{ activeMode === 'delete' ? 'Ort löschen' : 'Ort prüfen' }}</h2>
        </div>

        <div class="preview-box">
          <img :src="selectedSpot.imageUrl || 'https://via.placeholder.com/300x200'" class="spot-img" />
          <h3 class="preview-name">{{ selectedSpot.title }}</h3>
          <div class="info-grid">
            <p><strong>Kategorie:</strong> {{ selectedSpot.category?.name || selectedSpot.category }}</p>
            <p><strong>Standort:</strong> {{ selectedSpot.location }}</p>
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
          <button @click="goBack" class="btn-reject-main">Zurück</button>
          <button v-if="activeMode === 'delete'" @click="showOverlay = true" class="btn-danger-main">Jetzt Löschen</button>
        </div>
      </div>
    </div>

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
/* NAV & PAGE LAYOUT */
.top-left-nav { position: absolute; top: 30px; left: 30px; z-index: 100; }
.admin-spots-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding-bottom: 50px; }
/* Header-Breite erhöht */
.header-section { width: 100%; max-width: 800px; padding: 40px 20px; }

/* LIST VIEW */
.menu-card {
  background: #4a90e2;
  border-radius: 30px;
  width: 100%; /* Nutzt mehr verfügbaren Platz */
  max-width: 800px; /* Breite von 380px auf 800px erhöht */
  padding: 30px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.inner-search { width: 100%; padding: 15px; border-radius: 20px; border: none; margin-bottom: 20px; outline: none; font-size: 16px; }
.spot-list-scroll { overflow-y: auto; max-height: 60vh; padding-right: 10px; }
.spot-card-item {
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex; /* Name und Buttons nebeneinander bei breiter Karte */
  justify-content: space-between;
  align-items: center;
}
.btn-action-light { background: #a1c9f1; border: none; color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; cursor: pointer; margin-left: 10px; }

/* DETAIL VIEW */
.detail-card {
  background: #eef7ff;
  border-radius: 30px;
  width: 95%;
  max-width: 900px; /* Deutlich breiter für die Detailansicht */
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.spot-img {
  width: 100%;
  max-height: 400px; /* Verhindert, dass das Bild bei breiter Karte zu hoch wird */
  border-radius: 20px;
  object-fit: cover;
}
.description-area { background: #d4e9ff; padding: 25px; border-radius: 20px; text-align: left; margin: 20px 0; font-size: 16px; }

/* REVIEWS MODERATION */
.admin-reviews-container {
  margin-top: 30px;
  text-align: left;
  background: white;
  padding: 25px;
  border-radius: 20px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #c0d9eb;
}
.admin-reviews-container h4 { color: #4a90e2; margin-bottom: 15px; font-size: 20px; }

/* BUTTONS & OVERLAYS */
.action-footer-btns { display: flex; gap: 20px; margin-top: 30px; justify-content: center; }
.action-footer-btns button { max-width: 250px; } /* Verhindert, dass Buttons zu riesig werden */

.btn-confirm-main, .btn-danger-main { background: #6ab0e5; color: white; border: none; padding: 15px; border-radius: 25px; flex: 1; font-weight: bold; font-size: 16px; cursor: pointer; }
.btn-reject-main { background: #8ec5ef; color: white; border: none; padding: 15px; border-radius: 25px; flex: 1; font-weight: bold; cursor: pointer; }

.overlay-card { background: #2a8df2; color: white; padding: 35px; border-radius: 30px; width: 450px; text-align: center; }
</style>