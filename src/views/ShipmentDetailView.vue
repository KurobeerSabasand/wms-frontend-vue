<template>
  <div class="container">
    <h1>出荷指示詳細（第二画面）</h1>

    <p>shipment_id: {{ shipmentId }}</p>
    <p>
      ステータス: <strong>{{ shipmentStatus }}</strong>
    </p>

    <table class="lines-table">
      <thead>
        <tr>
          <th>shipment_line_id</th>
          <th>product_code</th>
          <th>quantity</th>
          <th>allocated_qty</th>
          <th>未引当数量</th>
          <th>destination_name</th>
          <th>destination_address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in lines" :key="line.shipment_line_id">
          <td>{{ line.shipment_line_id }}</td>
          <td>{{ line.product_code }}</td>
          <td>{{ line.quantity }}</td>
          <td>{{ line.allocated_qty }}</td>
          <td>{{ line.quantity - line.allocated_qty }}</td>
          <td>{{ line.destination_name }}</td>
          <td>{{ line.destination_address }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="goBack">一覧に戻る</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getShipmentLines } from '../services/api.js'

const route = useRoute()
const router = useRouter()

// ★ これが shipmentId の正しい取り方（ref は不要）
const shipmentId = route.params.shipment_id
const shipmentStatus = ref('')
const lines = ref([])

onMounted(async () => {
  const res = await getShipmentLines(shipmentId)
  shipmentStatus.value = res.status
  lines.value = res.lines
})

function goBack() {
  router.push('/shipments')
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
.lines-table {
  width: 100%;
  border-collapse: collapse;
}
.lines-table th,
.lines-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
