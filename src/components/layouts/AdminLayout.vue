<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container" :class="{ hasTagsView: settings.tagsView }">
      <div :class="{ 'fixed-header': settings.fixedHeader }">
        <Navbar @toggleDrawer="toggleDrawer" />
        <TagsView v-if="settings.tagsView" />
      </div>
      <AppMain />
      <Footer copyright="易联众·医信" />
      <a-drawer
        title="页面样式设置"
        placement="right"
        :closable="false"
        :visible="drawerShow"
        @close="onCloseDrawer"
      >
        <div class="drawer-item">
          <span>显示页签</span>
          <a-switch v-model:checked="settings.tagsView" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>固定导航头</span>
          <a-switch
            v-model:checked="settings.fixedHeader"
            class="drawer-switch"
          />
        </div>

        <div class="drawer-item">
          <span>显示导航logo</span>
          <a-switch
            v-model:checked="settings.sidebarLogo"
            class="drawer-switch"
          />
        </div>
      </a-drawer>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  ref
} from 'vue'
import { useStore } from 'vuex'
import { AppMain, Navbar, Sidebar, TagsView, Footer } from './components'
export default defineComponent({
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const settings = computed(() => store.state.settings)
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })

    const drawerShow = ref<boolean>(false)
    const onCloseDrawer = () => {
      drawerShow.value = false
    }
    const toggleDrawer = () => {
      drawerShow.value = true
    }

    // window resize
    const { body } = document
    const WIDTH = 992 // refer to Bootstrap's responsive design
    const isMobileHandler = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = isMobileHandler()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    return {
      classObj,
      settings,
      onCloseDrawer,
      drawerShow,
      toggleDrawer
    }
  },
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView,
    Footer
  }
})
</script>
<style lang="less" scoped>
@import '~@/styles/mixin.less';
@import '~@/styles/variables.less';

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - @sideBarCollapsedWidth);
}

.drawer-item {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
