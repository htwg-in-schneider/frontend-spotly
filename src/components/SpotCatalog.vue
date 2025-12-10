<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import SpotCard from "@/components/SpotCard.vue";
import SpecialBanner from "@/components/SpecialBanner.vue";
import SpotFilter from "@/components/SpotFilter.vue";

const API = import.meta.env.VITE_API_URL; // z.B. http://localhost:8081/api

const router = useRouter();

const spots = ref([]);

// Spots vom Backend laden
async function fetchSpots({ title = "", category = "" } = {}) {
  try {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (category) params.append("category", category);

    // KORREKTE URL
    const url = `${API}/spots${params.toString() ? `?${params.toString()}` : ""}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Fehler beim Laden der Spots: ${res.status}`);
    }

    const data = await res.json();

    // Mapping Backend → Frontend
    spots.value = Array.isArray(data)
      ? data.map((s) => ({
          id: s.id,
          title: s.title,             // Backend nutzt title
          description: s.description,
          imageUrl: s.imageUrl ?? "",
          category: s.category ?? "",
        }))
      : [];
  } catch (err) {
    console.error(err);
    alert("Spots konnten nicht vom Backend geladen werden.");
  }
}

onMounted(() => fetchSpots());
</script>

<template>
  <!-- Hintergrund -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>

    <img src="@/assets/background.jpeg" alt="Background" class="bg-image" />
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
        <img src="@/assets/park.jpg" class="d-block w-100" alt="Park" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/shop.jpg" class="d-block w-100" alt="Shop" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/event.jpg" class="d-block w-100" alt="Event" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/cafe.jpeg" class="d-block w-100" alt="Café" />
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- Intro Wave -->
  <main>
    <section class="intro-wave">
      <div class="intro-container">
        <!-- Linkes Bild (Moritz) -->
        <div class="intro-image">
          <img src="@/assets/Moritz.jpg" alt="Moritz" class="circle-image" />
        </div>

        <!-- Text mittig -->
        <div class="intro-text">
          <h2>Unsere Idee hinter Spotly:</h2>
          <p>
            Spotly ist unsere Art, Konstanz neu zu entdecken durch echte Tipps
            von echten Menschen. Wir, Efe-liz und Moritz, haben Spotly
            entwickelt, weil wir gemerkt haben, wie schwer es ist, gute Orte zu
            finden, wenn man neu in der Stadt ist. Auf Spotly teilen Locals
            ihre Lieblingsplätze, von kleinen Cafés bis zu geheimen Spots am
            See.
          </p>
        </div>

        <!-- Rechtes Bild (Du) -->
        <div class="intro-image">
          <img src="@/assets/Efeliz.jpg" alt="Efe-liz" class="circle-image" />
        </div>
      </div>
    </section>

    <section class="scroll-space"></section>

    <!-- Neuer Spot anlegen -->
    <div class="create-btn-container">
      <button @click="router.push('/create-spot')" class="create-btn">
        + Neuen Spot anlegen
      </button>
    </div>

    <!-- Filter -->
    <SpotFilter @search-changed="fetchSpots" />

    <!-- Spot-Karten -->
    <section class="spots">
      <div class="spots-container">
        <SpotCard v-for="spot in spots" :key="spot.id" :spot="spot" />
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Hintergrund */
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

/* Intro Section */
.intro-wave {
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  margin-top: 400px;
}

.intro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  max-width: 1100px;
  width: 100%;
}

.circle-image {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.intro-text {
  max-width: 420px;
  text-align: center;
}

.intro-text h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #0078ff;
}

.intro-text p {
  font-size: 17px;
  line-height: 1.6;
  color: #000;
}

/* Neuer Spot Button */
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: 0.2s ease;
}

.create-btn:hover {
  background: #1c86ee;
  transform: translateY(-2px);
}

/* Spots Grid */
.spots-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 10px;
}

.spots {
  display: flex;
  justify-content: center;
}

/* Mobile */
@media (max-width: 768px) {
  .spots-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .create-btn {
    width: 90%;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .spots-container {
    grid-template-columns: 1fr;
  }
}
</style>