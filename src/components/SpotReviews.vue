<!-- src/components/SpotReviews.vue -->
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  spotId: Number
});

// ⭐ Dummy Bewertungen pro Spot (weil dummyjson keine Bewertungen hat)
const reviews = ref([]);

// Dummy-Review-Pool
const possibleReviews = [
  { text: "Wunderschöner Ort!", stars: 5 },
  { text: "Mega Aussicht!", stars: 4 },
  { text: "Ganz okay, aber etwas voll.", stars: 3 },
  { text: "Nicht so besonders.", stars: 2 },
  { text: "Hat mir nicht gefallen.", stars: 1 }
];

// ⭐ Bewertungen generieren
function generateReviewsForSpot(id) {
  // Jede Spot-ID erhält 1–3 zufällige Bewertungen
  const count = Math.floor(Math.random() * 3) + 1;

  let result = [];

  for (let i = 0; i < count; i++) {
    const r = possibleReviews[Math.floor(Math.random() * possibleReviews.length)];

    result.push({
      id: `${id}-${i}`,
      stars: r.stars,
      text: r.text
    });
  }

  reviews.value = result;
}

onMounted(() => {
  generateReviewsForSpot(props.spotId);
});
</script>


<template>
  <div class="reviews-wrapper">
    <h2 class="title">Bewertungen</h2>

    <div 
      v-for="r in reviews" 
      :key="r.id" 
      class="review-card"
    >

      <!-- Sterne -->
      <div class="stars">
        <span 
          v-for="i in 5" 
          :key="i"
          class="star"
          :class="{ active: i <= r.stars }"
        >★</span>
      </div>

      <!-- Text -->
      <p class="review-text">
        {{ r.text }}
      </p>
    </div>
  </div>
</template>


<style scoped>
.reviews-wrapper {
  text-align: left;
  margin-top: 30px;
}

.title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
  color: #000;
}

/* Karte */
.review-card {
  background: white;
  padding: 18px;
  border-radius: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* Sterne */
.stars {
  margin-bottom: 10px;
}

.star {
  font-size: 22px;
  color: #ccc;
  margin-right: 3px;
}

.star.active {
  color: #ffcc00;
}

/* Text */
.review-text {
  font-size: 16px;
  color: #333;
}
</style>
