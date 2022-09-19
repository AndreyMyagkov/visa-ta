import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/style.css'

// My simple i18n
import Lng from './plugins/lng'
// Emulate container queries
import "./helpers/css-container-queries.js"

const app = createApp(App)


// Загрузка спрайта иконок
//const req = require.context('./assets/svg', false, /\.svg$/)
//const requireAll = requireContext => requireContext.keys().map(requireContext);
//requireAll(req);

// Берем клиентский конфиг приложения из массива конфигов или объекта
// Конфиг помещаем в свойство Vue для доступа в любом месте
window.__KV_CONFIG = window.__KV_CONFIG || {};
if (Array.isArray(window.__KV_CONFIG )) {
    app.config.globalProperties.$__KV_CONFIG = window.__KV_CONFIG.shift()
} else if (typeof window.__KV_CONFIG === 'object') {
    app.config.globalProperties.$__KV_CONFIG = window.__KV_CONFIG
}
app.use(Lng, app.config.globalProperties.$__KV_CONFIG.lng || "ge")
app.mount(`#${app.config.globalProperties.$__KV_CONFIG.elementId}`)
