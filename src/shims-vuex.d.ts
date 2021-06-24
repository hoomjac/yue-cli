// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

import { appState } from './store/modules/app'
import { settingsState } from './modules/settings'

interface State {
  app: appState
  settings: settingsState
}

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
