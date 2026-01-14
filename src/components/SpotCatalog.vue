<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";

const router = useRouter();

// --- 1. Top Spot Logik (Neu) ---
const topSpot = ref(null);
const isLoadingSpot = ref(true);

const fetchTopSpot = async () => {
  try {
    const res = await fetch('https://backend-spotly.onrender.com/api/spots');
    if (res.ok) {
      const spots = await res.json();
      // Sortiere nach averageRating (absteigend) und nimm den ersten
      if (spots.length > 0) {
        topSpot.value = spots.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))[0];
      }
    }
  } catch (e) {
    console.error("Fehler beim Laden des Top-Spots:", e);
  } finally {
    isLoadingSpot.value = false;
  }
};

// --- 2. Hintergrund-Slider ---
const currentSlide = ref(0);
const slides = ref([
  new URL('@/assets/shop.jpg', import.meta.url).href,
  new URL('@/assets/cafe.jpeg', import.meta.url).href,
  new URL('@/assets/event.jpg', import.meta.url).href,
  new URL('@/assets/park.jpg', import.meta.url).href
]);

let slideInterval;
onMounted(() => {
  fetchTopSpot(); // Top Spot laden
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }, 5000);
});
onUnmounted(() => clearInterval(slideInterval));

// --- 3. Kategorien Daten ---
const categories = [
  { name: "Natur & Aussicht",  img: new URL('@/assets/park.jpg', import.meta.url).href },
  { name: "Essen & Trinken", img: new URL('@/assets/cafe.jpeg', import.meta.url).href },
  { name: "Events & Kultur", img: new URL('@/assets/event.jpg', import.meta.url).href },
  { name: "Shops & Märkte", img: new URL('@/assets/shop.jpg', import.meta.url).href },
  { name: "Sport & Freizeit", img: new URL('@/assets/freizeit.jpeg', import.meta.url).href }
];
// --- 4. Support Logik ---
const contactForm = ref({ name: '', email: '', message: '' });
function sendMail() {
  const recipient = "support@spotly-konstanz.de";
  const subject = encodeURIComponent(`Support-Anfrage: ${contactForm.value.name}`);
  const body = encodeURIComponent(`Name: ${contactForm.value.name}\nE-Mail: ${contactForm.value.email}\n\nNachricht:\n${contactForm.value.message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}
</script>

<template>
  <div class="home-container">
    <header class="hero">
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="hero-slide"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide})` }"
      ></div>
      <div class="hero-content">
        <h1>Entdecke Konstanz neu!</h1>
        <Button style="margin-top: 20px; padding: 15px 40px;" @click="router.push('/spots')">
          Entdecke neue Spots!
        </Button>
      </div>
    </header>

    <section class="section" v-if="topSpot">
      <div class="content-wrapper">
        <h2 class="section-title-blue">Best bewerteste Spot</h2>
        <div class="spot-highlight-card">
          <div class="spot-image">
            <img :src="topSpot.imageUrl || slides[3]" :alt="topSpot.title">
          </div>
          <div class="spot-info">
            <h3>{{ topSpot.title }}</h3>
            <p>{{ topSpot.description }}</p>
            <div class="rating-badge">⭐ {{ topSpot.averageRating?.toFixed(1) || '0.0' }}</div>
            <Button variant="secondary" @click="router.push(`/spot/${topSpot.id}`)">Details ansehen</Button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="content-wrapper">
        <h2 class="section-title-blue">Kategorien</h2>
        <div class="category-grid">
          <div
              v-for="cat in categories"
              :key="cat.name"
              class="category-card"
              :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${cat.img})` }"
              @click="router.push({ path: '/spots', query: { category: cat.name }})"
          >
            <h3>{{ cat.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="section about-section">
      <div class="content-wrapper">
        <h2 class="section-title-blue">Unsere Idee hinter Spotly:</h2>
        <div class="about-container">
          <div class="team-wrapper">
            <img src="@/assets/Moritz.jpg" class="team-img" alt="Moritz">
            <span class="team-name">Moritz</span>
          </div>
          <p class="about-text-content">
            Spotly ist unsere Art, Konstanz neu zu entdecken durch echte Tipps von echten Menschen...
          </p>
          <div class="team-wrapper">
            <img src="@/assets/Efeliz.jpg" class="team-img" alt="Efe-liz">
            <span class="team-name">Efe-liz</span>
          </div>
        </div>
      </div>
    </section>

    <div class="support-wrapper-box">
      <h1 class="support-header-title">Support & Kontakt</h1>
      <div class="support-card-brown">
        <form @submit.prevent="sendMail">
          <input v-model="contactForm.name" type="text" class="support-input-field" placeholder="Dein Name" required />
          <input v-model="contactForm.email" type="email" class="support-input-field" placeholder="Deine E-Mail Adresse" required />
          <textarea v-model="contactForm.message" class="support-textarea-field" placeholder="Wie können wir dir helfen?" required></textarea>
          <button type="submit" class="support-submit-btn">E-Mail Programm öffnen</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  background-color: #f8fbff; /* Ganz leichter blauer Tint für den Hintergrund */
}

/* HERO SECTION */
.hero {
  position: relative;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  text-align: center;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 6s ease-out;
  transform: scale(1.05);
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  text-shadow: 0 4px 15px rgba(0,0,0,0.3);
  margin-bottom: 10px;
  letter-spacing: -1px;
}

/* SPOT HIGHLIGHT CARD */
.section { padding: 80px 20px; }
.content-wrapper { max-width: 1100px; margin: 0 auto; }

.section-title-blue {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  text-align: center;
  color: #0084ff;
  font-weight: 800;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
}

.spot-highlight-card {
  display: flex;
  background: white;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 132, 255, 0.1);
  margin-top: 30px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.spot-highlight-card:hover {
  transform: translateY(-10px);
}

.spot-image { flex: 1.2; overflow: hidden; }
.spot-image img {
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.spot-highlight-card:hover .spot-image img {
  transform: scale(1.05);
}

.spot-info {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
}

.spot-info h3 {
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: #1a1a1a;
  font-weight: 800;
}

.spot-info p {
  margin-bottom: 25px;
  color: #555;
  line-height: 1.7;
  font-size: 1.1rem;
}

.rating-badge {
  background: #ffc107;
  color: #000;
  padding: 6px 16px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(255, 193, 7, 0.3);
}

/* KATEGORIEN GRID */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.category-card {
  height: 250px;
  border-radius: 35px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.category-card h3 {
  font-size: 1.6rem;
  font-weight: 800;
  z-index: 2;
  transition: transform 0.3s ease;
  text-align: center;
  padding: 0 20px;
}

.category-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  transition: background 0.3s ease;
  z-index: 1;
}

.category-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 132, 255, 0.25);
}

.category-card:hover::before {
  background: rgba(0, 132, 255, 0.5);
}

.category-card:hover h3 {
  transform: scale(1.1);
}

/* STORY / ÜBER UNS */
.about-section { background-color: white; }
.about-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin-top: 20px;
}

.team-img {
  width: 180px;
  height: 180px;
  border-radius: 60px; /* Modernere abgerundete Ecken statt Kreis */
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.team-wrapper:hover .team-img {
  transform: rotate(-3deg) scale(1.05);
}

.about-text-content {
  max-width: 550px;
  text-align: center;
  font-size: 1.2rem;
  color: #444;
  line-height: 1.8;
  font-style: italic;
}

/* SUPPORT SECTION */
.support-wrapper-box {
  text-align: center;
  padding: 100px 20px;
  background: linear-gradient(to bottom, #f8fbff, #e6f2ff);
}

.support-header-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0084ff;
  margin-bottom: 40px;
}

.support-card-brown {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #2d2d2d; /* Dunkler Kontrast statt braun wirkt edler */
  padding: 45px;
  border-radius: 40px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.support-input-field, .support-textarea-field {
  width: 100%;
  padding: 18px 25px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: white;
  margin-bottom: 20px;
  outline: none;
  font-family: inherit;
  transition: all 0.3s ease;
}

.support-input-field:focus, .support-textarea-field:focus {
  background: rgba(255,255,255,0.1);
  border-color: #0084ff;
}

.support-submit-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 18px;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 132, 255, 0.3);
}

.support-submit-btn:hover {
  background: #0066cc;
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(0, 132, 255, 0.4);
}

/* RESPONSIVE */
@media (max-width: 950px) {
  .spot-highlight-card { flex-direction: column; border-radius: 30px; }
  .spot-info { padding: 35px; align-items: center; text-align: center; }
  .spot-info h3 { font-size: 1.8rem; }
  .about-container { flex-direction: column; gap: 40px; }
  .about-text-content { order: 2; }
  .team-wrapper:first-of-type { order: 1; }
  .team-wrapper:last-of-type { order: 3; }
  .hero-content h1 { font-size: 3rem; }
}
</style>