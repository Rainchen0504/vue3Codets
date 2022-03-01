import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { setupStore } from './store'

const app = createApp(App)

app.use(ElementPlus)
app.use(globalRegister)
app.use(store)

setupStore()

app.use(router)

app.mount('#app')
