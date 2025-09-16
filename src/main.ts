import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { router } from './router'

createApp(App).use(autoAnimatePlugin).use(router).mount('#app')
