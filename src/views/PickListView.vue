<template>
  <div class="container">
    <h1>ピックリスト</h1>
    <p>shipment_id: {{ shipmentId }}</p>
    <table class="picklist-table">
      <thead>
        <tr>
          <th>shipment_line_id</th>
          <th>product_code</th>
          <th>ロット日付（stocked_at）</th>
          <th>割当数量（allocated_qty）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in picklist" :key="row.shipment_line_id + '-' + row.stocked_at">
          <td>{{ row.shipment_line_id }}</td>
          <td>{{ row.product_code }}</td>
          <td>{{ formatDate(row.stocked_at) }}</td>
          <td>{{ row.allocated_qty }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="goBack">戻る</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPickList } from '../services/api.js'

const route = useRoute()
const router = useRouter()
const shipmentId = route.params.shipment_line_id
const picklist = ref([])

onMounted(async () => {
  picklist.value = await getPickList(shipmentId)
})

function foBack() {
  router.push('/shipments')
}

function formatDate(dt) {
  return new Date(dt).toLocaleString()
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
.picklist-table {
  width: 100%;
  border-collapse: collapse;
}
.picklist-table th,
.picklist-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
