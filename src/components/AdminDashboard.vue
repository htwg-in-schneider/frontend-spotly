<template>
  <div class="admin-profile-page">

    <div class="main-container">

      <div class="profile-column">
        <h2 class="column-title">Profil</h2>

        <div class="avatar-section">
          <img :src="user?.picture" alt="Avatar" class="profile-avatar" />
          <p class="auth0-id">ID: {{ user?.sub }}</p>
        </div>

        <div class="info-group">
          <label>Benutzername</label>
          <div class="input-wrapper">
            <input
                type="text"
                v-model="username"
                :disabled="!isEditing"
                placeholder="Dein Username..."
            >
          </div>
        </div>

        <div class="info-group">
          <label>E-Mail (Auth0)</label>
          <div class="input-wrapper disabled">
            <input type="text" :value="user?.email" disabled>
          </div>
        </div>

        <div class="actions">
          <Button v-if="!isEditing" @click="isEditing = true" style="width: 100%">
            Profil bearbeiten
          </Button>

          <div v-else class="edit-actions">
            <Button @click="saveProfile" style="flex: 1">Speichern</Button>
            <Button variant="secondary" @click="cancelEdit" style="flex: 1">Abbrechen</Button>
          </div>
        </div>
      </div>

      <div class="vertical-divider"></div>

      <div class="admin-column">
        <h2 class="column-title">Admin Dashboard ⚙️</h2>

        <div class="menu-container">
          <button @click="router.push('/admin/spots')" class="menu-btn">
            Orte verwalten
            <span class="arrow">>></span>
          </button>

          <button @click="router.push('/admin/users')" class="menu-btn">
            Benutzer verwalten
            <span class="arrow">>></span>
          </button>

          <button @click="router.push('/admin/support')" class="menu-btn">
            Support
            <span class="arrow">>></span>
          </button>

          <router-link to="/meine-spots" class="stat-link-card">
            <h3>Meine Spots</h3>
            <p>Hier verwalten</p>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "@/components/Button.vue";

const router = useRouter();
const { user, getAccessTokenSilently } = useAuth0();
const API = import.meta.env.VITE_API_URL;

const username = ref("");
const isEditing = ref(false);
const originalUsername = ref("");

// Benutzerdaten laden (Original-Logik)
async function loadUserData() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      username.value = data.username;
      originalUsername.value = data.username;
    }
  } catch (err) {
    console.error("Fehler beim Laden des Profils:", err);
  }
}

// Profil speichern (Original-Logik mit /users/me)
async function saveProfile() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username: username.value })
    });

    if (res.ok) {
      isEditing.value = false;
      originalUsername.value = username.value;
      alert("Profil aktualisiert!");
    }
  } catch (err) {
    alert("Fehler beim Speichern.");
  }
}

function cancelEdit() {
  username.value = originalUsername.value;
  isEditing.value = false;
}

onMounted(loadUserData);
</script>

<style scoped>

.admin-profile-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px 40px 20px;
}

/* Der große blaue Kasten */
.main-container {
  background: #6eb5f3;
  width: 100%;
  max-width: 950px;
  display: flex;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0,132,255,0.15);
  gap: 40px;
}

.column-title {
  color: white;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 25px;
  text-align: center;
}

/* Profil Spalte */
.profile-column { flex: 1; }

.avatar-section { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }
.profile-avatar { width: 90px; height: 90px; border-radius: 50%; border: 4px solid white; margin-bottom: 10px; }
.auth0-id { font-size: 10px; color: rgba(255, 255, 255, 0.7); }

.info-group { margin-bottom: 15px; }
.info-group label { display: block; color: white; font-size: 14px; font-weight: 600; margin-bottom: 5px; margin-left: 10px; }

.input-wrapper {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 10px 15px;
  display: flex;
}
.input-wrapper.disabled { background: rgba(0, 0, 0, 0.05); }

input { background: transparent; border: none; color: white; width: 100%; outline: none; font-size: 16px; }
input:disabled { color: rgba(255,255,255,0.8); cursor: not-allowed; }

.edit-actions { display: flex; gap: 10px; }

/* Trenner */
.vertical-divider { width: 1px; background: rgba(255, 255, 255, 0.3); }

/* Admin Spalte */
.admin-column { flex: 1; }

.menu-btn {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0084ff;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.arrow { margin-left: auto; }

.stat-link-card {
  display: block;
  background: white;
  padding: 15px;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.stat-link-card h3 { margin: 0; color: #0084ff; font-size: 18px; }
.stat-link-card p { margin: 5px 0 0; font-size: 14px; color: #666; }

@media (max-width: 850px) {
  .main-container { flex-direction: column; }
  .vertical-divider { display: none; }
}
</style>
