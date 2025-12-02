<script setup>
import { useRoute } from "vue-router";
import { spots } from "@/data.js";

const route = useRoute();
const id = Number(route.params.id);

// passenden Spot anhand der ID finden
const spot = spots.find((s) => s.id === id);
</script>

<template>

  <!-- Hintergrund SAME AS HOME -->
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

  <div v-if="spot" class="detail">
    <h1>{{ spot.title }}</h1>
    <img :src="spot.image" :alt="spot.title">
    <p>{{ spot.description }}</p>
  </div>

  <div v-else>
    <p>Spot nicht gefunden.</p>
  </div>
</template>

<style scoped>
.detail {
  padding: 40px;
  text-align: center;
}

.detail img {
  width: 60%;
  border-radius: 20px;
  margin: 20px 0;
}
</style>
