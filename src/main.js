import   piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//入我们的初始化样式文件
import '@/styles/common.scss'
// 引入懒加载插件
import {lazyPlugin} from "@/directives/index.js"
// 加载components 中的两个插件
import {componentPlugin} from '@/components/index.js'


const app = createApp(App)
const pinia = createPinia()
// 把填入的信息存储到本地存储中去
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// 注册懒记载插件
app.use(lazyPlugin)
// 注册使用
app.use(componentPlugin)
app.mount('#app')