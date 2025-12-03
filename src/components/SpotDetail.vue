<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const spot = ref(null);

onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${route.params.id}`);
    const data = await res.json();

    spot.value = {
      id: data.id,
      title: data.title,
      description: data.body,
      image: `https://picsum.photos/900/600?random=${data.id}`
    };
  } catch (err) {
    console.error("Fehler beim Laden:", err);
  }
});

function editSpot() {
  router.push(`/spot/${route.params.id}/edit`);
}
</script>

<template>

  <!-- 🔵 Hintergrund -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>
  </div>

  <div v-if="spot" class="detail-wrapper">

    <h1>{{ spot.title }}</h1>

    <img :src="spot.image" :alt="spot.title" class="spot-image" />

    <p class="description">{{ spot.description }}</p>

    <!-- Bearbeiten Button -->
    <button class="edit-btn" @click="editSpot">
      Bearbeiten
    </button>

  </div>

  <div v-else class="loading">Lade Spot...</div>

</template>

<style scoped>
/* Hintergrund */
.background {
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom right, #dff1ff, #ffffff);
  z-index: -1;
}

.ellipse {
  position: absolute;
  background: rgba(0, 150, 255, 0.18);
  border-radius: 50%;
  filter: blur(120px);
}

.ellipse1 {
  width: 480px;
  height: 260px;
  top: 10%;
  left: 5%;
}
.ellipse2 {
  width: 420px;
  height: 240px;
  top: 35%;
  right: 8%;
}
.ellipse3 {
  width: 450px;
  height: 260px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* Inhalt */
.detail-wrapper {
  max-width: 900px;
  margin: 140px auto 120px;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 38px;
  margin-bottom: 30px;
  color: #222;
}

.spot-image {
  width: 100%;
  border-radius: 25px;
  margin-bottom: 25px;
}

.description {
  font-size: 20px;
  line-height: 1.6;
  color: #444;
  max-width: 780px;
  margin: 0 auto 40px;
}

/* Bearbeiten Button */
.edit-btn {
  background: #0084ff;
  border: none;
  color: white;
  padding: 14px 40px;
  border-radius: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.edit-btn:hover {
  background: #006fd6;
}

.loading {
  text-align: center;
  margin-top: 150px;
  font-size: 22px;
}
</style>
