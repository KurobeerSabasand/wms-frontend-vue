<template>
  <div>
    <h1>ロット在庫一覧</h1>
    <table>
      <thead>
        <tr>
          <th>商品コード</th>
          <th>在庫数</th>
          <th>引当可能数</th>
          <th>ロット日付</th>
          <th>更新日時</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lot in products" :key="lot.product_code + '-' + lot.stocked_at">
          <td>{{ lot.product_code }}</td>
          <td>{{ lot.stock }}</td>
          <td>{{ lot.allocatable_stock }}</td>
          <td>{{ formatDate(lot.stocked_at) }}</td>
          <td>{{ formatDate(lot.updated_at) }}</td>
          <td>
            <button @click="deleteLot(lot)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProducts, deleteLot as apiDeleteLot } from '../services/api.js'

const products = ref([])

onMounted(async () => {
  products.value = await getProducts()
})

function formatDate(dt) {
  return new Date(dt).toLocaleString()
}

async function deleteLot(lot) {
  const result = await apiDeleteLot(lot.product_code, lot.stocked_at)
  alert(result.message)
  products.value = await getProducts()
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
.lot-table {
  width: 100%;
  border-collapse: collapse;
}
.lot-table th,
.lot-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
