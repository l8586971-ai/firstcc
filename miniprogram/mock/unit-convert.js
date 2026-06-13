/**
 * 单位换算 Mock 数据
 * 常见食材单位换算规则
 */

const unitConversions = {
  '鸡蛋': {
    units: ['个', '盒', 'g'],
    rules: [
      { from: '盒', to: '个', rate: 10 },     // 1盒 = 10个
      { from: '个', to: 'g', rate: 50 }        // 1个约50g
    ]
  },
  '牛奶': {
    units: ['盒', 'ml'],
    rules: [
      { from: '盒', to: 'ml', rate: 250 }      // 1盒 = 250ml
    ]
  },
  '番茄': {
    units: ['个', 'g'],
    rules: [
      { from: '个', to: 'g', rate: 150 }       // 1个约150g
    ]
  },
  '鸡胸肉': {
    units: ['块', 'g'],
    rules: [
      { from: '块', to: 'g', rate: 200 }       // 1块约200g
    ]
  },
  '大米': {
    units: ['杯', 'g'],
    rules: [
      { from: '杯', to: 'g', rate: 150 }       // 1杯约150g
    ]
  }
}

/**
 * 转换食材单位
 * @param {string} name - 食材名称
 * @param {number} quantity - 数量
 * @param {string} fromUnit - 来源单位
 * @param {string} toUnit - 目标单位
 * @returns {number} 转换后的数量
 */
function convertUnit(name, quantity, fromUnit, toUnit) {
  const item = unitConversions[name]
  if (!item) return quantity

  if (fromUnit === toUnit) return quantity

  // 查找直接转换规则
  const rule = item.rules.find(r => r.from === fromUnit && r.to === toUnit)
  if (rule) return quantity * rule.rate

  // 查找反向转换
  const reverseRule = item.rules.find(r => r.from === toUnit && r.to === fromUnit)
  if (reverseRule) return quantity / reverseRule.rate

  return quantity
}

/**
 * 获取食材支持的单位列表
 */
function getUnitsForFood(name) {
  const item = unitConversions[name]
  if (!item) return []
  return item.units
}

module.exports = {
  unitConversions,
  convertUnit,
  getUnitsForFood
}
