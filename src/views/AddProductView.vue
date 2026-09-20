<script setup>
import { ref, onMounted } from 'vue'
import { addLot, getMasterProducts } from '../services/api.js'

const productCode = ref('')
const stock = ref(0)
const stockedAt = ref('')
const message = ref('')

const masterProducts = ref([])

onMounted(async () => {
  masterProducts.value = await getMasterProducts()
})

async function handleSubmit() {
  const result = await addLot(productCode.value, stock.value, stockedAt.value)
  message.value = result.message || 'ロットを追加しました'
  productCode.value = ''
  stock.value = 0
  stockedAt.value = ''
}
</script>

<template>
  <div>
    <h1>入荷ロット追加</h1>
    <form @submit.prevent="handleSubmit">
      <label>商品コード：</label>
      <select v-model="productCode" required>
        <option value="">選択してください</option>
        <option v-for="p in masterProducts" :key="p.product_code" :value="p.product_code">
          {{ p.product_code }}({{ p.product_name }})
        </option>
      </select>
      <br /><br />
      <label>入荷数：</label>
      <input v-model.number="stock" type="number" min="1" required /><br /><br />
      <label>入荷日（任意）：</label>
      <input v-model="stockedAt" type="datetime-local" />
      <br /><br />
      <button type="submit">追加する</button>
    </form>

    <p>{{ message }}</p>
  </div>
</template>
