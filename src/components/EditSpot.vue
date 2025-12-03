<!-- src/components/EditSpot.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const title = ref("");
const category = ref("");
const location = ref("");
const description = ref("");
const image = ref("");

// Spot laden
onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${route.params.id}`);
    const data = await res.json();

    title.value = data.title;
    category.value = "Kategorie";       // Dummy: API hat keine Kategorie
    location.value = "Konstanz";       // Dummy
    description.value = data.body;
    image.value = `https://picsum.photos/600/400?random=${data.id}`;

  } catch (err) {
    console.error("Fehler beim Laden:", err);
  }
});

// Speichern (Fake)
function saveSpot() {
  alert("Änderungen gespeichert! (Fake-REST)");
  router.push(`/spot/${route.params.id}`);
}

// Löschen (Fake)
function deleteSpot() {
  if (confirm("Willst du diesen Spot wirklich löschen?")) {
    alert("Spot gelöscht! (Fake-REST)");
    router.push("/");
  }
}
</script>

<template>

  <!-- Hintergrund wie bei CreateSpot -->
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

  <div class="wrapper">
    <h1 class="title">Spot bearbeiten</h1>

    <div class="card">

      <!-- Bild-Vorschau -->
      <div class="image-box">
        <img v-if="image" :src="image" alt="Spot Bild">
        <div v-else class="placeholder">📷 Bild hinzufügen</div>

        <input 
          type="text"
          placeholder="Bild-URL eingeben"
          v-model="image"
          class="input"
        >
      </div>

      <!-- Titel -->
      <input class="input" v-model="title" placeholder="Titel">

      <!-- Kategorie -->
      <input class="input" v-model="category" placeholder="Kategorie">

      <!-- Standort -->
      <input class="input" v-model="location" placeholder="Standort">

      <!-- Beschreibung -->
      <textarea 
        class="textarea"
        v-model="description"
        placeholder="Beschreibung"
      ></textarea>

      <!-- Buttons -->
      <button class="save-btn" @click="saveSpot">Änderungen speichern</button>
      <button class="delete-btn" @click="deleteSpot">Spot löschen</button>

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

/* Buttons */
.save-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
}

.save-btn:hover {
  background: #5dade2;
}

.delete-btn {
  width: 100%;
  background: #ff4d4d;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #ff1a1a;
}
</style>
