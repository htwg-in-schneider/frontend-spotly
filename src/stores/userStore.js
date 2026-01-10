// In src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userProfile: null
    }),
    actions: {
        async fetchProfile(token) {
            try {
                const response = await fetch('https://backend-spotly.onrender.com/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    this.userProfile = await response.json();
                }
            } catch (error) {
                this.userProfile = null;
            }
        },
        clearProfile() {
            this.userProfile = null;
        }
    }
});