// composables/useTheme.js
import { ref, watch } from 'vue'
import { auth, db } from '../firebase'
import { ref as dbRef, onValue, set } from 'firebase/database'

// Global theme color state
const themeColor = ref('#FFD700') // Default gold

function applyThemeColor(color) {
    // Apply to both theme-color and accent-color for compatibility
    document.documentElement.style.setProperty('--theme-color', color)
    document.documentElement.style.setProperty('--accent-color', color)

    const rgb = hexToRgb(color)
    if (rgb) {
        const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`
        document.documentElement.style.setProperty('--theme-color-rgb', rgbString)
        document.documentElement.style.setProperty('--accent-color-rgb', rgbString)
    }

    // Also save to localStorage for quick loading
    localStorage.setItem('userAccentColorHex', color)
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

// Apply theme when color changes
watch(themeColor, (newColor) => applyThemeColor(newColor))

export function useTheme() {
    async function loadThemeColor() {
        const user = auth.currentUser

        // If no user, try to load from localStorage first
        if (!user) {
            const savedColor = localStorage.getItem('userAccentColorHex')
            if (savedColor) {
                themeColor.value = savedColor
                applyThemeColor(savedColor)
            }
            return
        }

        const userRef = dbRef(db, `users/${user.uid}/themeColor`)
        onValue(userRef, (snapshot) => {
            const color = snapshot.val()
            themeColor.value = color || '#FFD700'
            applyThemeColor(themeColor.value)
        })
    }

    async function saveThemeColor(color) {
        const user = auth.currentUser

        // Always save to localStorage for immediate effect
        localStorage.setItem('userAccentColorHex', color)
        themeColor.value = color
        applyThemeColor(color)

        // Save to Firebase if user is logged in
        if (user) {
            await set(dbRef(db, `users/${user.uid}/themeColor`), color)
        }
    }

    // Initialize theme on first load
    function initTheme() {
        const savedColor = localStorage.getItem('userAccentColorHex')
        if (savedColor) {
            themeColor.value = savedColor
            applyThemeColor(savedColor)
        }

        // Then try to load from Firebase if user is logged in
        loadThemeColor()
    }

    return {
        themeColor,
        loadThemeColor,
        saveThemeColor,
        applyThemeColor,
        initTheme
    }
}