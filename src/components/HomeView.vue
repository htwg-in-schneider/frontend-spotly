<!-- src/views/HomeView.vue -->
<script setup>
import { spots } from "@/data.js";
import SpotCard from "@/components/SpotCard.vue";
import SpecialBanner from "@/components/SpecialBanner.vue";
</script>

<template>
  <!-- Hintergrund -->
  <div class="background">
    <div class="ellipse ellipse1"></div>
    <div class="ellipse ellipse2"></div>
    <div class="ellipse ellipse3"></div>

    <img src="@/assets/background.jpeg" alt="Background" class="bg-image">
  </div>

  <!-- Special Banner -->
  <SpecialBanner />

  <!-- Carousel -->
  <div 
    id="carouselExampleAutoplaying" 
    class="carousel slide" 
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/park.jpg" class="d-block w-100" alt="Park">
      </div>
      <div class="carousel-item">
        <img src="@/assets/shop.jpg" class="d-block w-100" alt="Shop">
      </div>
      <div class="carousel-item">
        <img src="@/assets/event.jpg" class="d-block w-100" alt="Event">
      </div>
      <div class="carousel-item">
        <img src="@/assets/cafe.jpeg" class="d-block w-100" alt="Café">
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- Intro Wave -->
  <main>
    <section class="scroll-space"></section>

    <section class="intro-wave">
      <div class="wave-content">

        <img src="@/assets/Moritz.jpg" alt="Linkes Bild" class="circle-image">

        <div class="wave-text">
          <h2>Unsere Idee hinter Spotly:</h2>
          <p>
            Spotly ist unsere Art, Konstanz neu zu entdecken — durch echte Tipps von echten Menschen.
            Wir, Efe-liz und Moritz, haben Spotly entwickelt, weil wir gemerkt haben, wie schwer es ist,
            gute Orte zu finden, wenn man neu in der Stadt ist.  
            Auf Spotly teilen Locals ihre Lieblingsplätze, von kleinen Cafés bis zu geheimen Spots am See.
          </p>
        </div>

      </div>
    </section>

    <section class="scroll-space"></section>

    <!-- SPOT-KARTEN -->
    <section class="spots">
      <div class="spots-container">
        <SpotCard 
          v-for="spot in spots"
          :key="spot.id"
          :spot="spot"
        />
      </div>
    </section>
  </main>
</template>
