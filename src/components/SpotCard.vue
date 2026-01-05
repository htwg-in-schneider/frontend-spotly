<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  spot: {
    type: Object,
    required: true
  }
});

function openDetails() {
  router.push(`/spot/${props.spot.id}`);
}
</script>

<template>
  <div class="spot-card">

    <h3 class="title">{{ spot.title }}</h3>

    <div class="image-container">
      
      <img 
        v-if="spot.imageUrl" 
        :src="spot.imageUrl" 
        :alt="'Bild von ' + spot.title"
        class="card-img"
      >

      <div v-else class="placeholder-text">
        Kein Bild verfügbar
      </div>

    </div>

    <button class="details-btn" @click="openDetails">
      Details
    </button>
  </div>
</template>

<style scoped>
.spot-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 90%;
  min-height: 240px;            /* sorgt dafür, dass alle Karten gleich hoch sind */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Details-Button bleibt unten */
  padding: 15px 10px;
  text-align: center;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
}

.url {
  font-size: 14px;
  color: #666;
  word-break: break-word;
  padding: 0 10px;
  margin-bottom: auto; /* schiebt Button nach unten */
}

.details-btn {
  align-self: center;
  width: 80%;
  background-color: #463b2d;
  color: white;
  border: 10px color(black);
  padding: 12px 0;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-top: 15px; /* Abstand nach oben */
}

.card-img {
  border-radius: 16px;
}

.details-btn:hover {
  background-color: #463b2d;
}

@media (max-width: 768px) {
  .spot-card {
    width: 100%;
  }
}
</style>