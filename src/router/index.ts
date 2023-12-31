// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入路由组件
import mian from '@/views/index.vue'
import color from '@/views/color/index.vue'
import authorize from '@/views/authorize/index.vue'
import authorizeSearch from '@/views/authorize/search.vue'
import colorDetail from '@/views/color/detail.vue'
import product from '@/views/product/index.vue'
import security from '@/views/security/search.vue'
import warranty from '@/views/warranty/search.vue'
import warrantyDetail from '@/views/warranty/detail.vue'
import warrantyList from '@/views/warranty/list.vue'
import pdf from '@/views/pdf.vue'
NProgress.configure({ showSpinner: true, parent: '#app' })

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    name: 'main',
    component: mian,
  },
  {
    path: '/color',
    name: 'color',
    component: color,
  },
  {
    path: '/product',
    name: 'product',
    component: product,
  },
  {
    path: '/color/detail',
    name: 'color-detail',
    component: colorDetail,
  },
  {
    path: '/authorize',
    name: 'authorize',
    component: authorize,
  },
  {
    path: '/authorize/search',
    name: 'authorize-search',
    component: authorizeSearch,
  },
  {
    path: '/security',
    name: 'security',
    component: security,
  },
  {
    path: '/warranty',
    name: 'warranty',
    component: warranty,
  },
  {
    path: '/warranty/list',
    name: 'warrantyList',
    component: warrantyList,
  },
  {
    path: '/warranty/detail',
    name: 'warrantyDetail',
    component: warrantyDetail,
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: pdf,
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 导出路由实例，并在 `main.ts` 挂载
export default router
