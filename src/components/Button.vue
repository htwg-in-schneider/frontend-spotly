<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "accent" // accent = blau, secondary = grau
  }
})
</script>

<template>
  <button :class="['btn', variant]">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 12px 35px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

/* Acccent Button */
.accent {
  background: #0084ff;
  color: white;
}

.accent:hover {
  background: #1c86ee;
}

/* Secondary Button */
.secondary {
  background: #dcdcdc;
  color: #333;
}

.secondary:hover {
  background: #c5c5c5;
}
</style>
