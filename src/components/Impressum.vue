<template>
  <div class="legal-container">
    <div class="legal-card">
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Spotly Projekt-Team<br />
          Hochschule Konstanz (HTWG)<br />
          Brauneggerstraße 55<br />
          78462 Konstanz
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: support@spotly-konstanz.de
        </p>
      </section>

      <section>
        <h2>Vertreten durch</h2>
        <p>
          Efe-liz Kings<br />
          Moritz Bader
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Dies ist ein Studienprojekt im Rahmen der Vorlesung Web-Programmierung.
          Die Inhalte dienen ausschließlich Lehrzwecken.
        </p>
      </section>

      <div class="top-left-nav">
        <router-link to="/">
          <Button variant="secondary" round>&lt;</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
</script>

<style scoped>
.top-left-nav { position: absolute; top: 270px; left: 20px; z-index: 100; }
.legal-container {
  display: flex;
  justify-content: center;
  padding: 100px 20px;
}

.legal-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 25px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  color: #333;
}

h1 {
  color: #0084ff;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.2rem;
  margin-top: 20px;
  color: #555;
}

p {
  line-height: 1.6;
}

</style>
