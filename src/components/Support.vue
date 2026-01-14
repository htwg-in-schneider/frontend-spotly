<script setup>
import {ref} from 'vue';

const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

function sendMail() {
  const recipient = "support@spotly-konstanz.de";
  const subject = encodeURIComponent(`Support-Anfrage: ${contactForm.value.name}`);
  const body = encodeURIComponent(
      `Name: ${contactForm.value.name}\n` +
      `E-Mail: ${contactForm.value.email}\n\n` +
      `Nachricht:\n${contactForm.value.message}`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Support & Kontakt</h1>

    <div class="card">
      <div class="image-box">
      </div>

      <form @submit.prevent="sendMail">
        <input
            v-model="contactForm.name"
            type="text"
            class="input"
            placeholder="Dein Name"
            required
        />
        <input
            v-model="contactForm.email"
            type="email"
            class="input"
            placeholder="Deine E-Mail Adresse"
            required
        />
        <textarea
            v-model="contactForm.message"
            class="textarea"
            placeholder="Wie können wir dir helfen?"
            required
        ></textarea>

        <button type="submit" class="create-btn">
          E-Mail Programm öffnen
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
  /* Nutzt Padding statt festem Margin für bessere mobile Abstände */
  padding: 80px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  /* Nutzt clamp für flüssige Schriftgröße (Min, Scale, Max) */
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 800;
  color: #0084ff;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
}

.card {
  width: 100%;
  /* Max-width sorgt dafür, dass es am Desktop nicht zu breit wird */
  max-width: 450px;
  background: #b19884;
  padding: clamp(20px, 5vw, 40px); /* Padding passt sich Handy an */
  border-radius: 35px; /* Etwas weichere Ecken für modernen Look */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  box-sizing: border-box; /* WICHTIG: Padding wird in die Breite eingerechnet */
}

/* Form Styling */
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input, .textarea {
  width: 100%;
  box-sizing: border-box; /* Verhindert Überlaufen */
  border: 2px solid transparent; /* Vorbereitet für Fokus-Effekt */
  font-family: 'Inter', sans-serif;
  font-size: 16px; /* Verhindert Auto-Zoom bei iOS */
  transition: all 0.3s ease;
}

.input {
  padding: 14px 22px;
  border-radius: 50px;
  margin-bottom: 15px;
}

.textarea {
  height: 150px;
  padding: 18px 22px;
  border-radius: 25px;
  margin-bottom: 20px;
  resize: none;
}

/* Fokus-Effekte für bessere User Experience */
.input:focus, .textarea:focus {
  outline: none;
  border-color: #0084ff;
  background-color: #fff;
  transform: translateY(-2px);
}

.create-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 132, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.create-btn:hover {
  background: #0073e6;
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 132, 255, 0.4);
}

.create-btn:active {
  transform: scale(0.98);
}

/* Responsive Feinschliff */
@media (max-width: 480px) {
  .wrapper {
    padding: 40px 15px;
    margin-top: 20px;
  }

  .card {
    border-radius: 25px; /* Etwas weniger Radius auf kleinen Screens */
  }

  .create-btn {
    font-size: 16px;
    padding: 14px;
  }
}
</style>