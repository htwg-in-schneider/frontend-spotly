<!-- src/views/CreateSpot.vue -->
<script setup>
import { ref } from "vue";

const title = ref("");
const category = ref("");
const location = ref("");
const description = ref("");
const image = ref("");

function createSpot() {
  alert("Spot gespeichert (Fake-REST)!");
}
</script>

<template>

  <!-- Hintergrund (gleich wie Startseite) -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>

    <img 
      src="@/assets/background.jpeg" 
      alt="Background" 
      class="bg-image"
    >
  </div>

  <!-- Inhalt -->
  <div class="wrapper">
    <h1 class="title">Erstelle einen neuen Spot!</h1>

    <div class="card">

      <!-- Bild-Vorschau -->
      <div class="image-box">
        <img v-if="image" :src="image" alt="Spot Bild">
        <div v-else class="placeholder">
          📷 Bild hinzufügen
        </div>

        <input 
          type="text"
          placeholder="Bild-URL eingeben"
          v-model="image"
          class="input"
        >
      </div>

      <!-- Name -->
      <input 
        class="input"
        type="text"
        placeholder="Name"
        v-model="title"
      >

      <!-- Kategorie -->
      <input 
        class="input"
        type="text"
        placeholder="Kategorie"
        v-model="category"
      >

      <!-- Standort -->
      <input 
        class="input"
        type="text"
        placeholder="Standort"
        v-model="location"
      >

      <!-- Beschreibung -->
      <textarea 
        class="textarea"
        placeholder="Füge eine Beschreibung hinzu..."
        v-model="description"
      ></textarea>

      <button class="create-btn" @click="createSpot">
        Spot erstellen
      </button>
    </div>
  </div>

</template>

<style scoped>

/* Hintergrund */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}

.ellipse {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.ellipse1 {
  width: 800px;
  height: 400px;
  top: 0;
  left: -200px;
}

.ellipse2 {
  width: 900px;
  height: 500px;
  top: 200px;
  right: -300px;
}

.ellipse3 {
  width: 700px;
  height: 350px;
  bottom: -100px;
  left: 100px;
}

/* Inhalt */
.wrapper {
  text-align: center;
  margin-top: 80px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #0084ff;
  margin-bottom: 30px;
}

.card {
  width: 420px;
  margin: 0 auto;
  background: #b19884;
  padding: 30px;
  border-radius: 25px;
}

.image-box {
  text-align: center;
  margin-bottom: 20px;
}

.placeholder {
  width: 100%;
  height: 180px;
  background: white;
  border-radius: 15px;
  line-height: 180px;
  font-size: 22px;
}

.image-box img {
  width: 100%;
  border-radius: 15px;
  margin-bottom: 10px;
}

.image-box input {
  margin-top: 10px; /* sorgt für Abstand */
}


/* Inputs */
.input {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  margin-bottom: 15px;
}

.textarea {
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 20px;
  border: none;
  margin-bottom: 15px;
}

/* Button */
.create-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
}

.create-btn:hover {
  background: #5dade2;
}
</style>
