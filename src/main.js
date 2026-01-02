import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'       
import '@/assets/style.css'
import {createAuth0} from "@auth0/auth0-vue";

const pinia = createPinia()
const app = createApp(App)

app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Wichtig für das Backend-Token!
        },
    })
);
app.use(router)
app.use(pinia)

app.mount('#app')
