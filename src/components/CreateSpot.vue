<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import Button from "./Button.vue"; // Button Komponente importieren

const API_URL = import.meta.env.VITE_API_URL + "/spots";
const router = useRouter();
const { getAccessTokenSilently } = useAuth0();

const title = ref("");
const location = ref("");
const category = ref("");
const description = ref("");
const image = ref("");

const categories = [
  "Natur & Aussicht",
  "Shops & Märkte",
  "Events & Kultur",
  "Cafés & Essen",
  "Sport & Freizeit",
  "Andere"
];

async function createSpot() {
  if (!title.value || !category.value) {
    alert("Bitte mindestens Name und Kategorie angeben.");
    return;
  }

  const spotData = {
    title: title.value,
    category: category.value,
    description: description.value,
    imageUrl: image.value,
    location: location.value,
  };

  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(spotData),
    });

    if (res.ok) {
      alert(`Spot '${title.value}' wurde erfolgreich erstellt!`);
      router.push('/spots');
    } else {
      alert(`Fehler beim Erstellen: ${res.status}`);
    }
  } catch (err) {
    console.error("Verbindungsfehler:", err);
    alert("Spot konnte nicht erstellt werden.");
  }
}
</script>

<template>
  <div class="create-page">
    <div class="top-left-nav">
      <Button variant="secondary" round @click="router.push('/spots')">&lt;</Button>
    </div>

    <div class="wrapper">
      <h1 class="main-title">Neuen Spot erstellen</h1>

      <div class="card">
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

        <input class="input" type="text" placeholder="Name" v-model="title">

        <select class="input select-input" v-model="category">
          <option value="" disabled>Kategorie wählen</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <input class="input" type="text" placeholder="Standort" v-model="location">

        <textarea
            class="textarea"
            placeholder="Beschreibung hinzufügen..."
            v-model="description"
        ></textarea>

        <Button
            style="width: 100%; padding: 15px; margin-top: 10px;"
            @click="createSpot"
        >
          Spot erstellen
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f7ff 0%, #c9e4ff 100%);
  padding-bottom: 50px;
}

.top-left-nav {
  position: absolute;
  top: 20px;
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

.card {
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Bild & Platzhalter */
.image-box img {
  width: 100%;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 10px;
}

.placeholder-container {
  width: 100%;
  height: 180px;
  background: #f9f9f9;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  margin-bottom: 15px;
}

.placeholder-icon {
  width: 60px !important;
  height: auto !important;
  opacity: 0.2;
}

/* Form Styling */
.input {
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  background: #fafafa;
  font-size: 16px;
  outline: none;
}

.select-input {
  cursor: pointer;
  color: #555;
}

.textarea {
  width: 100%;
  height: 120px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  background: #fafafa;
  font-size: 16px;
  outline: none;
  resize: none;
}

.input:focus, .textarea:focus {
  border-color: #0084ff;
}
</style>