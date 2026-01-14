<script setup>
import {ref, onMounted} from "vue";

const emit = defineEmits(["search-changed"]);


const API = import.meta.env.VITE_API_URL;


const searchName = ref("");
const searchCategory = ref("");


const categories = ref([]);


async function fetchCategories() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/category`);
    const data = await res.json();

    categories.value = data.map(cat => ({
      id: cat.name,
      name: cat.translation?.de || cat.name
    }));

  } catch (err) {
    console.warn("⚠ Kategorie-Fetch fehlgeschlagen. Dummy wird genutzt.");

    categories.value = [
      {id: "nature", name: "Natur & Aussicht"},
      {id: "shops", name: "Shops & Märkte"},
      {id: "events", name: "Events & Kultur"},
      {id: "cafes", name: "Essen & Trinken"},
      {id: "sport", name: "Sport & Freizeit"},
      {id: "andere", name: "Andere"},

    ];
  }
}

function updateSearch() {
  emit("search-changed", {
    title: searchName.value, // <--- SENDET 'name'
    category: searchCategory.value
  });
}

function resetFilter() {
  searchName.value = "";
  searchCategory.value = "";
  updateSearch();
}

onMounted(fetchCategories);
</script>


<template>
  <div class="filter-wrapper">


    <input
        class="filter-input"
        type="text"
        placeholder="🔎 Spots suchen..."
        v-model="searchName"
        @input="updateSearch"
    >

    <select
        class="filter-select"
        v-model="searchCategory"
        @change="updateSearch"
    >
      <option value="">Alle Kategorien</option>

      <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
      >
        {{ c.name }}
      </option>
    </select>

    <!-- Reset -->
    <button class="reset-btn" @click="resetFilter">
      Zurücksetzen
    </button>

  </div>
</template>

<style scoped>
.filter-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 20px 0 40px;
  flex-wrap: wrap;
}

.filter-input,
.filter-select {
  width: 260px;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  background: white;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.reset-btn {
  background: #ff5252;
  color: white;
  padding: 14px 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: 0.2s;
}

.reset-btn:hover {
  background: #ff3333;
  transform: translateY(-2px);
}
</style>
