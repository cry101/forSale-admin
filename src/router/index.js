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
        redirect: '/company'
    },

    {
        path: '/company',
        component: Layout,
        redirect: '/company/list',
        meta: { title: '公司管理' },
        children: [
            {
                path: 'list',
                component: () => import('@/views/company'),
                meta: { title: '公司列表' }
            }
        ]
    },

    {
        path: '/product',
        component: Layout,
        redirect: '/product/tag',
        meta: { title: '产品管理' },
        children: [
            {
                path: 'tag',
                component: () => import('@/views/tag'),
                meta: { title: '产品分类' }
            },
            {
                path: 'product',
                component: () => import('@/views/product'),
                meta: { title: '产品列表' }
            }
        ]
    },
    {
        path: '/customer',
        component: Layout,
        redirect: '/customer/list',
        meta: { title: '顾客管理' },
        children: [
            {
                path: 'list',
                component: () => import('@/views/customer'),
                meta: { title: '顾客列表' }
            }
        ]
    },
    {
        path: '/inventory',
        component: Layout,
        redirect: '/inventory/record',
        meta: { title: '库存管理' },
        children: [
            {
                path: 'record',
                component: () => import('@/views/record'),
                meta: { title: '进销记录' }
            },
            {
                path: 'list',
                component: () => import('@/views/inventory'),
                meta: { title: '库存列表' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: { title: '用户管理' },
        children: [
            {
                path: 'list',
                component: () => import('@/views/user'),
                meta: { title: '用户列表' }
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
