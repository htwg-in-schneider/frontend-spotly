<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = ref({
  title: "",
  description: "",
  image: ""
});

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/posts/${route.params.id}`);
  const data = await res.json();

  form.value = {
    title: data.title,
    description: data.body,
    image: `https://picsum.photos/900/600?random=${data.id}`
  };
});

function save() {
  alert("Spot gespeichert ✔ (DummyJSON speichert nicht wirklich)");
  router.push(`/spot/${route.params.id}`);
}

function remove() {
  alert("Spot gelöscht ❌ (DummyJSON löscht nicht wirklich)");
  router.push("/");
}
</script>

<template>
  <div class="edit-page">
    <div class="edit-box">

      <h1>Spot bearbeiten</h1>

      <img :src="form.image" class="edit-image">

      <input 
        v-model="form.title" 
        placeholder="Titel"
        class="input-field"
      />

      <textarea 
        v-model="form.description"
        class="textarea-field"
      ></textarea>

      <button class="save-btn" @click="save">Speichern</button>
      <button class="delete-btn" @click="remove">Löschen</button>

    </div>
  </div>
</template>

<style scoped>
.edit-page {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.edit-box {
  width: 70%;
  max-width: 700px;
  background: #cbb29a;
  padding: 30px;
  border-radius: 30px;
  text-align: center;
}

.edit-image {
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
}

.input-field,
.textarea-field {
  width: 90%;
  padding: 15px;
  border-radius: 20px;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
}

.textarea-field {
  height: 150px;
}

.save-btn {
  width: 90%;
  background: #0084ff;
  color: white;
  padding: 15px;
  border-radius: 20px;
  border: none;
  margin-bottom: 15px;
  font-size: 18px;
}

.delete-btn {
  width: 90%;
  background: #ff4d4d;
  color: white;
  padding: 15px;
  border-radius: 20px;
  border: none;
  font-size: 18px;
}
</style>
