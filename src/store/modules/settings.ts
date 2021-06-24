import { Module } from 'vuex'

import { defaultSettings } from '@/config/settings'
const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  title,
  homePath
} = defaultSettings

export type settingsState = {
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
  appTitle: string
  homePath: string
}

const Settings: Module<any, any> = {
  namespaced: true,
  state: <settingsState>{
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    appTitle: title,
    homePath: homePath
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      // if (state.hasOwnProperty(key)) {
      state[key] = value
      // }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

export default Settings
