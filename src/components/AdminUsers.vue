<template xmlns="http://www.w3.org/1999/html">
  <div class="admin-users-page">
    <header class="header-section">
      <div class="top-left-nav">
        <router-link to="/admin">
          <Button variant="secondary" round>&lt;</Button>
        </router-link>
      </div>
      <h1 class="page-title-styled">Benutzer verwalten</h1>
    </header>

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
            Keine Benutzer gefunden.
          </div>

          <div v-for="user in filteredUsers" :key="user.id" class="table-row" :class="{ 'row-locked': user.enabled === false }">
            <div class="col username">
              {{ user.username }}
              <span v-if="user.enabled === false" class="lock-badge">Gesperrt</span>
            </div>
            <div class="col email">{{ user.email || 'keine@mail.de' }}</div>
            <div class="col actions">
              <button
                  v-if="user.enabled !== false"
                  @click="triggerAction(user, 'lock')"
                  class="btn-table"
              >sperren</button>

              <button
                  v-else
                  @click="triggerAction(user, 'unlock')"
                  class="btn-table btn-green"
              >freigeben</button>

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
        <p v-else-if="activeMode === 'unlock'">
          Benutzer <strong>{{ selectedUser?.username }}</strong> wieder freigeben?
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
          <button @click="showOverlay = false" class="btn-overlay-alt">Abbrechen</button>
          <button
              @click="handleConfirm"
              class="btn-overlay"
              :disabled="activeMode === 'lock' && reason.length < 10">
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "@/components/Button.vue";

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
    const res = await fetch('https://backend-spotly.onrender.com/api/users', {
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
    const url = `https://backend-spotly.onrender.com/api/users/${selectedUser.value.id}`;

    let method = activeMode.value === 'delete' ? 'DELETE' : 'PUT';
    let body = null;

    if (activeMode.value === 'lock') {
      body = JSON.stringify({
        ...selectedUser.value,
        enabled: false,
        role: 'LOCKED' // Wir behalten die Rolle zur Sicherheit bei
      });
    } else if (activeMode.value === 'unlock') {
      body = JSON.stringify({
        ...selectedUser.value,
        enabled: true,
        role: 'USER'
      });
    }

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
      await fetchUsers();
    }
  } catch (e) {
    console.error("Aktion fehlgeschlagen:", e);
  }
};

onMounted(fetchUsers);
</script>

Hier ist der bereinigte CSS-Code, der exakt auf dein Template abgestimmt ist. Ich habe die Fehler in der Verschachtelung korrigiert (die .admin-users-page saß fälschlicherweise innerhalb der .header-section) und die absolute Positionierung für den Button sowie die Zentrierung der Tabelle umgesetzt.
CSS

<style scoped>
.admin-users-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

.top-left-nav {
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}

.page-title-styled {
  color: #5daae0;
  font-size: clamp(24px, 6vw, 42px);
  font-weight: 900;
  margin: 0;
  text-align: center;
}


.content-wrapper {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

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
  grid-template-columns: 1.2fr 1.5fr 1.2fr;
  padding: 20px 30px;
  align-items: center;
}

.table-header {
  font-weight: 900;
  font-size: 18px;
  background: rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.table-row {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: background 0.2s;
}

.table-row:hover {
  background: rgba(255,255,255,0.05);
}

.username {
  font-weight: bold;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.email {
  font-size: 15px;
  word-break: break-all;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}


.btn-table {
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  color: white;
  background: #a1c9f1;
  white-space: nowrap;
}

.btn-green { background: #4cd137; }
.btn-red { background: #ff6b6b; }


@media (max-width: 768px) {
  .table-header {
    display: none;
  }

  .table-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 25px;
  }

  .username {
    font-size: 1.2rem;
    width: 100%;
    justify-content: space-between;
  }

  .email {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 5px;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-table {
    flex: 1;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding-top: 80px;
  }

  .top-left-nav {
    top: 20px;
  }

  .overlay-card {
    padding: 25px;
  }
}

.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 20px;
}

.overlay-card {
  background: #2a8df2;
  color: white;
  padding: 40px;
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.reason-input {
  width: 100%;
  height: 100px;
  border-radius: 15px;
  padding: 15px;
  margin: 15px 0 5px;
  border: none;
  font-family: inherit;
  box-sizing: border-box;
}

.overlay-btns {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-overlay, .btn-overlay-alt {
  padding: 14px;
  border-radius: 20px;
  flex: 1;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn-overlay { background: #ff4757; color: white; }
.btn-overlay-alt { background: rgba(255,255,255,0.2); color: white; }

.btn-overlay:disabled {
  background: #888;
  opacity: 0.6;
}
</style>