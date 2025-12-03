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
    const res = await fetch(`${import.meta.env.VITE_API_URL}posts/${route.params.id}`);
    const data = await res.json();

    title.value = data.title;
    category.value = "Kategorie";
    location.value = "Konstanz";
    description.value = data.body;
    image.value = `https://picsum.photos/600/400?random=${data.id}`;
  } catch (err) {
    console.error("Fehler beim Laden:", err);
  }
});

// Speichern
function saveSpot() {
  alert("Änderungen gespeichert! (Fake-REST)");
  router.push(`/spot/${route.params.id}`);
}

// Löschen
function deleteSpot() {
  if (confirm("Willst du diesen Spot wirklich löschen?")) {
    alert("Spot gelöscht! (Fake-REST)");
    router.push("/");
  }
}
</script>

<template>

  <!-- Hintergrund wie SpotDetail -->
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

    <!-- ⭐ GRAUER KASTEN – wie bei SpotDetail -->
    <div class="edit-card">

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
/* ───────── Hintergrund ───────── */
.background {
  position: fixed;
  inset: 0;
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

/* ───────── Inhalt ───────── */
.wrapper {
  text-align: center;
  margin-top: 130px;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  margin-bottom: 25px;
}

/* ⭐ GRAUER KARTEN-KASTEN */
.edit-card {
  width: 480px;
  margin: 0 auto;
  background: rgba(235, 235, 235, 0.9);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

/* ───────── Bild ───────── */
.image-box img {
  width: 100%;
  border-radius: 15px;
  margin-bottom: 12px;
}

.placeholder {
  width: 100%;
  height: 180px;
  background: #fff;
  border-radius: 15px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

/* ───────── Inputs ───────── */
.input {
  width: 100%;
  padding: 14px;
  border-radius: 25px;
  border: none;
  margin: 12px 0;
  font-size: 16px;
  background: white;
}

.textarea {
  width: 100%;
  height: 140px;
  padding: 14px;
  border-radius: 20px;
  border: none;
  margin: 12px 0;
  font-size: 16px;
  background: white;
}

/* ───────── Buttons ───────── */
.save-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;
}

.save-btn:hover {
  background: #1b82e9;
  transform: translateY(-2px);
}

.delete-btn {
  width: 100%;
  background: #ff4d4d;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;
}

.delete-btn:hover {
  background: #ff1a1a;
  transform: translateY(-2px);
}
</style>
