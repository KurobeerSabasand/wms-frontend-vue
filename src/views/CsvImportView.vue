<template>
  <div class="container">
    <h1>CSV 出荷指示取り込み</h1>
    <!--CSVファイル選択-->
    <input type="file" @change="handleFileChange" accept=".csv" />
    <!--ボタン-->
    <button :disabled="!selectedFile" @click="handleImportCsv">CSV取り込み実行</button>
    <!--結果表示-->
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { importCsv } from '../services/api.js'

const selectedFile = ref(null)
const message = ref('')

function handleFileChange(event) {
  selectedFile.value = event.target.files[0]
}

async function handleImportCsv() {
  if (!selectedFile.value) {
    message.value = 'CSVファイルを選択してください'
    return
  }
  try {
    const result = await importCsv(selectedFile.value)
    message.value = result.message || 'CSV取り込みが完了しました'
  } catch (err) {
    console.error(err)
    message.value = 'CSV取り込みに失敗しました'
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
button {
  margin-top: 16px;
}
</style>
