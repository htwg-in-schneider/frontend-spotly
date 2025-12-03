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
    <img :src="spot.image" :alt="spot.title">
    <p>{{ spot.title }}</p>

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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.spot-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #c0afa1;
}

.spot-card p {
  height: 30px;
  line-height: 45px;
  margin: 0;
  padding: 0;
  font-size: 15px;
  color: #333;
}

.details-btn {
  width: 100%;
  background-color: #5b4d3b;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.details-btn:hover {
  background-color: #463b2d;
}

.edit-btn {
  width: 100%;
  background-color: #8d775e; 
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.edit-btn:hover {
  background-color: #6f604c;
}

@media (max-width: 768px) {
  .spot-card {
    width: 100%;
  }
}
</style>
