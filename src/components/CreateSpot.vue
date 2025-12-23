<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router"; // <--- 1. Importieren Sie useRouter
  
  // Die Basis-URL zu Ihrem Spring Boot Backend
  const API_URL = "http://localhost:8080/api/spots"; 
  
  // Router initialisieren (um ihn später zu verwenden)
  const router = useRouter(); // <--- 2. Initialisieren Sie den Router
  
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
    "Andere" // Optional: Falls ein Spot mal nicht passt
];
  
  async function createSpot() {
    
    // 1. Daten aus den State-Variablen zusammenstellen
    const spotData = {
      title: title.value,
      category: category.value,
      description: description.value,
      imageUrl: image.value,
      location: location.value,
    };
  
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData),
      });
  
      if (res.ok) {
        alert(`Spot '${title.value}' wurde erfolgreich erstellt!`);
        
        // 3. Navigation nach Erfolg
        router.push('/'); // <--- 3. Verwenden Sie den Router, um zur Home-Route zu gehen
      } else {
        // Fehlerbehandlung...
        alert(`Fehler beim Erstellen: ${res.statusText}.`);
      }
  
    } catch (err) {
      alert("Spot konnte nicht erstellt werden. Prüfen Sie die Verbindung und CORS.");
    }
  }
  </script>

<template>
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
      <select
    class="input"
    v-model="category"
>
    <option value="" disabled>Kategorie</option> 
    
    <option 
        v-for="cat in categories" 
        :key="cat" 
        :value="cat"
    >
        {{ cat }}
    </option>
</select>

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
