<template>
  <div class="about-page">
    <!-- SECTION 1: "Story" (wie Vorlage oben) -->
    <section class="editorial-top">
      <div class="editorial-inner">
        <div class="top-left">
          <p class="kicker">Über uns</p>
          <h1 class="headline">Unsere Spotly Story</h1>
        </div>

        <div class="top-right">
          <p class="lead">
            Spotly ist als kleines Herzensprojekt in Konstanz gestartet, weil wir finden:
            Die besten Orte entdeckt man nicht über Google, sondern durch Menschen.
          </p>
          <p class="muted">
            Wir bauen Spotly für echte Geheimtipps, Lieblingsorte und Empfehlungen,
            die man sonst nie finden würde.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Mitte (bei Vorlage ist hier Bild/Video) -> bei euch TEAM CARDS -->
    <section class="center-media">
      <div class="center-media-inner">
        <!-- TEAM CARDS (dein Code, nur eingebettet) -->
        <div class="container-row">
          <div class="about-card">
            <div class="image-box">
              <img src="@/assets/Efeliz.jpg" alt="Efe-liz" class="profile-circle" />
            </div>
            <h2 class="member-name">Efe-liz</h2>
            <div class="reveal-content">
              <p class="member-text">
                Hi, ich bin Efe-liz. Ich liebe es, neue Lieblingsorte zu entdecken und weiterzugeben. Genau dafür gibt’s Spotly :)
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
                Moin, ich bin Moritz. Ich verbinde Technik mit lokaler Kultur
                und echten Orten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: "What drives us" (wie Vorlage) -->
    <section class="drive">
      <div class="drive-inner">
        <div class="drive-left">
          <h2 class="drive-title">
            Was uns antreibt <span class="arrow">↘</span>
          </h2>
        </div>

        <div class="drive-right">
          <p>
            Wir wollen Konstanz digital persönlicher machen – mit Empfehlungen, die sich echt anfühlen.
            Spotly soll dir Orte zeigen, die du sonst nur durch Freunde entdecken würdest.
          </p>
          <p class="muted">
            Kein „Top 10“-Tourikram – sondern echte Spots, echte Menschen, echte Stimmung.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 4: großer Bild-Band (wie Vorlage unten, nur mit eurer Farbe) -->
    <section class="big-band">
      <div class="big-band-overlay">
        <h3>Spotly ist für Menschen, die ihre Stadt fühlen.</h3>
        <p>
          Ob Café, Spaziergang am See oder ein Abendspot – wir sammeln Geheimtipps aus der Community.
        </p>
        <router-link to="/spots" class="cta-link">
          <button class="cta">Spots entdecken →</button>
        </router-link>

      </div>
    </section>

    <!-- SECTION 5: Mission / Vision / Werte (wenn du willst, kannst du die auch drin lassen) -->
    <section class="stack">
      <div class="stack-inner">
        <div class="stack-block">
          <h2>Unsere Mission</h2>
          <p>
            Lokale Orte sichtbar machen, die man nicht googeln kann.
            Empfehlungen von Menschen – nicht von Algorithmen.
          </p>
        </div>

        <div class="stack-block">
          <h2>Unsere Vision</h2>
          <p>
            Eine Stadt, in der man sich nicht wie ein Tourist fühlt,
            sondern wie jemand, der dazugehört.
          </p>
        </div>

        <div class="stack-block">
          <h2>Unsere Werte</h2>
          <ul>
            <li>Echte Empfehlungen statt Werbung</li>
            <li>Lokal denken, menschlich handeln</li>
            <li>Qualität vor Quantität</li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>


<style scoped>

/* ========= THEME ========= */
.about-page {
  --blue: #5daae0;
  --blue-strong: rgba(93, 170, 224, 0.92);
  --blue-soft: rgba(93, 170, 224, 0.22);
  --ink: #121212;
  --muted: rgba(18, 18, 18, 0.65);
  --line: rgba(18, 18, 18, 0.08);

  color: var(--ink);
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;


}
/* ========= SECTION 1 (Top editorial) ========= */
.editorial-top {
  padding: 80px 20px 40px;
  border-bottom: 1px solid var(--line);
  background: rgba(93, 170, 224, 0.05);
}

.editorial-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: start;
}

