/* Layout */
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import BlankView from '@/components/layouts/BlankView.vue'
import { Component } from 'vue'

/**
 * redirect: 'noRedirect'         当设置 noRedirect 的时候该路由在面包屑导航中不可被点击 (为重定向到某路由时,需要将某路由的activeMenu设置为当前path)
 * hidden: true  (默认 false)      当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  * alwaysShow: true             当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                若你想不管路由下面的 children 声明的个数都显示你的根路由
                                你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * name: 'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
    roles: ['admin', 'editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'                设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'              设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true                 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false             如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true                   如果设置为true，它则会固定在tags-view中(默认 false)
    activeMenu: '/article/list'   当路由设置了该属性，则会高亮相对应的侧边栏。
                                  这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                  点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  }
*/

export type RouteConfig = {
  redirect?: string
  hidden?: boolean
  alwaysShow?: boolean
  name?: string
  path: string
  meta?: {
    roles?: string[]
    title?: string
    icon?: string
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
  }
  component?: Component
  children: Array<RouteConfig>
}

/**
 * errorRoutes
 * 所有的错误页 401 403 500
 * */

const errorRoutes = [
  {
    path: '/error',
    component: BlankView,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages'
    },
    hidden: true,
    breadcrumb: false,
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true, breadcrumb: false }
      },
      {
        path: '403',
        component: () => import('@/views/errorPage/403.vue'),
        name: 'Page403',
        meta: { title: '403', noCache: true, breadcrumb: false }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true, breadcrumb: false }
      },
      {
        path: '500',
        component: () => import('@/views/errorPage/500.vue'),
        name: 'Page500',
        meta: { title: '500', noCache: true, breadcrumb: false }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
    name: 'NotFound',
    hidden: true
  }
]

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以被访问
 */
export const constantRoutes = [
  {
    path: '/redirect', // 作为刷新当前路由的跳转路由不要删
    component: AdminLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/Index.vue')
      }
    ]
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'HomeOutlined',
          affix: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: AdminLayout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/Index.vue'),
        name: 'Guide',
        meta: {
          title: 'Guide',
          icon: 'SettingFilled',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/example',
    component: AdminLayout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'DashboardOutlined'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/example/List.vue'),
        name: 'ArticleList',
        meta: { title: 'List' }
      },
      {
        path: 'edit/:id(.+)',
        component: () => import('@/views/example/Edit.vue'),
        name: 'EditArticle',
        meta: {
          title: 'Edit Article',
          noCache: true,
          activeMenu: 'list' // 进入edit页面需要高亮的导航 只需要匹配对应路由的path即可
        },
        hidden: true
      },
      {
        path: 'son',
        component: () => import('@/views/example/Son.vue'),
        name: 'Son',
        meta: { title: 'Son' },
        children: [
          {
            path: 'child1',
            component: () => import('@/views/example/Child1.vue'),
            name: 'ArticleTestChild1',
            meta: { title: 'Child1' }
          },
          {
            path: 'child2',
            component: () => import('@/views/example/Child2.vue'),
            name: 'ArticleTestChild2',
            meta: { title: 'Child2' }
          }
        ]
      }
    ]
  },
  {
    path: '/tab',
    component: AdminLayout,
    meta: {
      title: 'Tab',
      icon: 'FolderOutlined'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/Index.vue'),
        name: 'Tab',
        meta: { title: 'Tab' }
      },
      {
        path: 'item',
        component: () => import('@/views/tab/Item.vue'),
        name: 'Item',
        meta: { title: 'Item' }
      }
    ]
  },
  ...errorRoutes
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 * */

export const asyncRoutes = []
