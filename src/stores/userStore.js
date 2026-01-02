import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userProfile = ref(null);

    // Diese Funktion rufen wir nach dem Login auf
    async function fetchProfile(token) {
        const response = await fetch('http://localhost:8080/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
            userProfile.value = await response.json();
        }
    }

    return { userProfile, fetchProfile };
});