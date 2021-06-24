import { asyncRoutes, constantRoutes, RouteConfig } from '@/router/routes'
import { ActionTree, MutationTree } from 'vuex'

/**
 * 用 meta.role 判断当前路由项是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteConfig) {
  if (route.meta && route.meta.roles) {
    const metaRoles = route.meta.roles
    return roles.some((role: string) => metaRoles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any, roles: string[]) {
  const res: RouteConfig[] = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export type PermissionState = {
  routes: any
  addRoutes: any
}

const state: PermissionState = {
  routes: [...constantRoutes], // 权限路由
  addRoutes: []
}

const mutations: MutationTree<PermissionState> = {
  SET_ROUTES: (state: PermissionState, routes: any) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions: ActionTree<PermissionState, any> = {
  generateRoutes({ commit }, roles: string[]) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
