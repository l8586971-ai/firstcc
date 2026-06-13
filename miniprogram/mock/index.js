/**
 * Mock 数据统一入口
 * 注意：微信小程序不支持文件读写持久化，数据存储使用内存变量
 * 刷新/重启小程序后数据恢复为初始 mock 数据
 */

const inventory = require('./inventory')
const recipes = require('./recipes')
const videos = require('./videos')
const history = require('./history')
const shopping = require('./shopping')
const unitConvert = require('./unit-convert')

// 数据缓存（计算属性）
let cachedShoppingList = null
let cachedStats = null

/**
 * 初始化所有 mock 数据
 */
function initMockData() {
  console.log('[Mock] 数据初始化完成')
  cachedShoppingList = null
  cachedStats = null
}

/**
 * 刷新缓存
 */
function refreshCache() {
  cachedShoppingList = null
  cachedStats = null
}

/**
 * 获取采购单（带缓存）
 */
function getShoppingList() {
  if (!cachedShoppingList) {
    cachedShoppingList = shopping.generateShoppingList()
  }
  return cachedShoppingList
}

/**
 * 获取食谱统计（带缓存）
 */
function getStats() {
  if (!cachedStats) {
    cachedStats = history.getRecipeStats()
  }
  return cachedStats
}

module.exports = {
  initMockData,
  refreshCache,

  // 库存
  ...inventory,

  // 食谱
  ...recipes,

  // 视频
  ...videos,

  // 制作记录
  ...history,

  // 采购单
  ...shopping,
  getShoppingList,

  // 单位换算
  ...unitConvert,

  // 统计
  getStats
}
