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
          <th>引当</th>
          <th>作業中</th>
          <th>ピックリスト</th>
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
          <td>
            <button v-if="s.status === 'unallocated'" @click="handleAllocate(s.shipment_id)">
              引当する
            </button>
          </td>
          <td>
            <button v-if="s.status === 'allocated'" @click="handleStartWork(s.shipment_id)">
              作業中にする
            </button>
          </td>
          <td>
            <button v-if="s.status === 'working'" @click="goPickList(s.shipment_id)">
              ピックリストを見る
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getShipmentsList,
  completeShipments,
  deleteShipments,
  startWork,
  allocateShipment,
} from '../services/api.js'
import { useRouter } from 'vue-router'

const shipments = ref([])
const selectedIds = ref([])
const router = useRouter()

async function fetchShipments() {
  shipments.value = await getShipmentsList()
}

function goDetail(shipmentId) {
  // Vue Router 経由で遷移
  // window.location.hash = `#/shipments/${shipmentId}`
  router.push(`/shipments/${shipmentId}`)
}

function goPickList(shipmentId) {
  router.push(`/shipments/${shipmentId}/picklist`)
}

async function handleAllocate(shipmentId) {
  const result = await allocateShipment(shipmentId)
  alert(result.message)
  fetchShipments()
}

async function handleStartWork(shipmentId) {
  const result = await startWork(shipmentId)
  alert(result.message)
  fetchShipments()
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
