const API_BASE = 'https://wms-backend-oqcs.onrender.com'

//ログイン処理
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!data.ok) {
    alert('ログインに失敗しました')
    return false
  }
  //トークンを保存
  localStorage.setItem('token', data.token)
  return true
}

//認証付きfetchの共通関数
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('ログインしてください')
    window.location.href = 'login.html'
    return
  }
  //Authorization ヘッダーを追加
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  }
  const res = await fetch(url, options)
  //トークンが無効な場合
  if (res.status === 401 || res.status === 403) {
    alert('認証が切れました。再ログインしてください。')
    localStorage.removeItem('token')
    window.location.href = 'login.html'
    return
  }
  return res
}

export async function getProducts() {
  const res = await authFetch(`${API_BASE}/api/products`)
  const data = await res.json()
  return data
}

export async function addProduct(product) {
  const res = await authFetch(`${API_BASE}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  return await res.json()
}

export async function getProductById(id) {
  const res = await authFetch(`${API_BASE}/api/products/${id}`)
  return await res.json()
}

export async function updateStock(id, amount) {
  const res = await authFetch(`${API_BASE}/api/products/${id}/stock`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  })
  return await res.json()
}

// JSON を送る処理（fetch）
export async function importJson(shipments) {
  const res = await authFetch(`${API_BASE}/api/shipments/import-json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shipments }),
  })
  return await res.json()
}

// CSV を送る処理（FormData）
export async function importCsv(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await authFetch(`${API_BASE}/api/shipments/import-csv`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}

// 出荷指示一覧取得（第一画面）
export async function getShipmentsList({ shipment_id = '', status = '' } = {}) {
  let url = `${API_BASE}/api/shipments`
  const params = []
  if (shipment_id) params.push(`shipment_id=${shipment_id}`)
  if (status) params.push(`status=${status}`)
  if (params.length > 0) {
    url += '?' + params.join('$')
  }
  const res = await authFetch(url)
  return await res.json()
}

// 出荷指示詳細取得（第二画面）
export async function getShipmentLines(shipment_id) {
  const res = await authFetch(`${API_BASE}/api/shipments/${shipment_id}/lines`)
  return await res.json()
}

// 複数完了 API
export async function completeShipments(shipmentIds) {
  const res = await authFetch(`${API_BASE}/api/shipments/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shipment_ids: shipmentIds }),
  })
  return await res.json()
}

// 複数削除 API
export async function deleteShipments(shipmentIds) {
  const res = await authFetch(`${API_BASE}/api/shipments/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shipment_ids: shipmentIds }),
  })
  return await res.json()
}
