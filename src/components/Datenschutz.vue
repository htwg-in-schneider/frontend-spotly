<script setup>
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";

const router = useRouter();
</script>

<template>
  <div class="top-left-nav">
    <router-link to="/">
      <Button variant="secondary" round>&lt;</Button>
    </router-link>
  </div>

  <div class="legal-container">
    <div class="legal-card">


      <h1 class="title">Datenschutzerklärung</h1>

      <section class="legal-section">
        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          Diese Web-Applikation ist ein studentisches Projekt.
          Personenbezogene Daten werden nur im Rahmen der technischen
          Notwendigkeit (z.B. Login via Auth0) verarbeitet.
        </p>
      </section>

      <section class="legal-section">
        <h2>2. Datenerfassung</h2>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen
          (z.B. bei der Registrierung oder durch das Kontaktformular).
          Andere Daten werden automatisch durch unsere IT-Systeme erfasst
          (z.B. IP-Adresse).
        </p>
      </section>

      <section class="legal-section">
        <h2>3. Auth0 und Sicherheit</h2>
        <p>
          Wir nutzen Auth0 für die Benutzerverwaltung.
          Dabei gelten die Datenschutzbestimmungen von Auth0.
          Passwörter werden verschlüsselt gespeichert.
        </p>
      </section>


    </div>
  </div>
</template>

<style scoped>
.top-left-nav {
  position: absolute;
  top: 270px;
  left: 20px;
  z-index: 100;
}

.legal-container {
  display: flex;
  justify-content: center;
  padding: 120px 20px;
}

.legal-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  padding: 60px 60px 80px;
  border-radius: 30px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  color: #333;
}

/* Titel */
.title {
  color: #0084ff;
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 50px;
}

/* Sections */
.legal-section {
  margin-bottom: 45px;
}

.legal-section h2 {
  font-size: 26px;
  margin-bottom: 15px;
  color: #222;
}

.legal-section p {
  font-size: 17px;
  line-height: 1.7;
  color: #444;
  max-width: 720px;
}


/* Mobile */
@media (max-width: 768px) {
  .legal-card {
    padding: 40px 25px 80px;
  }

  .title {
    font-size: 32px;
  }

  .legal-section h2 {
    font-size: 22px;
  }

  .legal-section p {
    font-size: 16px;
  }
}
</style>
