import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

import modules from './modules'
import { appState } from './modules/app'
import { settingsState } from './modules/settings'
import { PermissionState } from './modules/permission'

export interface State {
  app: appState
  settings: settingsState
  permission: PermissionState
}

export const key: InjectionKey<Store<State>> = Symbol('store')

export default createStore<State>({
  state: <State>{},
  mutations: {},
  actions: {},
  modules
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
