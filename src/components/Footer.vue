<template>
  <footer>
    <p>©️ 2025 Spotly – von Efe-liz & Moritz</p>

    <div class="footer-links">
      <FooterLink href="#">Impressum</FooterLink>
      <FooterLink href="#">Datenschutz</FooterLink>
      <FooterLink href="#">Kontakt</FooterLink>
    </div>
  </footer>
</template>

<script setup>
import FooterLink from "@/components/FooterLink.vue";
</script>

<style scoped>
footer {
  text-align: center;
  padding: 30px;
  color: #777;
}

.footer-links {
  margin-top: 10px;
}

@media (max-width: 768px) {
  footer {
    font-size: 14px;
    padding: 20px;
  }
}
</style>
