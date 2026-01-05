<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "accent" // accent = blau, secondary = grau
  },
  round: {
    type: Boolean,
    default: false // Macht den Button kreisrund, wenn 'round' im Tag steht
  }
})
</script>

<template>
  <button :class="['btn', variant, { 'round': round }]">
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none; /* Falls du den Button mal in einem Link nutzt */
}

/* Runder Button Style */
.round {
  width: 45px;
  height: 45px;
  padding: 0;
  border-radius: 50%;
  font-size: 22px;
  flex-shrink: 0;
}

/* Accent (Blau) */
.accent {
  background: #0084ff;
  color: white;
}
.accent:hover {
  background: #1c86ee;
}

/* Secondary (Grau) */
.secondary {
  background: #dcdcdc;
  color: #333;
}
.secondary:hover {
  background: #c5c5c5;
}
</style>