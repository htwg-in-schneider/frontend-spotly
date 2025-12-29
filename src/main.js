import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'
import router from './router/index.js'  
import { createPinia } from 'pinia'       
import './assets/style.css'

const pinia = createPinia()

const app = createApp(App)
app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    })
);

app.use(router)
app.use(pinia)


app.mount('#app')
