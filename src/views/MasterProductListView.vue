<template>
  <div class="container">
    <h1>商品マスタ一覧</h1>
    <table class="master-table">
      <thead>
        <tr>
          <th>商品コード</th>
          <th>商品名</th>
          <th>バーコード</th>
          <th>登録日時</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in masterProducts" :key="p.product_code">
          <td>{{ p.product_code }}</td>
          <td>{{ p.product_name }}</td>
          <td>{{ p.barcode || '-' }}</td>
          <td>{{ formatDate(p.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMasterProducts } from '../services/api.js'

const masterProducts = ref([])

onMounted(async () => {
  masterProducts.value = await getMasterProducts()
})
function formatDate(dt) {
  return new Date(dt.replace(' ', 'T')).toLocaleString()
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
.master-table {
  width: 100%;
  border-collapse: collapse;
}
.master-table th,
.master-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
