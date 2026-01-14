<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "@/components/Button.vue";

const router = useRouter();
const { getAccessTokenSilently } = useAuth0();

const systemStatus = ref({ db: 'checking', backend: 'checking' });
const logs = ref([]);
const searchQuery = ref('');

// Echte Logs vom Backend laden
const fetchLogs = async () => {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch('https://backend-spotly.onrender.com/api/admin/logs', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      logs.value = await res.json();
      systemStatus.value = { db: 'online', backend: 'online' };
    } else {
      systemStatus.value = { db: 'error', backend: 'offline' };
    }
  } catch (e) {
    console.error("Fehler beim Laden der Logs:", e);
    systemStatus.value = { db: 'offline', backend: 'offline' };
  }
};

// Filter-Logik für die Suche (sucht in Aktion, Admin-Name und Details)
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const term = searchQuery.value.toLowerCase();
    return log.action.toLowerCase().includes(term) ||
        log.adminName.toLowerCase().includes(term) ||
        log.details.toLowerCase().includes(term);
  });
});

const formatTime = (timestamp) => {
  if (!timestamp) return "--:--";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Hilfsfunktion für farbige Badges je nach Aktion
const getActionClass = (action) => {
  if (action.includes('LOCKED') || action.includes('DELETE')) return 'tag-red';
  if (action.includes('CREATED') || action.includes('UNLOCKED')) return 'tag-green';
  return 'tag-default';
};

const goBack = () => router.push('/admin');

onMounted(fetchLogs);
</script>

<template>
  <div class="admin-support-page">
    <header class="header-section">
      <div class="top-left-nav">
        <Button variant="secondary" round @click="goBack">&lt;</Button>
      </div>
      <h1 class="page-title-styled">System & Support</h1>
    </header>

    <div class="content-wrapper">
      <div class="status-grid">
        <div class="status-card">
          <span class="status-icon">🗄️</span>
          <div class="status-info">
            <label>Datenbank Status</label>
            <span :class="['status-badge', systemStatus.db]">{{ systemStatus.db }}</span>
          </div>
        </div>
        <div class="status-card">
          <span class="status-icon">🚀</span>
          <div class="status-info">
            <label>Backend API</label>
            <span :class="['status-badge', systemStatus.backend]">{{ systemStatus.backend }}</span>
          </div>
        </div>
      </div>

      <div class="search-pill">
        <span class="icon">🔍</span>
        <input v-model="searchQuery" placeholder="Logs durchsuchen..." class="search-input" />
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="col">Zeit</div>
          <div class="col">Aktion</div>
          <div class="col">Details</div>
        </div>

        <div class="table-body">
          <div v-if="filteredLogs.length === 0" class="no-data-row">
            Keine passenden System-Ereignisse gefunden.
          </div>

          <div v-for="log in filteredLogs" :key="log.id" class="table-row">
            <div class="col l-time">{{ formatTime(log.timestamp) }}</div>
            <div class="col">
              <span class="action-tag" :class="getActionClass(log.action)">{{ log.action }}</span>
            </div>
            <div class="col l-msg">
              <strong>{{ log.adminName }}:</strong> {{ log.details }}
            </div>
          </div>
        </div>
      </div>

      <div class="action-footer">
        <button @click="fetchLogs" class="btn-tool">Aktualisieren 🔄</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-support-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
}

.header-section {
  width: 100%;
  max-width: 1000px;
  padding: 60px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.top-left-nav { position: absolute; left: 20px; }
.page-title-styled {
  color: #5daae0;
  font-size: clamp(24px, 6vw, 42px); /* Flüssige Größe für Mobile */
  font-weight: 900;
  margin: 0;
  text-align: center;
}

.content-wrapper {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Status Kacheln */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
  width: 100%;
}

.status-card {
  background: white;
  border-radius: 25px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.status-icon { font-size: 32px; }
.status-info label { display: block; font-size: 10px; color: #888; font-weight: bold; text-transform: uppercase; }
.status-badge { font-weight: 900; font-size: 16px; text-transform: uppercase; }
.status-badge.online { color: #4cd137; }
.status-badge.checking { color: #f1c40f; }
.status-badge.offline, .status-badge.error { color: #ff4d4d; }

/* Suche */
.search-pill {
  background: white;
  padding: 12px 25px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.search-input {
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
  font-size: 16px;
}

/* Tabelle */
.table-card {
  background-color: #2a8df2;
  border-radius: 30px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  color: white;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 100px 150px 1fr; /* Spaltenbreiten optimiert */
  padding: 20px 30px;
  align-items: center;
}

.table-header {
  font-weight: 900;
  font-size: 16px;
  background: rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.table-body { max-height: 50vh; overflow-y: auto; }
.table-row { border-bottom: 1px solid rgba(255,255,255,0.1); transition: 0.2s; }
.table-row:hover { background: rgba(255,255,255,0.05); }

.action-tag {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
}

.tag-red { background: #ff4d4d !important; color: white; }
.tag-green { background: #4cd137 !important; color: white; }
.tag-default { background: rgba(255, 255, 255, 0.2); }

.l-time { font-family: monospace; font-weight: bold; opacity: 0.9; font-size: 14px; }
.l-msg { font-size: 15px; line-height: 1.4; }
.l-msg strong { color: #b2f2bb; font-weight: bold; margin-right: 5px; }

.no-data-row { padding: 60px 20px; text-align: center; font-weight: bold; opacity: 0.8; }

/* Footer Buttons */
.action-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
  width: 100%;
}

.btn-tool {
  background: #5daae0;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(93, 170, 224, 0.3);
}

.btn-tool:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(93, 170, 224, 0.4); }

/* RESPONSIVE ANPASSUNGEN */
@media (max-width: 850px) {
  .table-header { display: none; } /* Versteckt Header auf kleinen Screens */

  .table-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 8px;
  }

  .l-time { font-size: 12px; opacity: 0.7; }

  .action-tag { margin-bottom: 5px; }
}

@media (max-width: 600px) {
  .status-grid {
    grid-template-columns: 1fr; /* Kacheln untereinander */
  }

  .header-section {
    padding-top: 80px;
  }

  .top-left-nav {
    top: 20px;
  }

  .btn-tool {
    width: 100%; /* Buttons auf Handy volle Breite */
    max-width: 300px;
  }
}
</style>