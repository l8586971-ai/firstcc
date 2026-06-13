/**
 * 食材库存 Mock 数据
 * 字段：
 * - id: 唯一标识
 * - name: 食材名称
 * - category: 分类 (蔬菜/水果/肉类/蛋奶/调料/主食/其他)
 * - quantity: 数量
 * - unit: 单位 (个/g/ml/盒/袋/瓶/把/颗)
 * - storageLocation: 存放位置 (冷藏/冷冻/常温/调料架)
 * - purchaseDate: 购买日期 'YYYY-MM-DD'
 * - expiryDate: 到期日期 'YYYY-MM-DD'
 * - warningThreshold: 预警阈值
 * - thresholdUnit: 阈值单位
 * - isCommon: 是否常备食材
 * - note: 备注
 */

const today = new Date()
const fmt = d => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }

const mockInventory = [
  {
    id: 'inv_001',
    name: '番茄',
    category: '蔬菜',
    quantity: 3,
    unit: '个',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -3)),
    expiryDate: fmt(addDays(today, 2)),
    warningThreshold: 2,
    thresholdUnit: '个',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_002',
    name: '鸡蛋',
    category: '蛋奶',
    quantity: 8,
    unit: '个',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -5)),
    expiryDate: fmt(addDays(today, 10)),
    warningThreshold: 4,
    thresholdUnit: '个',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_003',
    name: '鸡胸肉',
    category: '肉类',
    quantity: 2,
    unit: '块',
    storageLocation: '冷冻',
    purchaseDate: fmt(addDays(today, -2)),
    expiryDate: fmt(addDays(today, 30)),
    warningThreshold: 1,
    thresholdUnit: '块',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_004',
    name: '牛奶',
    category: '蛋奶',
    quantity: 1,
    unit: '盒',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -1)),
    expiryDate: fmt(addDays(today, 5)),
    warningThreshold: 1,
    thresholdUnit: '盒',
    isCommon: false,
    note: ''
  },
  {
    id: 'inv_005',
    name: '大米',
    category: '主食',
    quantity: 5,
    unit: '杯',
    storageLocation: '常温',
    purchaseDate: fmt(addDays(today, -30)),
    expiryDate: fmt(addDays(today, 180)),
    warningThreshold: 2,
    thresholdUnit: '杯',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_006',
    name: '青椒',
    category: '蔬菜',
    quantity: 2,
    unit: '个',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -4)),
    expiryDate: fmt(addDays(today, 1)),
    warningThreshold: 2,
    thresholdUnit: '个',
    isCommon: false,
    note: ''
  },
  {
    id: 'inv_007',
    name: '生抽',
    category: '调料',
    quantity: 1,
    unit: '瓶',
    storageLocation: '调料架',
    purchaseDate: fmt(addDays(today, -60)),
    expiryDate: fmt(addDays(today, 300)),
    warningThreshold: 1,
    thresholdUnit: '瓶',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_008',
    name: '盐',
    category: '调料',
    quantity: 1,
    unit: '袋',
    storageLocation: '调料架',
    purchaseDate: fmt(addDays(today, -90)),
    expiryDate: fmt(addDays(today, 500)),
    warningThreshold: 1,
    thresholdUnit: '袋',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_009',
    name: '蒜',
    category: '蔬菜',
    quantity: 5,
    unit: '瓣',
    storageLocation: '常温',
    purchaseDate: fmt(addDays(today, -7)),
    expiryDate: fmt(addDays(today, 14)),
    warningThreshold: 3,
    thresholdUnit: '瓣',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_010',
    name: '橄榄油',
    category: '调料',
    quantity: 1,
    unit: '瓶',
    storageLocation: '调料架',
    purchaseDate: fmt(addDays(today, -45)),
    expiryDate: fmt(addDays(today, 300)),
    warningThreshold: 1,
    thresholdUnit: '瓶',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_011',
    name: '西兰花',
    category: '蔬菜',
    quantity: 1,
    unit: '颗',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -2)),
    expiryDate: fmt(addDays(today, 3)),
    warningThreshold: 1,
    thresholdUnit: '颗',
    isCommon: false,
    note: ''
  },
  {
    id: 'inv_012',
    name: '豆腐',
    category: '其他',
    quantity: 1,
    unit: '块',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -1)),
    expiryDate: fmt(addDays(today, 2)),
    warningThreshold: 1,
    thresholdUnit: '块',
    isCommon: false,
    note: ''
  },
  {
    id: 'inv_013',
    name: '姜',
    category: '蔬菜',
    quantity: 2,
    unit: '块',
    storageLocation: '常温',
    purchaseDate: fmt(addDays(today, -10)),
    expiryDate: fmt(addDays(today, 20)),
    warningThreshold: 1,
    thresholdUnit: '块',
    isCommon: true,
    note: ''
  },
  {
    id: 'inv_014',
    name: '胡萝卜',
    category: '蔬菜',
    quantity: 2,
    unit: '根',
    storageLocation: '冷藏',
    purchaseDate: fmt(addDays(today, -5)),
    expiryDate: fmt(addDays(today, 5)),
    warningThreshold: 1,
    thresholdUnit: '根',
    isCommon: false,
    note: ''
  },
  {
    id: 'inv_015',
    name: '洋葱',
    category: '蔬菜',
    quantity: 1,
    unit: '个',
    storageLocation: '常温',
    purchaseDate: fmt(addDays(today, -8)),
    expiryDate: fmt(addDays(today, 10)),
    warningThreshold: 1,
    thresholdUnit: '个',
    isCommon: true,
    note: ''
  }
]

