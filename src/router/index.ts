import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './routes'

const routes: Array<RouteRecordRaw> = [...constantRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
