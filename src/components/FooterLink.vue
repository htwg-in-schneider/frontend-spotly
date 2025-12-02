<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a :href="href" class="footer-link">
    <slot></slot>
  </a>
</template>

<style scoped>
.footer-link {
  color: #777;
  text-decoration: none;
  margin: 0 10px;
  font-size: 14px;
  transition: 0.2s ease;
}

.footer-link:hover {
  color: #1c86ee;
  text-decoration: underline;
}
</style>
