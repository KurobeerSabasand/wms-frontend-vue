<template>
  <div class="container">
    <h1>商品マスタ登録</h1>
    <form @submit.prevent="handleSubmit">
      <label>商品コード:</label>
      <input v-model="product_code" required />
      <br /><br />
      <label>商品名:</label>
      <input v-model="product_name" required />
      <br /><br />
      <label>バーコード:</label>
      <input v-model="barcode" />
      <br /><br />
      <button type="submit">登録する</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addMasterProduct } from '../services/api.js'

const product_code = ref('')
const product_name = ref('')
const barcode = ref('')
const message = ref('')

async function handleSubmit() {
  const result = await addMasterProduct({
    product_code: product_code.value,
    product_name: product_name.value,
    barcode: barcode.value,
  })
  message.value = result.message || '登録しました'
  product_code.value = ''
  product_name.value = ''
  barcode.value = ''
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
