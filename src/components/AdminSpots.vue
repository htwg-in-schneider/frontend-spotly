<template>
  <div class="admin-spots-page">
    <div class="header-section">
      <button @click="goBack" class="back-link">
        <span class="arrow">←</span> Dashboard
      </button>
      <h1 class="page-title-styled">Admin Dashboard</h1>
    </div>

    <div class="content-wrapper">
      <div v-if="currentView === 'list'" class="menu-card">
        <div class="menu-header">
          Orte verwalten <span class="chevron"></span>
        </div>
        <div class="search-container">
          <input v-model="searchQuery" placeholder="Spot suchen..." class="inner-search" />
        </div>

        <div class="spot-list-scroll">
          <div v-if="filteredSpots.length === 0" class="no-results-msg">
            <span class="no-data-icon">📍</span>
            Kein Ort gefunden.
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
            <p><strong>Kategorie:</strong> {{ selectedSpot.category }}</p>
            <p><strong>Standort:</strong> {{ selectedSpot.location }}</p>
          </div>
          <div class="description-area">
            <strong>Beschreibung:</strong>
            <p>{{ selectedSpot.description }}</p>
          </div>
        </div>

        <div class="action-footer-btns">
          <template v-if="activeMode === 'check'">
            <button @click="showOverlay = true" class="btn-confirm-main">Veröffentlichen</button>
            <button @click="goBack" class="btn-reject-main">Ablehnen</button>
          </template>
          <button v-else @click="showOverlay = true" class="btn-danger-main">Löschen</button>
        </div>
      </div>
    </div>

    <div v-if="showOverlay" class="overlay-backdrop">
      <div class="overlay-card">
        <template v-if="activeMode === 'delete'">
          <p>Sind Sie sicher, dass Sie diesen Ort löschen möchten?</p>
          <div class="overlay-btns">
            <button @click="confirmDelete" class="btn-overlay">Ja, löschen</button>
            <button @click="showOverlay = false" class="btn-overlay-alt">Abbrechen</button>
          </div>
        </template>

        <template v-else>
          <p>Möchten Sie diesen Ort wirklich veröffentlichen?</p>
          <textarea
              v-model="reason"
              placeholder="Begründung (mind. 10 Zeichen)..."
              class="reason-input"
              :class="{ 'input-error': reason.length > 0 && reason.length < 10 }"
          ></textarea>

          <div class="validation-msg" v-if="reason.length > 0 && reason.length < 10">
            Bitte noch {{ 10 - reason.length }} Zeichen eingeben...
          </div>

          <div class="overlay-btns">
            <button
                @click="confirmPublish"
                class="btn-overlay"
                :disabled="reason.length < 10"
            >
              Bestätigen
            </button>
            <button @click="showOverlay = false" class="btn-overlay-alt">Abbrechen</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  // Setup wird benötigt, um die Auth0-Funktionen in der Options-API nutzbar zu machen
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
      reason: '',
      // Falls du eine .env Datei nutzt, kannst du hier import.meta.env.VITE_API_URL nutzen
      apiBaseUrl: 'http://localhost:8080/api/spots'
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
      if (this.currentView === 'detail') {
        this.currentView = 'list';
      } else {
        this.$router.push('/admin');
      }
      this.reason = '';
    },

    openDetail(spot, mode) {
      this.selectedSpot = spot;
      this.activeMode = mode;
      this.currentView = 'detail';
      this.showOverlay = false;
      this.reason = '';
    },

    async confirmDelete() {
      try {
        // Holt das Token von Auth0
        const token = await this.getAccessTokenSilently();

        const response = await fetch(`${this.apiBaseUrl}/${this.selectedSpot.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Löschen fehlgeschlagen (403 oder 401)");

        this.showOverlay = false;
        this.currentView = 'list';
        await this.fetchSpots(); // Liste aktualisieren
        alert("Ort erfolgreich gelöscht!");
      } catch (e) {
        console.error("Auth0 Fehler beim Löschen:", e);
        alert("Du hast keine Berechtigung, diesen Ort zu löschen.");
      }
    },

    async confirmPublish() {
      if (this.reason.length >= 10) {
        try {
          const token = await this.getAccessTokenSilently();

          // Hier senden wir ein PUT oder POST ans Backend, um den Status zu ändern
          // Ich nehme an, das Backend erwartet das Token auch hier zur Absicherung
          const response = await fetch(`${this.apiBaseUrl}/${this.selectedSpot.id}/publish`, {
            method: 'PUT', // oder 'POST', je nach deiner Backend-API
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason: this.reason })
          });

          if (!response.ok) throw new Error("Veröffentlichen fehlgeschlagen");

          alert("Ort erfolgreich mit Begründung veröffentlicht!");
          this.showOverlay = false;
          this.currentView = 'list';
          this.reason = '';
          await this.fetchSpots();
        } catch (e) {
          console.error("Fehler beim Veröffentlichen:", e);
          alert("Aktion konnte nicht ausgeführt werden.");
        }
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
  position: relative;
  padding-bottom: 100px;
}

.header-section {
  width: 100%;
  max-width: 500px;
  padding: 60px 20px 20px 20px;
  position: relative;
  text-align: center;
}

.back-link {
  position: absolute; left: 0; top: 40px;
  background: none; border: none;
  color: #4a90e2; font-weight: bold; cursor: pointer; font-size: 16px;
}

.page-title-styled {
  color: #4a90e2; font-size: 42px; font-weight: 900;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2); margin: 0;
}

.content-wrapper {
  flex: 1; width: 100%; display: flex; justify-content: center; padding: 20px;
}

.menu-card {
  background: #4a90e2; border-radius: 30px; width: 100%; max-width: 380px;
  padding: 25px; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex; flex-direction: column;
}

.menu-header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }

.inner-search {
  width: 100%; padding: 12px 20px; border-radius: 20px; border: none;
  margin-bottom: 20px; font-size: 16px; outline: none;
}

/* Scrollbereich für die Liste */
.spot-list-scroll {
  flex: 1; overflow-y: auto; max-height: 400px;
}

/* NEU: Styling für die "Kein Ort gefunden" Meldung */
.no-results-msg {
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-weight: bold;
}

.no-data-icon { display: block; font-size: 30px; margin-bottom: 10px; }

.spot-card-item {
  background: rgba(255,255,255,0.2); border-radius: 20px;
  padding: 20px; margin-bottom: 15px;
}

.spot-name { font-size: 18px; font-weight: bold; display: block; margin-bottom: 15px; }

.item-actions { display: flex; gap: 10px; }

.btn-action-light {
  background: #a1c9f1; border: none; color: white; padding: 10px;
  border-radius: 15px; flex: 1; font-weight: bold; cursor: pointer;
}

.detail-card {
  background: #eef7ff; border-radius: 30px; width: 100%; max-width: 380px;
  padding: 20px; text-align: center;
}

.sub-view-title { color: #4a90e2; margin-bottom: 20px; font-weight: 800; }

.spot-img { width: 100%; border-radius: 20px; height: 200px; object-fit: cover; }

.preview-name { font-size: 22px; margin: 15px 0; font-weight: 800; }

.info-grid { text-align: left; font-size: 15px; margin-bottom: 15px; }

.description-area {
  background: #d4e9ff; padding: 15px; border-radius: 20px;
  text-align: left; font-size: 14px; line-height: 1.4;
}

.action-footer-btns { display: flex; gap: 10px; margin-top: 25px; }

.btn-confirm-main, .btn-danger-main {
  background: #6ab0e5; color: white; border: none; padding: 15px;
  border-radius: 25px; flex: 1; font-weight: bold; font-size: 16px;
}
.btn-reject-main { background: #8ec5ef; color: white; border: none; padding: 15px; border-radius: 25px; flex: 1; font-weight: bold; }

.overlay-backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.overlay-card {
  background: #2a8df2; color: white; padding: 30px; border-radius: 30px; width: 320px; text-align: center;
}

.reason-input {
  width: 100%; height: 100px; border-radius: 15px; padding: 12px;
  margin: 15px 0 5px 0; border: 2px solid transparent; outline: none;
}

.input-error { border: 2px solid #ff4d4d; background-color: #fff0f0; color: #333; }

.validation-msg { font-size: 11px; color: #ffcccc; margin-bottom: 15px; text-align: left; }

.btn-overlay:disabled { background-color: #888 !important; opacity: 0.6; cursor: not-allowed; }

.overlay-btns { display: flex; gap: 10px; margin-top: 10px;}
.btn-overlay, .btn-overlay-alt {
  background: #8ec5ef; border: none; color: white; padding: 12px;
  border-radius: 20px; flex: 1; cursor: pointer; font-weight: bold;
}
</style>