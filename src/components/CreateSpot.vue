<script setup>
import { ref } from "vue";

// Formular-Daten
const title = ref("");
const description = ref("");
const image = ref("");

// Spot erstellen (POST Request)
async function createSpot() {
  if (!title.value || !description.value || !image.value) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }

  try {
    const res = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        body: description.value,
        image: image.value
      })
    });

    const data = await res.json();

    alert("Spot erfolgreich erstellt! (Dummy API)\nID: " + data.id);

    // Felder leeren
    title.value = "";
    description.value = "";
    image.value = "";

  } catch (err) {
    alert("Fehler beim Erstellen des Spots!");
    console.error(err);
  }
}
</script>

<template>
  <div class="create-container">
    <h1>Neuen Spot erstellen</h1>

    <form @submit.prevent="createSpot">
      <label>Titel</label>
      <input v-model="title" type="text" placeholder="Spot Titel">

      <label>Beschreibung</label>
      <textarea v-model="description" placeholder="Beschreibung"></textarea>

      <label>Bild-URL</label>
      <input v-model="image" type="text" placeholder="Bild-URL">

      <button type="submit">Spot erstellen</button>
    </form>
  </div>
</template>

<style scoped>
.create-container {
  max-width: 500px;
  margin: 150px auto;
  background: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

form {
  display: flex;
  flex-direction: column;
}

input, textarea {
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: #0084ff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #006cd1;
}
</style>
