import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    // 用户管理
    path: '/user',
    component: Layout,
    redirect: '/user/wx',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'wx',
        name: 'Wx',
        component: () => import('@/views/user/wxUser'),
        meta: { title: '小程序用户', icon: 'table' }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/user/adminUser'),
        meta: { title: '后台管理员', icon: 'table' }
      }
    ]
  },

  {
    // 认证管理
    path: '/auth',
    component: Layout,
    redirect: '/auth/edu',
    name: 'Auth',
    meta: { title: '信息认证管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'edu',
        name: 'Edu',
        component: () => import('@/views/auth/edu/index'),
        meta: { title: '教育信息认证', icon: 'el-icon-s-custom' }
      },
      {
        path: 'job',
        name: 'Job',
        component: () => import('@/views/auth/job/index'),
        meta: { title: '工作信息认证', icon: 'el-icon-s-custom' }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/auth/yzb/index'),
        meta: { title: '柚子帮成员审核', icon: 'el-icon-s-custom' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    name: 'Link',
    meta: { title: 'External-Link', icon: 'el-icon-link' },
    children: [
      {
        path: 'https://github.com/gongsir0630/campus-recruitment-guidance-admin.git',
        meta: { title: 'GitHub Repository', icon: 'link' }
      },
      {
        path: 'https://github.com/gongsir0630/',
        meta: { title: 'About Me', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
