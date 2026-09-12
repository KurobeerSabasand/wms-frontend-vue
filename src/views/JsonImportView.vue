<template>
  <div class="container">
    <h1>JSON 出荷指示取り込み</h1>
    <!--JSON入力欄-->
    <textarea
      v-model="jsonText"
      placeholder="ここにJSONを入力してください"
      rows="10"
      class="json-input"
    ></textarea>
    <!--ボタン-->
    <button @click="handleImportJson">取り込み実行</button>
    <!--結果表示-->
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { importJson } from '../services/api.js'
const jsontext = ref('')
const message = ref('')
async function handleImportJson() {
  try {
    // JSONをパース
    const parsed = JSON.parse(jsonText.value)
    // shipments が存在するかチェック
    if (!parsed.shipments || !Array.isArray(parsed.shipments)) {
      message.value = 'shipments が存在しません'
      return
    }
    // API呼び出し
    const result = await importJson(parsed.shipments)
    message.value = result.message || '取り込み完了'
  } catch (err) {
    console.error(err)
    message.value = 'JSONの形式が正しくありません'
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.json-input {
  width: 100%;
  font-family: monospace;
  margin-bottom: 16px;
}
</style>
