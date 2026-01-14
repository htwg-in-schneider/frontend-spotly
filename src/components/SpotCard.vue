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
.image-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.spot-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 90%;
  min-height: 240px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 10px;
  text-align: center;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
}


.details-btn {
  align-self: center;
  width: 80%;
  background-color: #463b2d;
  color: white;
  border: 10px solid black;
  padding: 12px 0;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-top: 15px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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