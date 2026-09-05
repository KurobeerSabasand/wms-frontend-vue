<template>
  <div class="container">
    <h1>出荷指示詳細（第二画面）</h1>
    <p>shipment_id:{{ shipmentId }}</p>
    <table class="lines-table">
      <thead>
        <tr>
          <th>shipment_line_id</th>
          <th>product_code</th>
          <th>quantity</th>
          <th>quality</th>
          <th>destination_name</th>
          <th>destination_address</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in lines" :key="line.shipment_line_id">
          <td>{{ line.shipment_line_id }}</td>
          <td>{{ line.product_code }}</td>
          <td>{{ line.quantity }}</td>
          <td>{{ line.quality }}</td>
          <td>{{ line.destination_name }}</td>
          <td>{{ line.destination_address }}</td>
          <td>{{ line.status }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="goBack">一覧に戻る</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getShipmentLines } from '../services/api.js'

const lines = ref([])
const shipmentId = ref('')

function goBack() {
  window.location.href = 'shipments-list.html'
}

async function fetchLines() {
  const params = new URLSearchParams(window.location.search)
  shipmentId.value = params.get('shipment_id')

  lines.value = await getShipmentLines(shipmentId.value)
}

onMounted(() => {
  fetchLines()
})
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
