import { createSSRApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/index.scss'

// pinia store
import pinia from '@/stores'
import { share } from '@/utils/share'

let _appconfig = {}

// #ifdef MP
const { onShareAppMessage, onShareTimeline } = share()
_appconfig = { onShareAppMessage, onShareTimeline }
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
