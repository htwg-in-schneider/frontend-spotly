<script setup>
  import { ref, onMounted } from "vue";
  
  const API_BASE = import.meta.env.VITE_API_URL; 
  
  const props = defineProps({
    spotId: Number 
  });
  
  const reviews = ref([]);
  const reviewText = ref("");
  const rating = ref(5);
  
  async function fetchReviews() {
    try {
      const res = await fetch(`${API_BASE}/reviews/spot/${props.spotId}`);
      
      if (res.ok) {
          reviews.value = await res.json();
      } else {
          reviews.value = [];
      }
    } catch (err) {
      console.error("Fehler beim Laden der Reviews:", err);
    }
  }
  
  async function submitReview() {
    if (reviewText.value.trim() === "" || rating.value < 1 || rating.value > 5) {
      alert("Bitte geben Sie einen gültigen Text und eine Bewertung (1-5) ein.");
      return;
    }
  
    const newReview = {
      spotId: props.spotId,
      rating: rating.value,
      comment: reviewText.value,
    };
    
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
  
      if (res.ok) {
        reviewText.value = "";
        rating.value = 5;
        await fetchReviews(); 
      } else {
        throw new Error(`Fehler beim Speichern der Bewertung: ${res.statusText}`);
      }
    } catch (err) {
      console.error("Fehler beim Senden der Bewertung.", err);
      alert("Die Bewertung konnte nicht gesendet werden. Prüfen Sie das Backend.");
    }
  }
  
  onMounted(fetchReviews);
  
  </script>

<template>
  <div class="reviews-wrapper">
    <h2 class="title">Bewertungen</h2>

    <div class="review-form">
        <h4>Ihre Bewertung</h4>
        
        <textarea 
            v-model="reviewText" 
            placeholder="Ihre Meinung zum Spot..."
            rows="3"
        ></textarea>
        
        <div class="rating-input">
            <label for="rating">Bewertung (1-5):</label>
            <input 
                type="number" 
                id="rating" 
                v-model.number="rating" 
                min="1" 
                max="5"
            >
        </div>

        <button @click="submitReview" class="submit-btn">Absenden</button>
    </div>

    <hr>
    
    <div v-if="reviews.length" class="review-list">
        <h3>Bestehende Bewertungen ({{ reviews.length }})</h3>
        <div v-for="r in reviews" :key="r.id" class="review-card">
            
            <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= r.rating }">★</span>
            </div>

            <p class="review-text">{{ r.comment}}</p>
        </div>
    </div>
    <div v-else class="no-reviews">
        Noch keine Bewertungen vorhanden.
    </div>

  </div>
</template>

<<style scoped>
  /* --- Reviews Wrapper und Titel --- */
  .reviews-wrapper {
    text-align: left;
    margin-top: 30px;
    /* Fügt etwas Innenabstand hinzu, damit es nicht direkt am Rand klebt */
    padding: 0 10px;
  }
  
  .title, .review-form h4, .review-list h3 {
    font-size: 24px; /* Etwas kleiner als der Haupt-Titel des Spots */
    font-weight: 700;
    margin-top: 25px;
    margin-bottom: 15px;
    color: #000;
  }
  
  /* --- Bewertungskarte (Bestehende Reviews) --- */
  .review-card {
    /* Passt zum Hintergrund der Hauptkarte, aber etwas heller/transparenter */
    background: rgba(255, 255, 255, 0.9);
    padding: 18px;
    border-radius: 15px; /* Etwas runder */
    margin-bottom: 16px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.1);
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
    color: #ffcc00; /* Goldgelb */
  }
  
  .review-text {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
  }
  
  /* --- NEU: Eingabeformular (Review-Form) --- */
  
  .review-form {
      background: #e8f0f8; /* Hellblauer/grauer Hintergrund, ähnlich der Beschreibung */
      padding: 25px;
      border-radius: 20px;
      margin-bottom: 30px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  .review-form h4 {
      font-size: 20px;
      margin-bottom: 15px;
  }
  
  /* Textarea */
  .review-form textarea {
      width: 100%;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #c0d9eb;
      margin-bottom: 15px;
      font-size: 16px;
      resize: vertical;
      box-sizing: border-box; /* Wichtig für korrekte Breite */
  }
  
  /* Rating Input */
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
  
  /* Submit Button (passt zum edit-btn in SpotDetail) */
  .submit-btn {
      background: #0084ff;
      border: none;
      color: white;
      padding: 10px 30px;
      border-radius: 40px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.2s;
      /* Damit er linksbündig mit dem Formular ist */
      display: inline-block;
  }
  
  .submit-btn:hover {
      background: #0072d6;
  }
  
  /* Keine Reviews Platzhalter */
  .no-reviews {
      padding: 20px;
      text-align: center;
      color: #666;
      font-style: italic;
  }
  </style>