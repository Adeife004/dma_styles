import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { auth } from './firebase' // import your Firebase auth

AOS.init({
    duration: 1000,
    once: true,
})

// Wait for Firebase to know if the user is logged in before mounting Vue
let app

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})
