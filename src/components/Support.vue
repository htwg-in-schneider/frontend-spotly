<script setup>
import { ref } from 'vue';

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

.support-page {
  min-height: 100vh;
  padding: 40px 20px;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  color: #0084ff;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
}

.wrapper {
  text-align: center;
  margin-top: 60px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #0084ff;
  margin-bottom: 30px;
}

.title2 {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 30px;
}

.card {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: #b19884;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.image-box {
  text-align: center;
  margin-bottom: 20px;
}

.placeholder {
  width: 100%;
  height: 150px; /* Leicht gekürzt für Support */
  background: white;
  border-radius: 15px;
  line-height: 150px;
  font-size: 22px;
  color: #b19884;
}

/* --- INPUTS --- */
.input {
  width: 100%;
  padding: 12px 20px;
  border-radius: 30px;
  border: none;
  margin-bottom: 15px;
  font-family: inherit;
}

.textarea {
  width: 100%;
  height: 120px;
  padding: 15px 20px;
  border-radius: 20px;
  border: none;
  margin-bottom: 15px;
  font-family: inherit;
  resize: none;
}

/* --- BUTTON --- */
.create-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.create-btn:hover {
  background: #5dade2;
}

/* Responsive Fix */
@media (max-width: 480px) {
  .card {
    padding: 20px;
  }
  .title {
    font-size: 26px;
  }
}
</style>