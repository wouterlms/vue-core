import '../../components/src/styles/index.scss'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'

export const i18nPlugin = createI18n({
  legacy: false,
})

createApp(App).use(i18nPlugin).mount('#app')
