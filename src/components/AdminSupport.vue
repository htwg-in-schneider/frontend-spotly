<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Logs als reaktive Referenz
const logs = ref([
  { time: "14:02", msg: "Admin eingeloggt." },
  { time: "14:05", msg: "GET /api/users erfolgreich (200 OK)" },
  { time: "14:10", msg: "Neuer Spot 'Campus Festival' zur Prüfung eingereicht." },
  { time: "14:12", msg: "Datenbank-Synchronisation abgeschlossen." }
]);

const contactSupport = () => {
  alert("Support-Anfrage wurde an support@spotly.de gesendet.");
};

const clearLogs = () => {
  logs.value = [{ time: "JETZT", msg: "Logs wurden vom Administrator bereinigt." }];
};

const goBack = () => {
  router.push('/admin');
};
</script>

<template>
  <div class="admin-support-page">
    <div class="header-section">
      <button @click="goBack" class="back-link">
        <span class="arrow">←</span> Dashboard
      </button>
      <h1 class="page-title-styled">Support & Logs</h1>
    </div>

    <div class="content-wrapper">
      <div class="support-card">
        <div class="menu-header">
          System Status <span class="icon">🛠️</span>
        </div>

        <div class="status-box">
          <div class="status-item">
            <span>Datenbank (MariaDB):</span>
            <span class="status-tag online">Verbunden</span>
          </div>
          <div class="status-item">
            <span>Backend (Spring Boot):</span>
            <span class="status-tag online">Aktiv</span>
          </div>
        </div>

        <div class="log-container">
          <div class="log-header">System-Logs (Echtzeit)</div>
          <div class="log-screen">
            <div v-for="(log, index) in logs" :key="index" class="log-line">
              <span class="log-time">[{{ log.time }}]</span> {{ log.msg }}
            </div>
          </div>
        </div>

        <div class="support-actions">
          <button @click="contactSupport" class="btn-support-white">
            📧 Hilfe anfordern
          </button>
          <button @click="clearLogs" class="btn-support-white">
            🗑️ Logs leeren
          </button>
        </div>
      </div>
    </div>

    <footer class="admin-footer">
      <p>© 2026 Spotly – Admin Support Panel</p>
    </footer>
  </div>
</template>

<style scoped>
.admin-support-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: transparent;
}

.header-section {
  width: 100%;
  max-width: 500px;
  padding: 60px 20px 20px;
  position: relative;
  text-align: center;
}

.back-link {
  position: absolute; left: 0; top: 40px;
  background: none; border: none;
  color: #4a90e2; font-weight: bold; cursor: pointer;
}

.page-title-styled {
  color: #4a90e2;
  font-size: 42px;
  font-weight: 900;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}

.content-wrapper { padding: 20px; width: 100%; display: flex; justify-content: center; }

/* Blaue Karte passend zu Orte/Dashboard */
.support-card {
  background: #4a90e2;
  border-radius: 30px;
  width: 100%;
  max-width: 380px;
  padding: 25px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.menu-header { font-size: 22px; font-weight: bold; margin-bottom: 20px; display: flex; justify-content: space-between; }

.status-box { margin-bottom: 20px; }
.status-item { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }

.status-tag.online { color: #00ff00; font-weight: bold; }

/* Log Screen Design */
.log-container {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
}
.log-header { font-size: 12px; font-weight: bold; margin-bottom: 10px; opacity: 0.8; }
.log-screen {
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  height: 100px;
  overflow-y: auto;
}
.log-line { margin-bottom: 4px; }
.log-time { color: #a1c9f1; }

.support-actions { display: flex; gap: 10px; }

.btn-support-white {
  background: white;
  color: #4a90e2;
  border: none;
  padding: 12px;
  border-radius: 20px;
  flex: 1;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
}

.admin-footer { position: absolute; bottom: 20px; color: #888; font-size: 14px; }
</style>