<!-- src/views/SpotCatalog.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import SpotCard from "@/components/SpotCard.vue";
import SpecialBanner from "@/components/SpecialBanner.vue";
import SpotFilter from "@/components/SpotFilter.vue";

// ⭐ API aus .env
const API = import.meta.env.VITE_API_URL;

const router = useRouter();

const allSpots = ref([]);  // Ungefiltert
const spots = ref([]);     // Gefiltert

// ⭐ API-Call mit Fallback
async function fetchSpots({ name = "", category = "" } = {}) {
  try {
    // --- Backend-Aufruf ---
    const res = await fetch(
      `${API}/product?name=${name}&category=${category}`
    );
    const data = await res.json();

    // Falls Backend Daten liefert:
    if (Array.isArray(data)) {
      spots.value = data.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        image: s.imageUrl,
        tags: [s.category?.name] // 1 Kategorie
      }));
      return;
    }
  } catch (err) {
    console.warn("⚠ Backend nicht erreichbar – Dummy Daten werden genutzt.");
  }

  // --- Fallback DummyJSON ---
  const res = await fetch("https://dummyjson.com/posts");
  const dummy = await res.json();

  allSpots.value = dummy.posts.map(p => ({
    id: p.id,
    title: p.title,
    description: p.body,
    image: `https://picsum.photos/600/400?random=${p.id}`,
    tags: p.tags ?? []
  }));

  // 📌 Filter anwenden (lokal)
  applyLocalFilter(name, category);
}

// ⭐ Lokales Filtern für DummyJSON
function applyLocalFilter(name, category) {
  let result = allSpots.value;

  if (name.trim()) {
    result = result.filter(spot =>
      spot.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(spot => spot.tags.includes(category));
  }

  spots.value = result;
}

// Beim Laden → alle Spots laden
onMounted(() => fetchSpots());
</script>



<template>
  <!-- Hintergrund -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>

    <img src="@/assets/background.jpeg" alt="Background" class="bg-image">
  </div>

  <!-- Special Banner -->
  <SpecialBanner />

  <!-- Carousel -->
  <div 
    id="carouselExampleAutoplaying" 
    class="carousel slide" 
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/park.jpg" class="d-block w-100" alt="Park">
      </div>
      <div class="carousel-item">
        <img src="@/assets/shop.jpg" class="d-block w-100" alt="Shop">
      </div>
      <div class="carousel-item">
        <img src="@/assets/event.jpg" class="d-block w-100" alt="Event">
      </div>
      <div class="carousel-item">
        <img src="@/assets/cafe.jpeg" class="d-block w-100" alt="Café">
      </div>
    </div>

    <button class="carousel-control-prev" type="button" 
            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button class="carousel-control-next" type="button" 
            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- Intro Wave -->
  <main>
    <section class="scroll-space"></section>

    <section class="intro-wave">
      <div class="wave-content">
        <img src="@/assets/Moritz.jpg" alt="Linkes Bild" class="circle-image">

        <div class="wave-text">
          <h2>Unsere Idee hinter Spotly:</h2>
          <p>
            Spotly ist unsere Art, Konstanz neu zu entdecken — durch echte Tipps von echten Menschen.
            Wir, Efe-liz und Moritz, haben Spotly entwickelt, weil wir gemerkt haben, wie schwer es ist,
            gute Orte zu finden, wenn man neu in der Stadt ist.  
            Auf Spotly teilen Locals ihre Lieblingsplätze, von kleinen Cafés bis zu geheimen Spots am See.
          </p>
        </div>
      </div>
    </section>

    <section class="scroll-space"></section>

    <!-- ⭐ Neuer Spot anlegen -->
    <div class="create-btn-container">
      <button @click="router.push('/create-spot')" class="create-btn">
        + Neuen Spot anlegen
      </button>
    </div>

    <!-- ⭐ FILTER -->
    <SpotFilter @search-changed="fetchSpots" />

    <!-- SPOT-KARTEN -->
    <section class="spots">
      <div class="spots-container">
        <SpotCard 
          v-for="spot in spots"
          :key="spot.id"
          :spot="spot"
        />
      </div>
    </section>
  </main>
</template>




<style scoped>
.create-btn-container {
  text-align: center;
  margin-bottom: 30px;
}

.create-btn {
  background: #0084ff;
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: 0.2s ease;
}

.create-btn:hover {
  background: #1c86ee;
  transform: translateY(-2px);
}
</style>


<style scoped>
.create-btn-container {
  text-align: center;
  margin-bottom: 30px;
}

.create-btn {
  background: #0084ff;
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: 0.2s ease;
}

.create-btn:hover {
  background: #1c86ee;
  transform: translateY(-2px);
}
</style>
