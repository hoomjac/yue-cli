<template>
  <div :class="{ 'has-logo': showLogo }" class="sider-scrollbar">
    <logo v-if="showLogo" :collapsed="collapsed" />
    <a-menu
      class="sider-menu"
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsed"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="handleOpenChange"
    >
      <SidebarItem
        v-for="route in permissionRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </a-menu>
  </div>
</template>
<script lang="ts">
import { toRefs } from '@vueuse/core'
import { computed, defineComponent, reactive, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const route = reactive<RouteLocationNormalizedLoaded>(useRoute())
    const store = useStore()
    const sidebar = computed(() => store.state.app.sidebar)
    const collapsed = computed(() => !sidebar.value.opened)
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const permissionRoutes = computed(() => store.state.permission.routes)

    interface SideBarState {
      selectedKeys: string[]
      openKeys: string[]
      preOpenKeys: string[]
      rootSubmenuKeys: string[]
    }

    const state = reactive<SideBarState>({
      selectedKeys: [],
      openKeys: [],
      preOpenKeys: [],
      rootSubmenuKeys: []
    })

    // 更新openks
    const updateOpenKeys = () => {
      state.openKeys = route.matched.map(item => item.path)
      const oldRoute = [...state.openKeys]
      const addRoutes = []
      for (let i = 0; i < state.openKeys.length; i++) {
        if (i < state.openKeys.length - 1) {
          addRoutes.push(
            state.openKeys[i + 1].split(state.openKeys[i] + '/')[1]
          )
        }
      }
      state.openKeys = oldRoute.concat(addRoutes)
    }

    const handleOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(
        key => state.openKeys.indexOf(key) === -1
      )
      if (
        latestOpenKey &&
        state.rootSubmenuKeys.indexOf(latestOpenKey) === -1
      ) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }

    watch(
      () => route.path,
      () => {
        const { meta, matched } = route
        if (meta && meta.activeMenu) {
          state.selectedKeys = [meta.activeMenu as string]
        } else if (matched.length === 2 && matched[0].children.length === 1) {
          state.selectedKeys = [matched[0].path]
        } else {
          const matchedP1 = matched[matched.length - 1].path
          const matchedP2 = matched[matched.length - 2].path
          const path = matchedP1.split(matchedP2 + '/')[1]
          state.selectedKeys = [path]
        }
        updateOpenKeys()
      },
      {
        immediate: true
      }
    )

    return {
      ...toRefs(state),
      handleOpenChange,
      collapsed,
      showLogo,
      permissionRoutes
    }
  },
  components: {
    Logo,
    SidebarItem
  },
  methods: {}
})
</script>
