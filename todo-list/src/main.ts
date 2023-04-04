import App from './App.vue'
import store from './store'
import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

const app = createApp(App).use(store).use(store)

registerPlugins(app)

app.mount('#app')
