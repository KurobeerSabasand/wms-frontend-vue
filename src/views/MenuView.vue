<template>
  <div>
    <h1>メインメニュー</h1>
    <button @click="$router.push('/products')">商品一覧を見る</button>
    <button @click="$router.push('/add')">商品を追加する</button>
    <button @click="$router.push('/shipments')">出荷指示一覧</button>
    <button @click="$router.push('/shipments/import-json')">JSON取り込み</button>
    <button @click="$router.push('/shipments/import-csv')">CSV取り込み</button>
  </div>
</template>
