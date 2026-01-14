<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";

const router = useRouter();

// 1. Hintergrund-Slider Logik
const currentSlide = ref(0);
const slides = ref([
  new URL('@/assets/shop.jpg', import.meta.url).href,
  new URL('@/assets/cafe.jpeg', import.meta.url).href,
  new URL('@/assets/event.jpg', import.meta.url).href,
  new URL('@/assets/park.jpg', import.meta.url).href
]);

let slideInterval;
onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }, 5000);
});
onUnmounted(() => clearInterval(slideInterval));

// 2. Kategorien Daten
const categories = [
  { name: "Natur & See",  img: new URL('@/assets/park.jpg', import.meta.url).href },
  { name: "Essen & Trinken", img: new URL('@/assets/cafe.jpeg', import.meta.url).href },
  { name: "Kultur & Events", img: new URL('@/assets/event.jpg', import.meta.url).href },
  { name: "Shops & Märkte", img: new URL('@/assets/shop.jpg', import.meta.url).href },
];

// 3. Support Logik
const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

function sendMail() {
  const recipient = "support@spotly-konstanz.de";
  const subject = encodeURIComponent(`Support-Anfrage: ${contactForm.value.name}`);
  const body = encodeURIComponent(
      `Name: ${contactForm.value.name}\n` +
      `E-Mail: ${contactForm.value.email}\n\n` +
      `Nachricht:\n${contactForm.value.message}`
  );
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
        <p>Finde die besten Geheimtipps von Locals für Locals.</p>
        <Button style="margin-top: 20px; padding: 15px 40px;" @click="router.push('/spots')">
          Spots ansehen
        </Button>
      </div>
    </header>

    <section class="section">
      <div class="content-wrapper">
        <h2 class="section-title">Spot der Woche: Herosé Park</h2>
        <div class="spot-highlight-card">
          <div class="spot-image">
            <img src="@/assets/park.jpg" alt="Herosé Park">
          </div>
          <div class="spot-info">
            <h3>Entspannen am Seerhein</h3>
            <p>Der Herosé Park ist der perfekte Ort für ein Picknick im Sommer oder einen langen Spaziergang direkt am Wasser.</p>
            <Button variant="secondary" @click="router.push('/spots')">Details ansehen</Button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="content-wrapper">
        <h2 class="section-title">Kategorien entdecken</h2>
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
            Spotly ist unsere Art, Konstanz neu zu entdecken durch echte Tipps von echten Menschen.
            Wir, Efe-liz und Moritz, haben Spotly entwickelt, weil wir gemerkt haben, wie schwer es ist,
            gute Orte zu finden, wenn man neu in der Stadt ist. Auf Spotly teilen Locals ihre Lieblingsplätze,
            von kleinen Cafés bis zu geheimen Spots am See.
          </p>

          <div class="team-wrapper">
            <img src="@/assets/Efeliz.jpg" class="team-img" alt="Efe-liz">
            <span class="team-name">Efe-liz</span>
          </div>
        </div>
      </div>
    </section>

    <div class="full-divider"></div>

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
.home-container { font-family: 'Inter', sans-serif; overflow-x: hidden; }

/* HERO */
.hero { position: relative; height: 85vh; display: flex; align-items: center; justify-content: center; overflow: hidden; color: white; text-align: center; }
.hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0; transition: opacity 1.5s ease-in-out; }
.hero-slide.active { opacity: 1; }
.hero-content { position: relative; z-index: 10; }
.hero-content h1 { font-size: 4rem; font-weight: 800; }

/* SPOT HIGHLIGHT (Neu hinzugefügt für das alte Design) */
.spot-highlight-card {
  display: flex;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  margin-top: 30px;
}
.spot-image img {
  width: 450px;
  height: 300px;
  object-fit: cover;
}
.spot-info {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}
.spot-info h3 { font-size: 1.8rem; margin-bottom: 15px; color: #0084ff; }
.spot-info p { margin-bottom: 20px; color: #666; line-height: 1.6; }

/* KATEGORIEN */
.section { padding: 60px 20px; }
.content-wrapper { max-width: 1100px; margin: 0 auto; }
.section-title { font-size: 2.5rem; text-align: center; color: #333; margin-bottom: 30px; }
.category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; }
.category-card { height: 200px; border-radius: 20px; background-size: cover; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; }

/* STORY / ÜBER UNS */
.section-title-blue { font-size: 2.2rem; text-align: center; color: #0084ff; font-weight: 700; margin-bottom: 40px; }
.about-container { display: flex; align-items: center; justify-content: center; gap: 40px; }
.team-wrapper { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.team-img { width: 160px; height: 160px; border-radius: 50%; object-fit: cover; border: 3px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.team-name { font-weight: 600; color: #333; }
.about-text-content { max-width: 600px; text-align: center; font-size: 1.15rem; color: #444; line-height: 1.6; }

/* LINIE */
.full-divider { width: 100%; height: 1px; background-color: #0084ff; opacity: 0.2; margin: 20px 0; }

/* SUPPORT */
.support-wrapper-box { text-align: center; padding: 40px 20px 80px 20px; }
.support-header-title { font-size: 32px; font-weight: 700; color: #0084ff; margin-bottom: 30px; }
.support-card-brown { width: 100%; max-width: 420px; margin: 0 auto; background: #b19884; padding: 30px; border-radius: 25px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.support-input-field { width: 100%; padding: 12px 20px; border-radius: 30px; border: none; margin-bottom: 15px; outline: none; font-family: inherit; }
.support-textarea-field { width: 100%; height: 120px; padding: 15px 20px; border-radius: 20px; border: none; margin-bottom: 15px; resize: none; outline: none; font-family: inherit; }
.support-submit-btn { width: 100%; background: #0084ff; color: white; padding: 14px; border: none; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer; }

@media (max-width: 850px) {
  .spot-highlight-card { flex-direction: column; }
  .spot-image img { width: 100%; }
  .about-container { flex-direction: column; }
  .about-text-content { order: 2; }
  .team-wrapper:first-of-type { order: 1; }
  .team-wrapper:last-of-type { order: 3; }
}
</style>