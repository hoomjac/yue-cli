import { createApp } from 'vue'
import App from './App.vue'
import { injectConfig } from './framework/injectConfig'
import router from './router'
import store from './store'
import config from './shared/config'
import { registerGlobalComponent } from './utils/registerGlobalComp'
import * as antIcons from '@ant-design/icons-vue'

import '@/styles/index.less' // global css

injectConfig(config)

const app = createApp(App)

// 添加到全局
app.config.globalProperties.$antIcons = antIcons

registerGlobalComponent(app)
  .use(store)
  .use(router)
  .mount('#app')
