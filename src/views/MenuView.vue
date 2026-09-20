<template>
  <div class="menu-container">
    <h1>メインメニュー</h1>
    <!--商品マスタ管理-->
    <section>
      <h2>商品マスタ管理</h2>
      <button @click="$router.push('/master-products')">商品マスタ登録</button>
      <button @click="$router.push('/master-products/list')">商品マスタ一覧</button>
    </section>
    <!--在庫（ロット）管理-->
    <section>
      <h2>在庫管理（ロット）</h2>
      <button @click="$router.push('/products')">ロット在庫一覧</button>
      <button @click="$router.push('/add')">ロット入荷</button>
    </section>
    <!--出荷管理-->
    <section>
      <h2>出荷管理</h2>
      <button @click="$router.push('/shipments')">出荷指示一覧</button>
      <button @click="$router.push('/shipments/import-csv')">CSV取り込み</button>
    </section>
  </div>
</template>

<style scoped>
.menu-container {
  max-width: 600px;
  margin: 0 auto;
}
section {
  display: block;
  margin: 8px 0;
}
</style>
