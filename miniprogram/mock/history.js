/**
 * 制作记录 Mock 数据
 */

const mockHistory = [
  {
    id: 'hist_001',
    recipeId: 'rec_001',
    recipeName: '番茄炒蛋',
    cookDate: '2026-05-20',
    rating: 4,
    actualTime: 18,
    tasteTags: ['刚刚好'],
    textureTags: ['不够入味'],
    portionTags: ['刚好'],
    difficultyTags: ['简单'],
    note: '味道不错，下次番茄可以多放一个',
    nextReminder: '多加一个番茄，汁更多',
    consumptions: [
      { foodId: 'inv_001', foodName: '番茄', planned: 2, actual: 2, unit: '个' },
      { foodId: 'inv_002', foodName: '鸡蛋', planned: 3, actual: 3, unit: '个' }
    ]
  },
  {
    id: 'hist_002',
    recipeId: 'rec_002',
    recipeName: '鸡胸肉炒西兰花',
    cookDate: '2026-05-19',
    rating: 3,
    actualTime: 25,
    tasteTags: ['偏咸'],
    textureTags: ['太干'],
    portionTags: ['太少', '下次多做一点'],
    difficultyTags: ['适中'],
    note: '鸡胸肉煎太久有点柴，生抽放多了偏咸',
    nextReminder: '少放生抽，鸡胸肉煎4分钟即可',
    consumptions: [
      { foodId: 'inv_003', foodName: '鸡胸肉', planned: 1, actual: 1, unit: '块' },
      { foodId: 'inv_011', foodName: '西兰花', planned: 1, actual: 1, unit: '颗' }
    ]
  },
  {
    id: 'hist_003',
    recipeId: 'rec_001',
    recipeName: '番茄炒蛋',
    cookDate: '2026-05-14',
    rating: 5,
    actualTime: 15,
    tasteTags: ['刚刚好'],
    textureTags: ['刚刚好'],
    portionTags: ['刚好'],
    difficultyTags: ['简单'],
    note: '完美！',
    nextReminder: '',
    consumptions: [
      { foodId: 'inv_001', foodName: '番茄', planned: 2, actual: 2, unit: '个' },
      { foodId: 'inv_002', foodName: '鸡蛋', planned: 3, actual: 3, unit: '个' }
    ]
  }
]

// 味道标签选项
const tasteTagOptions = ['刚刚好', '偏咸', '偏淡', '偏甜', '偏酸', '太辣', '不够辣']

// 口感标签选项
const textureTagOptions = ['太干', '太湿', '太硬', '太软', '不够入味']

// 分量标签选项
const portionTagOptions = ['刚好', '太多', '太少', '下次多做一点', '下次少做一点']

// 难度标签选项
const difficultyTagOptions = ['简单', '适中', '有点麻烦', '步骤太多', '容易失败']

function getHistoryByRecipeId(recipeId) {
  return mockHistory.filter(h => h.recipeId === recipeId)
}

function getLatestHistoryByRecipeId(recipeId) {
  const records = mockHistory.filter(h => h.recipeId === recipeId)
  return records.length > 0 ? records[records.length - 1] : null
}

function addHistory(record) {
  const newRecord = {
    ...record,
    id: 'hist_' + String(mockHistory.length + 1).padStart(3, '0')
  }
  mockHistory.push(newRecord)
  return newRecord
}

function getAllHistory() {
  return [...mockHistory].sort((a, b) => new Date(b.cookDate) - new Date(a.cookDate))
}

// 统计信息
function getRecipeStats() {
  const stats = {}

  mockHistory.forEach(h => {
    if (!stats[h.recipeId]) {
      stats[h.recipeId] = {
        recipeId: h.recipeId,
        recipeName: h.recipeName,
        cookCount: 0,
        totalRating: 0,
        ratingCount: 0
      }
    }
    stats[h.recipeId].cookCount++
    if (h.rating) {
      stats[h.recipeId].totalRating += h.rating
      stats[h.recipeId].ratingCount++
    }
  })

  // 计算平均评分
  Object.values(stats).forEach(s => {
    s.avgRating = s.ratingCount > 0
      ? Math.round((s.totalRating / s.ratingCount) * 10) / 10
      : 0
  })

  return stats
}

module.exports = {
  mockHistory,
  tasteTagOptions,
  textureTagOptions,
  portionTagOptions,
  difficultyTagOptions,
  getHistoryByRecipeId,
  getLatestHistoryByRecipeId,
  addHistory,
  getAllHistory,
  getRecipeStats
}
