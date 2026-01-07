<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import Button from "./Button.vue";

const route = useRoute();
const router = useRouter();
const { getAccessTokenSilently } = useAuth0();

const API_BASE = import.meta.env.VITE_API_URL;

const title = ref("");
const category = ref("");
const location = ref("");
const description = ref("");
const image = ref("");

// Dieselben Kategorien wie in der Create-Seite
const categories = [
  "Natur & Aussicht",
  "Shops & Märkte",
  "Events & Kultur",
  "Cafés & Essen",
  "Sport & Freizeit",
  "Andere"
];

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/spots/${route.params.id}`);
    const data = await res.json();

    title.value = data.title;
    // Mapping: Wir nehmen den Namen, falls es ein Objekt ist, sonst den String direkt
    category.value = typeof data.category === 'object' ? data.category.name : data.category;
    location.value = data.location;
    description.value = data.description;
    image.value = data.imageUrl;
  } catch (err) {
    console.error("Fehler beim Laden:", err);
  }
});

async function saveSpot() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE}/spots/${route.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        category: category.value,
        location: location.value,
        description: description.value,
        imageUrl: image.value
      })
    });

    if (!res.ok) throw new Error("Fehler beim Speichern: " + res.status);
    router.push(`/spot/${route.params.id}`);
  } catch (err) {
    console.error(err);
    alert("Fehler beim Speichern");
  }
}

async function deleteSpot() {
  if (confirm("Willst du diesen Spot wirklich löschen?")) {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${API_BASE}/spots/${route.params.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Fehler beim Löschen");
      router.push("/my-own-spots");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen");
    }
  }
}
</script>

<template>
  <div class="edit-page">
    <div class="top-left-nav">
      <Button variant="secondary" round @click="router.back()" />
    </div>

    <div class="wrapper">
      <h1 class="main-title">Spot bearbeiten</h1>

      <div class="edit-card">
        <div class="image-box">
          <img v-if="image" :src="image" alt="Spot Bild">
          <div v-else class="placeholder-container">
            <img src="@/assets/img.png" alt="Platzhalter" class="placeholder-icon">
          </div>

          <input
              type="text"
              placeholder="Bild-URL eingeben"
              v-model="image"
              class="input"
          >
        </div>

        <input class="input" v-model="title" placeholder="Titel">

        <select class="input select-input" v-model="category">
          <option value="" disabled>Kategorie wählen</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <input class="input" v-model="location" placeholder="Standort">

        <textarea
            class="textarea"
            v-model="description"
            placeholder="Beschreibung"
        ></textarea>

        <Button
            style="width: 100%; margin-top: 15px; padding: 15px;"
            @click="saveSpot"
        >
          Änderungen speichern
        </Button>

        <Button
            variant="secondary"
            style="width: 100%; margin-top: 10px; padding: 15px; background-color: #ff4d4d; color: white;"
            @click="deleteSpot"
        >
          Spot löschen
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f7ff 0%, #c9e4ff 100%);
  padding-bottom: 50px;
}

/* Position unter dem Logo */
.top-left-nav {
  position: absolute;
  top: 150px;
  left: 20px;
  z-index: 100;
}

.wrapper {
  text-align: center;
  padding-top: 100px;
}

.main-title {
  color: #0084ff;
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 25px;
}

.edit-card {
  width: 90%;
  max-width: 480px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.image-box img {
  width: 100%;
  height: 220px;
  border-radius: 15px;
  margin-bottom: 12px;
  object-fit: cover;
}

.placeholder-container {
  width: 100%;
  height: 220px;
  background: #f9f9f9;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  margin-bottom: 12px;
}

.placeholder-icon {
  width: 60px !important;
  height: auto !important;
  opacity: 0.2;
}

.input {
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid #eee;
  margin: 8px 0;
  font-size: 16px;
  background: #fafafa;
  outline: none;
}

.select-input {
  cursor: pointer;
  color: #555;
}

.input:focus, .textarea:focus {
  border-color: #0084ff;
}

.textarea {
  width: 100%;
  height: 120px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid #eee;
  margin: 8px 0;
  font-size: 16px;
  background: #fafafa;
  outline: none;
  resize: none;
}
</style>