// 分类列表
const categories = [
  { key: 'all', name: '全部' },
  { key: '蔬菜', name: '蔬菜' },
  { key: '水果', name: '水果' },
  { key: '肉类', name: '肉类' },
  { key: '蛋奶', name: '蛋奶' },
  { key: '调料', name: '调料' },
  { key: '主食', name: '主食' },
  { key: '其他', name: '其他' }
]

// 存放位置选项
const storageLocations = ['冷藏', '冷冻', '常温', '调料架']

// 单位选项
const units = ['个', 'g', 'ml', '盒', '袋', '瓶', '把', '颗', '块', '根', '瓣', '杯', '勺']

// 获取库存数据
function getInventory() {
  return mockInventory
}

// 根据ID获取食材
function getFoodById(id) {
  return mockInventory.find(item => item.id === id) || null
}

// 添加食材
function addFood(food) {
  const newFood = {
    ...food,
    id: 'inv_' + String(mockInventory.length + 1).padStart(3, '0')
  }
  mockInventory.push(newFood)
  return newFood
}

// 更新食材
function updateFood(id, updates) {
  const index = mockInventory.findIndex(item => item.id === id)
  if (index !== -1) {
    mockInventory[index] = { ...mockInventory[index], ...updates }
    return mockInventory[index]
  }
  return null
}

// 删除食材
function deleteFood(id) {
  const index = mockInventory.findIndex(item => item.id === id)
  if (index !== -1) {
    mockInventory.splice(index, 1)
    return true
  }
  return false
}

// 获取临期食材（距离到期 <= 3天）
function getExpiringFoods() {
  const now = new Date()
  return mockInventory.filter(item => {
    const exp = new Date(item.expiryDate)
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24))
    return diff >= 0 && diff <= 3
  })
}

// 获取低库存食材（低于预警阈值）
function getLowStockFoods() {
  return mockInventory.filter(item => item.quantity < item.warningThreshold)
}

// 扣减库存
function deductInventory(consumptions) {
  // consumptions: [{id, amount}]  amount 是要扣减的量
  consumptions.forEach(({ id, amount }) => {
    const food = mockInventory.find(f => f.id === id)
    if (food) {
      food.quantity = Math.max(0, food.quantity - amount)
    }
  })
}

// 增加库存
function addInventory(id, amount) {
  const food = mockInventory.find(f => f.id === id)
  if (food) {
    food.quantity += amount
  }
}

module.exports = {
  mockInventory,
  categories,
  storageLocations,
  units,
  getInventory,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
  getExpiringFoods,
  getLowStockFoods,
  deductInventory,
  addInventory
}
