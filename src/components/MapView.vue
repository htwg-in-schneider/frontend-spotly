<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from "@/components/Button.vue";

const API_BASE = import.meta.env.VITE_API_URL;
const spots = ref([]);
const router = useRouter();


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

onMounted(async () => {
  // 1. Karte initialisieren (Zentriert auf Konstanz)
  const map = L.map('map-container').setView([47.6603, 9.1758], 13);

  // 2. OpenStreetMap Kacheln
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  try {
    const res = await fetch(`${API_BASE}/spots`);
    spots.value = await res.json();

    spots.value.forEach(spot => {
      // WICHTIG: Prüfen, ob Koordinaten existieren (sonst stürzt die Map ab)
      if (spot.latitude && spot.longitude) {
        const marker = L.marker([spot.latitude, spot.longitude]).addTo(map);

        const popupHTML = `
  <div style="font-family: sans-serif; text-align: center;">
    <h3 style="margin: 0 0 5px 0">${spot.title}</h3>
    <p style="margin: 0 0 10px 0; color: #666;">${spot.location}</p>

    <button id="btn-details-${spot.id}" style="
      background-color: #0084ff;
      color: white;
      border-radius: 25px;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: bold;
    ">
      Details ansehen
    </button>
  </div>
`;
        marker.bindPopup(popupHTML);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-details-${spot.id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              router.push(`/spot/${spot.id}`); // Navigiert via Vue-Router
            });
          }
        });
      }
    });
  } catch (err) {
    console.error("Fehler beim Laden der Karten-Daten:", err);
  }
});
</script>

<template>
  <div class="map-page">
    <div id="map-container"></div>
  </div>
</template>

<style scoped>
.map-page {
  text-align: center;
  height: calc(100vh - 100px);
}

#map-container {
  display: inline-block;
  margin-top: 80px;
  height: 80%;
  width: 80%;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
</style>>