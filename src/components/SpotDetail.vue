<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const spot = ref(null);

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/posts/${route.params.id}`);
  const data = await res.json();

  spot.value = {
    id: data.id,
    title: data.title,
    description: data.body,
    image: `https://picsum.photos/900/600?random=${data.id}`
  };
});
</script>

<template>
  <div class="detail-page">

    <div v-if="spot" class="detail-box">

      <h1>{{ spot.title }}</h1>

      <img :src="spot.image" class="spot-image">

      <p class="spot-text">{{ spot.description }}</p>

      <button class="edit-btn" @click="router.push(`/spot/${spot.id}/edit`)">
        Bearbeiten
      </button>

    </div>

    <p v-else class="loading">Spot nicht gefunden.</p>

  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
}

.detail-box {
  width: 70%;
  max-width: 900px;
  text-align: center;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #222;
}

.spot-image {
  width: 100%;
  border-radius: 20px;
  margin: 20px 0;
}

.spot-text {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.edit-btn {
  background-color: #0084ff;
  border: none;
  padding: 12px 40px;
  color: white;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 20px;
}

.edit-btn:hover {
  background-color: #006bd1;
}
</style>
