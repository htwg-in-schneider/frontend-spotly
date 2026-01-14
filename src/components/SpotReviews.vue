<script setup>
import {ref, onMounted} from "vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useUserStore} from '@/stores/userStore';

const props = defineProps({
  spotId: Number,
  isAdminMode: Boolean
});

const emit = defineEmits(['review-posted']);
const API_BASE = import.meta.env.VITE_API_URL;
const {getAccessTokenSilently, isAuthenticated} = useAuth0();
const userStore = useUserStore();

const reviews = ref([]);
const reviewText = ref("");
const rating = ref(5); // Standardwert 5 Sterne

async function fetchReviews() {
  try {
    const res = await fetch(`${API_BASE}/reviews/spot/${props.spotId}`);
    if (res.ok) reviews.value = await res.json();
  } catch (err) {
    console.error(err);
  }
}

async function deleteReview(reviewId) {
  if (!confirm("Bewertung löschen?")) return;
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE}/spots/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
    });
    if (res.ok) {
      await fetchReviews();
      emit('review-posted');
    }
  } catch (err) {
    console.error(err);
  }
}

async function submitReview() {
  if (!reviewText.value.trim()) {
    alert("Bitte schreibe einen Kommentar.");
    return;
  }
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE}/spots/${props.spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        rating: rating.value,
        comment: reviewText.value
      })
    });
    if (res.ok) {
      reviewText.value = "";
      rating.value = 5;
      await fetchReviews();
      emit('review-posted');
    }
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchReviews);
</script>

<template>
  <div class="reviews-wrapper">
    <div v-if="isAuthenticated && !isAdminMode" class="review-form">
      <h4>Bewertung schreiben</h4>

      <textarea v-model="reviewText" placeholder="Wie hat es dir dort gefallen?"></textarea>

      <div class="rating-input">
        <label>Sterne (1-5):</label>
        <input type="number" v-model.number="rating" min="1" max="5"/>
      </div>

      <button class="submit-btn" @click="submitReview">Senden</button>
    </div>

    <div v-if="reviews.length > 0">
      <div v-for="r in reviews" :key="r.id" class="review-card">
        <div class="review-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= r.rating }">★</span>
          </div>

          <button
              v-if="isAdminMode || userStore.userProfile?.role === 'ADMIN'"
              @click="deleteReview(r.id)"
              class="delete-btn"
          >
            Löschen
          </button>
        </div>
        <p class="review-text">{{ r.comment }}</p>
      </div>
    </div>
    <div v-else class="no-reviews">
      Noch keine Bewertungen vorhanden.
    </div>
  </div>
</template>

<
<style scoped>
.reviews-wrapper {
  text-align: left;
  margin-top: 30px;
  padding: 0 10px;
}

.title, .review-form h4, .review-list h3 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 25px;
  margin-bottom: 15px;
  color: #000;
}

.review-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 18px;
  border-radius: 15px; /* Etwas runder */
  margin-bottom: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
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
  line-height: 1.5;
}


.review-form {
  background: #e8f0f8;
  padding: 25px;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.review-form h4 {
  font-size: 20px;
  margin-bottom: 15px;
}

.review-form textarea {
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #c0d9eb;
  margin-bottom: 15px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
}

.rating-input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rating-input label {
  font-weight: 600;
  margin-right: 15px;
  color: #333;
}

.rating-input input[type="number"] {
  width: 60px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
}

.submit-btn {
  background: #0084ff;
  border: none;
  color: white;
  padding: 10px 30px;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-block;
}

.submit-btn:hover {
  background: #0072d6;
}

.delete-btn {
  background: red;
  border: none;
  color: white;
  padding: 5px 15px;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-block;
}

.delete-btn:hover {
  background: darkred;
}

.no-reviews {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>