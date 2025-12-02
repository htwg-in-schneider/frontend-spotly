<script setup>
import { useBannerStore } from "@/stores/banner.js";

const banner = useBannerStore();
</script>

<template>
  <!-- Banner wird nur angezeigt, wenn isVisible = true -->
  <section class="slogan" v-if="banner.isVisible">
    <h1>Entdecke Konstanz neu!</h1>

    <div class="cta-container">
      <a 
        href="#" 
        class="spots-link"
        @click.prevent="banner.hideBanner()"
      >
        >> Hier mehr Spots entdecken
      </a>
    </div>
  </section>
</template>

<style scoped>
.slogan {
  position: absolute;
  top: 14.7%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
}

.slogan h1 {
  font-family: "Poppins", sans-serif;
  font-size: 60px;
  font-weight: 700;
  color: #f5f5f5;
  line-height: 1.5;
  text-shadow: 5px 5px 8px rgba(0, 0, 0, 0.75);
}

/* CTA */
.cta-container {
  position: absolute;
  top: 390%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.spots-link {
  display: inline-block;
  background: #0084ff;
  color: #f5f5f5;
  font-weight: 600;
  font-size: 20px;
  padding: 25px 100px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}

.spots-link:hover {
  background: #5dade2;
  transform: translateY(-1px);
}

/* responsive Banner */
@media (max-width: 768px) {
  .slogan {
    position: relative;
    top: 40px;
    max-width: 90%;
    margin: 0 auto;
  }

  .slogan h1 {
    font-size: 28px;
    line-height: 1.2;
  }

  .spots-link {
    position: relative;
    top: 20px;
    left: 0;
    text-align: center;
    display: block;
    font-size: 16px;
  }
}
</style>
