import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { auth } from './firebase'
import '@fortawesome/fontawesome-free/css/all.css'
import { useTheme } from './composables/useTheme'

AOS.init({
    duration: 1000,
    once: true,
})

// Initialize theme before mounting
const { initTheme } = useTheme()
initTheme()

// Wait for Firebase to know if the user is logged in before mounting Vue
auth.onAuthStateChanged(() => {
    const app = createApp(App)
    app.use(router)
    app.mount('#app')

    // Remove loading spinner / add loaded class
    document.body.classList.add('app-loaded')
})