<!-- src/components/SpotReviews.vue -->
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  spotId: Number
});

// Alle möglichen Reviews
const possibleReviews = [
  { text: "Wunderschöner Ort!", stars: 5 },
  { text: "Mega Aussicht!", stars: 4 },
  { text: "Ganz okay, aber etwas voll.", stars: 3 },
  { text: "Nicht so besonders.", stars: 2 },
  { text: "Hat mir nicht gefallen.", stars: 1 }
];

const reviews = ref([]);

// ⭐ Stabiler, spotbasierter Zufall
function seededRandom(seed) {
  return Math.abs(Math.sin(seed) * 10000) % 1;
}

// ⭐ Bewertungen pro Spot generieren (1–3)
function generateReviewsForSpot(id) {
  const count = Math.floor(seededRandom(id) * 3) + 1;

  let result = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(seededRandom(id + i) * possibleReviews.length);
    const r = possibleReviews[index];

    result.push({
      id: `${id}-${i}`,
      stars: r.stars,
      text: r.text
    });
  }

  reviews.value = result;
}

onMounted(() => generateReviewsForSpot(props.spotId));
</script>

<template>
  <div class="reviews-wrapper">
    <h2 class="title">Bewertungen</h2>

    <div v-for="r in reviews" :key="r.id" class="review-card">
      <div class="stars">
        <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= r.stars }">★</span>
      </div>

      <p class="review-text">{{ r.text }}</p>
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
  color: #000;
}

.review-card {
  background: white;
  padding: 18px;
  border-radius: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

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

.review-text {
  font-size: 16px;
  color: #333;
}
</style>