.kicker {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.headline {
  margin: 0;
  font-size: 54px;
  line-height: 1.02;
  font-weight: 800;
  color: #0084ff;
}

.lead {
  margin: 6px 0 14px;
  font-size: 16px;
  line-height: 1.7;
}

.muted {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--muted);
}

/* ========= SECTION 2 (Center media area) ========= */
.center-media {
  padding: 50px 20px 70px;
  border-bottom: 1px solid var(--line);

  /* leichtes blaues "wash", aber sehr subtil */
  background: linear-gradient(
      180deg,
      rgba(93,170,224,0.10),
      rgba(93,170,224,0.02)
  );
}


.center-media-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* TEAM CARDS: passen in die Vorlage (wie "Media") */
.container-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.about-card {
  width: 100%;
  max-width: 520px; /* breiter, wirkt wie "Video-Frame" */
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px);
  padding: 42px 34px;
  border-radius: 26px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.10);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
}

.about-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.14);
}

.image-box {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.profile-circle {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 18px 40px rgba(0,0,0,0.16);
  transition: transform 0.35s ease;
}

.about-card:hover .profile-circle {
  transform: scale(1.05);
}

.member-name {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px;
  color: #5daae0;
}

.reveal-content {
  max-height: 0;
  opacity: 0;
  transition: all 0.35s ease;
}

.about-card:hover .reveal-content {
  max-height: 220px;
  opacity: 1;
  margin-top: 12px;
}

.member-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--muted);
  border-top: 1px solid rgba(18,18,18,0.10);
  padding-top: 14px;
}

/* ========= SECTION 3 (What drives us) ========= */
.drive {
  padding: 70px 20px;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.6);
}

.drive-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 60px;
  align-items: start;
}

.drive-title {
  margin: 0;
  font-size: 34px;
  font-weight: 850;
  line-height: 1.1;
  color: #5daae0;
}

.arrow {
  display: inline-block;
  margin-left: 8px;
  color: var(--blue);
}

/* ========= SECTION 4 (Big band) ========= */
.big-band {
  position: relative;
  height: 420px;
  background:
      linear-gradient(180deg, rgba(0,0,0,0.20), rgba(0,0,0,0.55)),
      radial-gradient(1200px 600px at 20% 20%, rgba(93,170,224,0.65), transparent 60%),
      radial-gradient(900px 500px at 80% 30%, rgba(93,170,224,0.35), transparent 60%),
      linear-gradient(180deg, rgba(93,170,224,0.15), rgba(93,170,224,0.35));
  overflow: hidden;
  display: grid;
  place-items: center;
}

.big-band-overlay {
  text-align: center;
  color: #fff;
  max-width: 900px;
  padding: 0 20px;
}

.big-band-overlay h3 {
  margin: 0 0 10px;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.big-band-overlay p {
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255,255,255,0.88);
}

.cta {
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  background: rgba(255,255,255,0.92);
  color: #0f2c3b;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cta:hover { transform: translateY(-2px); }

/* ========= SECTION 5 (Stack blocks) ========= */
.stack {
  padding: 70px 20px;
  background: rgba(255, 255, 255, 0.20);
}


.stack-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.stack-block {
  padding: 34px 32px;
  border-radius: 20px;
  background: rgba(93, 170, 224, 0.10);
  border: 1px solid rgba(93, 170, 224, 0.16);
  text-align: center;
  color: #5daae0;
}

.stack-block h2 {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 900;
}

.stack-block p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}


.stack-block ul {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}

.stack-block li {
  line-height: 2;
  color: rgba(18,18,18,0.78);
}

.cta-link {
  text-decoration: none;
  display: inline-block;
}


/* ========= RESPONSIVE ========= */
@media (max-width: 980px) {
  .editorial-inner {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .headline {
    font-size: 42px;
  }

  .drive-inner {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .end-card {
    grid-template-columns: 1fr;
    padding: 38px 24px;
  }

  .end-text { text-align: center; }
  .end-spots { justify-content: center; }
}

@media (max-width: 768px) {
  .about-card { padding: 34px 22px; }
  .profile-circle { width: 160px; height: 160px; }

  /* auf Mobile Reveal immer sichtbar */
  .reveal-content { max-height: 500px; opacity: 1; margin-top: 12px; }

  .spot-tile { width: 130px; height: 90px; }
  .big-band-overlay h3 { font-size: 34px; }
}
</style>
