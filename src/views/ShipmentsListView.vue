<template>
  <div class="container">
    <h1>出荷指示一覧（第一画面）</h1>
    <!--操作ボタン-->
    <div class="actions">
      <button @click="handleComplete">選択した出荷指示を完了</button>
      <button @click="handleDelete">選択した出荷指示を削除</button>
    </div>
    <!--一覧テーブル-->
    <table class="shipments-table">
      <thead>
        <tr>
          <th>選択</th>
          <th>shipment_id</th>
          <th>status</th>
          <th>total_lines</th>
          <th>total_quantity</th>
          <th>updated_at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in shipments" :key="s.shipment_id">
          <td>
            <input type="checkbox" v-model="selectedIds" :value="s.shipment_id" />
          </td>
          <td @click="goDetail(s.shipment_id)" class="clickable">
            {{ s.shipment_id }}
          </td>
          <td>{{ s.status }}</td>
          <td>{{ s.total_lines }}</td>
          <td>{{ s.total_quantity }}</td>
          <td>{{ s.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getShipmentsList, completeShipments, deleteShipments } from '../services/api.js'

const shipments = ref([])
const selectedIds = ref([])

async function fetchShipments() {
  shipments.value = await getShipmentsList()
}

function goDetail(shipmentId) {
  window.location.href = `shipment-detail.html?shipment_id=${shipmentId}`
}

async function handleComplete() {
  if (selectedIds.value.length === 0) {
    alert('出荷指示を選択してください')
    return
  }
  const result = await completeShipments(selectedIds.value)
  alert(result.message)
  fetchShipments()
}

async function handleDelete() {
  if (selectedIds.value.length === 0) {
    alert('出荷指示を選択してください')
    return
  }
  const result = await deleteShipments(selectedIds.value)
  alert(result.message)
  fetchShipments()
}

onMounted(() => {
  fetchShipments()
})
</script>

<style scoped>
.clickable {
  cursor: pointer;
  color: blue;
}
.clickable.hover {
  text-decoration: underline;
}
</style>
