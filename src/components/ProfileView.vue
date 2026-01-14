<template>
  <div class="profile-page">
    <div class="top-left-nav">
      <router-link to="/">
        <Button variant="secondary" round>&lt;</Button>
      </router-link>
    </div>

    <div class="content-wrapper">
      <h1 class="main-title">Profil</h1>

      <div class="profile-card">
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

      <div class="stats-grid">
        <router-link to="/meine-spots" class="stat-card">
          <h3>Meine Spots</h3>
          <p>Hier verwalten</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Button from "@/components/Button.vue";

const { user, getAccessTokenSilently } = useAuth0();
const API = import.meta.env.VITE_API_URL;

const username = ref("");
const isEditing = ref(false);
const originalUsername = ref("");

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

async function saveProfile() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ enabled: true, username: username.value })
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
.top-left-nav { position: absolute; top: 20px; left: 20px; z-index: 100; }
.profile-page { position: relative; min-height: 100vh; padding-top: 80px; display: flex; justify-content: center;}
.content-wrapper { width: 95%; max-width: 500px; }
.main-title { color: #0084ff; font-size: 48px; font-weight: 800; margin-bottom: 25px; }


.profile-card { background: #6eb5f3; padding: 25px; border-radius: 30px; box-shadow: 0 8px 20px rgba(0,132,255,0.15); }

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
input::placeholder { color: rgba(255,255,255,0.6); }

.actions { margin-top: 25px; }
.edit-actions { display: flex; gap: 10px; }

.stats-grid { margin-top: 20px; }
.stat-card {
  display: block;
  background: white;
  padding: 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
.stat-card:hover { transform: translateY(-3px); }
.stat-card h3 { margin: 0; color: #0084ff; }
.stat-card p { margin: 5px 0 0; font-size: 14px; color: #666; }
</style>