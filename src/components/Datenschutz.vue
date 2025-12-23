<template>
  <div class="legal-container">
    <div class="legal-card">
      <h1>Datenschutzerklärung</h1>

      <section>
        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Web-Applikation
          ist ein studentisches Projekt. Personenbezogene Daten werden nur im Rahmen
          der technischen Notwendigkeit (z.B. Login via Auth0) verarbeitet.
        </p>
      </section>

      <section>
        <h2>2. Datenerfassung</h2>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen
          (z.B. bei der Registrierung oder durch das Kontaktformular).
          Andere Daten werden automatisch durch unsere IT-Systeme erfasst (z.B. IP-Adresse).
        </p>
      </section>

      <section>
        <h2>3. Auth0 und Sicherheit</h2>
        <p>
          Wir nutzen Auth0 für die Benutzerverwaltung. Dabei gelten die Datenschutzbestimmungen
          von Auth0. Passwörter werden verschlüsselt gespeichert.
        </p>
      </section>

      <button @click="$router.back()" class="back-btn">Zurück</button>
    </div>
  </div>
</template>

<style scoped>
.legal-container { display: flex; justify-content: center; padding: 100px 20px; }
.legal-card {
  background: rgba(255, 255, 255, 0.9); padding: 40px; border-radius: 25px;
  max-width: 800px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #333;
}
h1 { color: #0084ff; }
.back-btn { margin-top: 30px; background: #0084ff; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }
</style>