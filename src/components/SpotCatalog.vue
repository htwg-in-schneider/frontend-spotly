<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth0 } from '@auth0/auth0-vue';
const userStore = useUserStore();


import SpotCard from "@/components/SpotCard.vue";
import SpotFilter from "@/components/SpotFilter.vue";
import {useUserStore} from "@/stores/userStore.js";
import Button from "@/components/Button.vue";


const API = import.meta.env.VITE_API_URL; // z.B. http://localhost:8081/api

const router = useRouter();
const spots = ref([]);
const isLoading = ref(false);



// Spots vom Backend laden
async function fetchSpots({ title = "", category = "" } = {}) {
  isLoading.value = true;
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
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => fetchSpots());
</script>

<template>

  <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
  >
    <div class="slogan">
      <h1>Entdecke Konstanz neu!</h1>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/park.jpg" class="d-block w-100" alt="Park"/>
      </div>
      <div class="carousel-item">
        <img src="@/assets/shop.jpg" class="d-block w-100" alt="Shop"/>
      </div>
      <div class="carousel-item">
        <img src="@/assets/event.jpg" class="d-block w-100" alt="Event"/>
      </div>
      <div class="carousel-item">
        <img src="@/assets/cafe.jpeg" class="d-block w-100" alt="Café"/>
      </div>
    </div>

   <div class="cta-container">
      <router-link to="/spots" class="spots-link">>> Hier mehr Spots entdecken</router-link>
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
          <img src="@/assets/Moritz.jpg" alt="Moritz" class="circle-image"/>
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
          <img src="@/assets/Efeliz.jpg" alt="Efe-liz" class="circle-image"/>
        </div>
      </div>
    </section>

    <section class="scroll-space"></section>

    <div class="top-controls">
      <!-- Filter -->
      <SpotFilter @search-changed="fetchSpots"/>
    </div>
    <!-- Spot-Karten -->
    <section class="spots">
      <div v-if="!isLoading" class="spots-container">
        <SpotCard v-for="spot in spots" :key="spot.id" :spot="spot"/>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Spots werden geladen...</p>
      </div>
    </section>
  </main>
</template>


<style scoped>
.slogan {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;

  /* ÄNDERUNG HIER: top von 50% auf 40% (oder weniger) setzen */
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  z-index: 10;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  pointer-events: none;
}

.slogan h1 {
  font-size: 60px;
  font-weight: 700;
  color: #f5f5f5;
  text-shadow: 5px 5px 8px rgba(0, 0, 0, 0.75);
  margin: 0;
  line-height: 1.2;
}

.top-controls {
  display: flex;
  flex-direction: column; /* Elemente untereinander */
  align-items: center;    /* Horizontal zentrieren */
  gap: 20px;              /* Abstand zwischen Button und Filter */
  margin: 20px 0 40px;    /* Abstand nach oben und unten */
  width: 100%;
}

.cta-container {
  display: flex;
  justify-content: center;
  margin: 30px 0 60px; /* Abstand zum Carousel und nachfolgendem Text */
}

.spots-link {
  pointer-events: auto; /* WICHTIG: Damit der Button klickbar bleibt */
  display: inline-block;
  background: #0084ff;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  padding: 15px 40px; /* Etwas kompaktere Maße für bessere Responsivität */
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
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

/* Intro Section */
.intro-wave {
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.intro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  max-width: 1100px;
  width: 100%;
}

/* Profilbilder */
.circle-image {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Text in der Mitte */
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

.intro-wave {
  margin-top: 400px;
}

.spots-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 25px 10px;
}

.carousel {
  position: relative;
  z-index: 5; /* WICHTIG: Macht Buttons klickbar */ /* Verhindert, dass es zu breit wird */
  margin: 80px auto;
  width: 100%;
  overflow: hidden; /* Zentriert das Carousel mit Abstand */
}

/* Bild-Styling */
.carousel-item img {
  height: 450px;
  object-fit: cover; /* Bilder werden nicht verzerrt */
}

/* Die Steuerungspfeile (optional: schöner machen) */
/* 2. Carousel-Pfeile fixieren */
.carousel-control-prev,
.carousel-control-next {
  z-index: 30; /* Absolut am höchsten! */
  width: 10%; /* Etwas breiter für einfachere Bedienung */
  pointer-events: auto; /* Sicherstellen, dass Klicks erlaubt sind */
  opacity: 1;
  top: -20%;/* Damit man sie sieht */
}

.create-btn-container {
  text-align: center;
  margin-bottom: 30px;
}

/* Karten-Zentrierung */
.spots {
  display: flex;
  justify-content: center;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #0084ff;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 132, 255, 0.1);
  border-left-color: #0084ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
}

/* Mobile optimieren */
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

/* Extra Mobile (<480px) */
@media (max-width: 480px) {
  .spots-container {
    grid-template-columns: 1fr;
  }

  .carousel-item img {
    height: 250px;
  }
}

/* ===== RESPONSIVE FIX: Intro Section ===== */
@media (max-width: 768px) {
  .intro-container {
    flex-direction: column;
    gap: 25px;
  }

  /* Bilder nebeneinander */
  .intro-image {
    display: flex;
    justify-content: center;
  }

  .intro-container {
    align-items: center;
  }

  /* Bilder kleiner & nebeneinander */
  .intro-container > .intro-image {
    display: inline-flex;
  }

  .circle-image {
    width: 120px;
    height: 120px;
  }

  /* Text darunter & kleiner */
  .intro-text {
    max-width: 90%;
    text-align: center;
  }

  .intro-text h2 {
    font-size: 22px;
  }

  .intro-text p {
    font-size: 15px;
    line-height: 1.5;
  }
}


</style>