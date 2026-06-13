/**
 * 采购单 Mock 数据
 * 根据低库存和常备食材缺货生成采购建议
 */

const { getInventory, getLowStockFoods, getExpiringFoods } = require('./inventory')

/**
 * 生成采购单
 * 规则：
 * 1. 库存低于预警阈值 → 建议购买到 (预警阈值 + 2)
 * 2. 常备食材库存为 0 → 建议购买到预警阈值
 * 3. 按优先级排序：库存为0 > 低库存 > 常备缺货
 */
function generateShoppingList() {
  const inventory = getInventory()
  const shoppingItems = []
  const today = new Date()

  // 1. 低库存食材
  const lowStock = getLowStockFoods()
  lowStock.forEach(food => {
    if (food.quantity <= 0) {
      // 库存为0
      shoppingItems.push({
        id: 'shop_' + food.id,
        foodId: food.id,
        name: food.name,
        category: food.category,
        currentStock: food.quantity,
        unit: food.unit,
        warningThreshold: food.warningThreshold,
        suggestAmount: food.warningThreshold + 1,
        reason: '库存已用完',
        priority: 10,
        purchased: false,
        actualAmount: 0
      })
    } else {
      // 低于预警阈值
      shoppingItems.push({
        id: 'shop_' + food.id,
        foodId: food.id,
        name: food.name,
        category: food.category,
        currentStock: food.quantity,
        unit: food.unit,
        warningThreshold: food.warningThreshold,
        suggestAmount: food.warningThreshold - food.quantity + 2,
        reason: `库存(${food.quantity})低于预警(${food.warningThreshold})`,
        priority: 5,
        purchased: false,
        actualAmount: 0
      })
    }
  })

  // 2. 常备食材不在低库存中但库存为0的
  const commonFoods = inventory.filter(f => f.isCommon && f.quantity === 0)
  const existingIds = new Set(shoppingItems.map(s => s.foodId))
  commonFoods.forEach(food => {
    if (!existingIds.has(food.id)) {
      shoppingItems.push({
        id: 'shop_' + food.id,
        foodId: food.id,
        name: food.name,
        category: food.category,
        currentStock: 0,
        unit: food.unit,
        warningThreshold: food.warningThreshold,
        suggestAmount: food.warningThreshold + 1,
        reason: '常备食材缺货',
        priority: 3,
        purchased: false,
        actualAmount: 0
      })
    }
  })

  // 按优先级排序
  shoppingItems.sort((a, b) => b.priority - a.priority)

  return shoppingItems
}

// 采购单完成记录
const mockShoppingHistory = []

function recordPurchase(items) {
  mockShoppingHistory.push({
    id: 'purch_' + String(mockShoppingHistory.length + 1).padStart(3, '0'),
    date: new Date().toISOString().split('T')[0],
    items
  })
}

module.exports = {
  generateShoppingList,
  recordPurchase,
  mockShoppingHistory
}
