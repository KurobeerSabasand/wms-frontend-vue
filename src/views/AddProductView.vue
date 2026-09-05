<script setup>
import { ref } from 'vue'
import { addProduct } from '../services/api.js'

const name = ref(' ')
const stock = ref(0)
const message = ref(' ')

async function handleSubmit() {
  const result = await addProduct({ name: name.value, stock: stock.value })
  message.value = result?.message || '登録しました'
  name.value = ' '
  stock.value = 0
}
</script>

<template>
  <div>
    <h1>商品追加フォーム</h1>
    <form @submit.prevent="handleSubmit">
      <label>商品名：</label>
      <input v-model="name" type="text" required /><br /><br />

      <label>在庫数：</label>
      <input v-model.number="stock" type="number" min="0" required /><br /><br />

      <button type="submit">追加する</button>
    </form>

    <p>{{ message }}</p>
  </div>
</template>
