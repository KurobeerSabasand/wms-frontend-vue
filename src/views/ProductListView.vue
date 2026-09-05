<template>
  <div>
    <h1>商品一覧</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>在庫数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button @click="increase(p)">+</button>
            <button @click="decrease(p)">-</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProducts, updateStock } from '../services/api.js'

const products = ref([])

onMounted(async () => {
  products.value = await getProducts()
})

async function increase(p) {
  const result = await updateStock(p.id, +1)
  p.stock = result.product.stock
}

async function decrease(p) {
  const result = await updateStock(p.id, -1)
  p.stock = result.product.stock
}
</script>
