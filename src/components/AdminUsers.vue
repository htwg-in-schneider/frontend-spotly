<template>
  <div class="admin-users-page">
    <div class="header-section">
      <button @click="$router.push('/admin')" class="back-link">
        <span class="arrow">←</span> Dashboard
      </button>
      <h1 class="page-title-styled">Benutzer verwalten</h1>
    </div>

    <div class="content-wrapper">
      <div class="search-pill">
        <span class="icon">🔍</span>
        <input v-model="searchQuery" placeholder="Benutzer suchen..." class="search-input" />
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="col">Name</div>
          <div class="col">E-Mail</div>
          <div class="col">Aktion</div>
        </div>

        <div class="table-body">
          <div v-if="filteredUsers.length === 0" class="no-data-row">
            <span class="no-data-icon"></span> Keine Benutzer gefunden.
          </div>

          <div v-for="user in filteredUsers" :key="user.id" class="table-row">
            <div class="col username">{{ user.username }}</div>
            <div class="col email">{{ user.email || 'keine@mail.de' }}</div>
            <div class="col actions">
              <button @click="triggerAction(user, 'lock')" class="btn-table">sperren</button>
              <button @click="triggerAction(user, 'delete')" class="btn-table btn-red">löschen</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showOverlay" class="overlay-backdrop">
      <div class="overlay-card">
        <p v-if="activeMode === 'delete'">
          Benutzer <strong>{{ selectedUser?.username }}</strong> wirklich löschen?
        </p>
        <div v-else>
          <p>Warum wird <strong>{{ selectedUser?.username }}</strong> gesperrt?</p>
          <textarea
              v-model="reason"
              placeholder="Begründung (mind. 10 Zeichen)..."
              class="reason-input"
              :class="{ 'input-error': reason.length > 0 && reason.length < 10 }"
          ></textarea>
          <div class="validation-msg" v-if="reason.length > 0 && reason.length < 10">
            Noch {{ 10 - reason.length }} Zeichen benötigt...
          </div>
        </div>

        <div class="overlay-btns">
          <button
              @click="handleConfirm"
              class="btn-overlay"
              :disabled="activeMode === 'lock' && reason.length < 10"
          >
            Bestätigen
          </button>
          <button @click="showOverlay = false" class="btn-overlay-alt">Abbrechen</button>
        </div>
      </div>
    </div>

    <footer class="admin-footer">
      <p>© 2025 Spotly – Admin Panel</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

// Auth0 & Router
const { getAccessTokenSilently } = useAuth0();
const router = useRouter();

// State
const users = ref([]);
const searchQuery = ref('');
const showOverlay = ref(false);
const selectedUser = ref(null);
const activeMode = ref('');
const reason = ref('');

// Gefilterte Benutzer (Computed)
const filteredUsers = computed(() => {
  return users.value.filter(u =>
      u.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Daten vom Backend laden
const fetchUsers = async () => {
  try {
    // 1. Token von Auth0 holen
    const token = await getAccessTokenSilently();

    // 2. Mit Token anfragen
    const res = await fetch('http://localhost:8080/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      users.value = await res.json();
    } else {
      console.error("Server meldet Fehler:", res.status);
    }
  } catch (e) {
    console.error("Netzwerkfehler:", e);
  }
};

// Aktionen (Sperren/Löschen)
const triggerAction = (user, mode) => {
  selectedUser.value = user;
  activeMode.value = mode;
  reason.value = '';
  showOverlay.value = true;
};

const handleConfirm = async () => {
  try {
    const token = await getAccessTokenSilently();
    const url = `http://localhost:8080/api/users/${selectedUser.value.id}`;

    const method = activeMode.value === 'delete' ? 'DELETE' : 'PUT';
    const body = activeMode.value === 'lock'
        ? JSON.stringify({ ...selectedUser.value, role: 'LOCKED', lockReason: reason.value })
        : null;

    const res = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (res.ok) {
      showOverlay.value = false;
      await fetchUsers(); // Liste aktualisieren
    }
  } catch (e) {
    console.error("Aktion fehlgeschlagen:", e);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-users-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 80px;
}

.header-section {
  width: 100%;
  max-width: 800px;
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
  margin: 0;
}

.content-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-pill {
  background: white;
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.search-input { border: none; outline: none; margin-left: 10px; width: 100%; }

.table-card {
  background: rgba(173, 216, 245, 0.4);
  border-radius: 25px;
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  padding: 20px;
  font-weight: 900;
  color: #4a90e2;
  border-bottom: 1px solid rgba(255,255,255,0.3);
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  align-items: center;
}

/* FIX für das abgeschnittene "Keine Benutzer gefunden" */
.no-data-row {
  padding: 50px 20px;
  text-align: center;
  color: #4a90e2;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
}

.no-data-icon { display: block; font-size: 30px; margin-bottom: 10px; }

.username { font-weight: bold; font-size: 16px; }
.email { font-size: 14px; color: #444; }

.btn-table {
  background: white;
  border: none;
  padding: 8px 15px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  margin-right: 5px;
}

.btn-red { color: #ff4d4d; }

.overlay-backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}

.overlay-card {
  background: #2a8df2; color: white; padding: 30px; border-radius: 30px; width: 340px; text-align: center;
}

.reason-input {
  width: 100%; height: 80px; border-radius: 15px; padding: 12px; margin: 15px 0 5px 0; border: 2px solid transparent; outline: none;
}

.input-error { border: 2px solid #ff4d4d; background-color: #fff0f0; }

.validation-msg { font-size: 11px; color: #ffcccc; margin-bottom: 15px; text-align: left; }

.btn-overlay:disabled { background-color: #888 !important; opacity: 0.6; cursor: not-allowed; }

.overlay-btns { display: flex; gap: 10px; margin-top: 10px; }

.btn-overlay, .btn-overlay-alt {
  background: #8ec5ef; border: none; color: white; padding: 12px; border-radius: 20px; flex: 1; cursor: pointer; font-weight: bold;
}

.admin-footer { position: absolute; bottom: 20px; width: 100%; text-align: center; color: #888; font-size: 14px; }
</style>