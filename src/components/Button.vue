<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "accent" // accent = Dunkelblau, secondary = Hellblau (#6eb5f3)
  },
  round: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="['btn', variant, { 'round': round }]">
    <template v-if="round">
      <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="arrow-icon"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </template>
    <slot v-else></slot>
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
  text-decoration: none;
}


.arrow-icon {
  width: 20px;
  height: 20px;
  color: white;
}

</style>