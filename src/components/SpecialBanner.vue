<script setup>
import { useBannerStore } from "@/stores/banner.js";

const banner = useBannerStore();
</script>

<template>
  <section class="slogan" v-if="banner.isVisible">

    <h1>Entdecke Konstanz neu!</h1>

    <div class="cta-container">
      <a href="#" class="spots-link">>> Hier mehr Spots entdecken</a>
    </div>
  </section>
</template>

<style scoped>
.slogan {
  display: flex;
  top: 15%; 
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  position: absolute;
  
  text-align: center;
  z-index: 10;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;

  /* --- DIE ENTSCHEIDENDE ZEILE --- */
  pointer-events: none; 
}

.close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
}

.slogan h1 {
  font-size: 60px;
  font-weight: 700;
  color: #f5f5f5;
  text-shadow: 5px 5px 8px rgba(0, 0, 0, 0.75);
  margin: 0;
  line-height: 1.2;
}

/* CTA Button */
.cta-container {
  margin-top: 250px;
}

.spots-link {
  display: inline-block;
  background: #0084ff;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  padding: 22px 70px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  white-space: nowrap;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .slogan {
    position: relative;
    top: 20px;
    transform: translateX(0);
    width: 100%;
  }

  .slogan h1 {
    font-size: 28px;
  }

  .spots-link {
    font-size: 16px;
    padding: 15px 35px;
  }

}
</style>
