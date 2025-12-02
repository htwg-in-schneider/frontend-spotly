import { defineStore } from "pinia";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    isVisible: true
  }),

  actions: {
    hideBanner() {
      this.isVisible = false;
      // optional: persistent speichern ↓
      localStorage.setItem("bannerHidden", "true");
    },

    loadState() {
      const saved = localStorage.getItem("bannerHidden");
      if (saved === "true") {
        this.isVisible = false;
      }
    }
  }
});
