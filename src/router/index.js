import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProductListView from '../views/ProductListView.vue'
import AddProductView from '../views/AddProductView.vue'
import MenuView from '../views/MenuView.vue'
import ShipmentsListView from '../views/ShipmentsListView.vue'
import ShipmentDetailView from '../views/ShipmentDetailView.vue'
import JsonImportView from '../views/JsonImportView.vue'
import CsvImportView from '../views/CsvImportView.vue'

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
      component: LoginView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductListView,
    },
    {
      path: '/add',
      name: 'add',
      component: AddProductView,
    },
    {
      path: '/shipments',
      name: 'shipments',
      component: ShipmentsListView,
    },
    {
      path: '/shipments/:shipment_id',
      name: 'shipment-detail',
      component: ShipmentDetailView,
      props: true,
    },
    {
      path: '/shipments/import-json',
      name: 'import-json',
      component: JsonImportView,
    },
    {
      path: '/shipments/import-csv',
      name: 'import-csv',
      component: CsvImportView,
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
