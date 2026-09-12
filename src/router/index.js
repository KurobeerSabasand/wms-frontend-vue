import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductListView.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddProductView.vue'),
    },
    {
      path: '/shipments',
      name: 'shipments',
      component: () => import('../views/ShipmentsListView.vue'),
    },
    {
      path: '/shipments/:shipment_id',
      name: 'shipment-detail',
      component: () => import('../views/ShipmentDetailView.vue'),
      props: true,
    },
    {
      path: '/shipments/import-json',
      name: 'import-json',
      component: () => import('../views/JsonImportView.vue'),
    },
    {
      path: '/shipments/import-csv',
      name: 'import-csv',
      component: () => import('../views/CsvImportView.vue'),
    },
  ],
})

// ログインガード
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router