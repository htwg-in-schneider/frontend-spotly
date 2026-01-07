<template>
  <div class="about-wrapper">
    <h1 class="about-title">Über uns</h1>

    <div class="container-row">
      <div class="about-card">
        <div class="image-box">
          <img src="@/assets/Efeliz.jpg" alt="Efe-liz" class="profile-circle" />
        </div>
        <h2 class="member-name">Efe-liz</h2>

        <div class="reveal-content">
          <p class="member-text">
            Hi! Ich bin Efe-liz. Als leidenschaftliche Entdeckerin liebe ich es,
            die verborgenen Schätze unserer Stadt zu finden. Mit Spotly möchte ich
            helfen, diese besonderen Orte mit allen zu teilen.
          </p>
        </div>
      </div>

      <div class="about-card">
        <div class="image-box">
          <img src="@/assets/Moritz.jpg" alt="Moritz" class="profile-circle" />
        </div>
        <h2 class="member-name">Moritz</h2>

        <div class="reveal-content">
          <p class="member-text">
            Moin, ich bin Moritz. Für mich ist Konstanz mehr als nur eine Stadt am See.
            Spotly ist für mich die perfekte Möglichkeit, Technik und lokale
            Kultur zu verbinden.
          </p>
        </div>
      </div>

      <div class="project-card">
        <h2 class="project">Unser Projekt</h2>
        <p class="project-text">
          Spotly ist aus der Idee entstanden, das lokale Leben digitaler und persönlicher zu gestalten.
          Wir glauben, dass die besten Empfehlungen von Menschen kommen, die ihre Stadt lieben.
          Gemeinsam bauen wir eine Plattform für echte Geheimtipps in Konstanz.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-wrapper {
  text-align: center;
  margin-top: 60px;
  padding: 0 20px;
}

.about-title {
  font-size: 32px;
  font-weight: 700;
  color: #0084ff;
  margin-bottom: 50px;
}

.container-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto 100px;
}

/* --- ABOUT CARDS --- */
.about-card {
  width: 100%;
  max-width: 420px;
  background: #b19884;
  padding: 40px 30px;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  color: white;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}

.about-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* --- REVEAL ANIMATION --- */
.reveal-content {
  max-height: 0;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.about-card:hover .reveal-content {
  max-height: 200px; /* Genug Platz für den Text */
  opacity: 1;
  margin-top: 15px;
}

.member-text {
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

/* --- BILDER --- */
.image-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.5s ease;
}

.about-card:hover .profile-circle {
  transform: scale(1.05);
}

.member-name {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

/* --- PROJECT CARD (GLASS LOOK) --- */
.project-card {
  width: 100%;
  max-width: 880px;
  background: rgba(255, 255, 255, 0.6); /* Transparentes Weiß */
  backdrop-filter: blur(12px); /* Blur-Effekt wie im Header */
  padding: 40px 30px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  margin-top: 20px;
}

.project {
  color: #0084ff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
}

.project-text {
  color: #444; /* Dunklerer Text für bessere Lesbarkeit auf Glas */
  font-size: 17px;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .container-row {
    gap: 20px;
  }

  .profile-circle {
    width: 150px;
    height: 150px;
  }

  .reveal-content {
    max-height: 500px; /* Auf dem Handy direkt anzeigen oder kürzer fassen */
    opacity: 1;
  }
}
</style>