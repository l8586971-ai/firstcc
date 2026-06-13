/**
 * 食谱 Mock 数据 & 模拟生成逻辑
 *
 * 模拟 AI 根据库存生成食谱的逻辑：
 * 遍历候选食谱，计算库存匹配度，返回匹配度最高的 3-4 个
 */

const mockRecipes = [
  {
    id: 'rec_001',
    name: '番茄炒蛋',
    category: '家常菜',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 15,
    servings: 1,
    ingredients: [
      { name: '番茄', amount: 2, unit: '个' },
      { name: '鸡蛋', amount: 3, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' },
      { name: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '番茄洗净切块，鸡蛋打散加少许盐搅匀',
      '热锅倒油，先炒鸡蛋，炒至凝固盛出',
      '锅中再倒少许油，爆香蒜末',
      '倒入番茄块翻炒，炒至出汁变软',
      '倒入炒好的鸡蛋，翻炒均匀',
      '加盐调味，出锅装盘'
    ],
    tips: '番茄炒久一点更出汁，鸡蛋不要炒太老',
    substitues: {
      '番茄': '可用番茄罐头替代',
      '鸡蛋': '可用鸭蛋替代'
    }
  },
  {
    id: 'rec_002',
    name: '鸡胸肉炒西兰花',
    category: '减脂餐',
    difficulty: 2,
    difficultyLabel: '简单',
    cookTime: 20,
    servings: 1,
    ingredients: [
      { name: '鸡胸肉', amount: 1, unit: '块' },
      { name: '西兰花', amount: 1, unit: '颗' },
      { name: '蒜', amount: 3, unit: '瓣' },
      { name: '生抽', amount: 1, unit: '勺' },
      { name: '橄榄油', amount: 1, unit: '勺' }
    ],
    steps: [
      '鸡胸肉切小块，加生抽腌制10分钟',
      '西兰花掰小朵，焯水1分钟捞出',
      '热锅倒橄榄油，爆香蒜末',
      '倒入鸡胸肉翻炒至变色',
      '加入西兰花翻炒均匀',
      '加少许盐和生抽调味出锅'
    ],
    tips: '鸡胸肉腌制后更嫩，西兰花焯水保持翠绿',
    substitues: {
      '鸡胸肉': '可用鸡腿肉替代',
      '西兰花': '可用花菜替代'
    }
  },
  {
    id: 'rec_003',
    name: '番茄鸡蛋饭',
    category: '快手菜',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 25,
    servings: 1,
    ingredients: [
      { name: '番茄', amount: 1, unit: '个' },
      { name: '鸡蛋', amount: 2, unit: '个' },
      { name: '大米', amount: 1, unit: '杯' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '大米淘洗干净，放入电饭煲',
      '番茄顶部划十字，放入米中',
      '加入正常煮饭的水量，按下煮饭键',
      '饭煮好后打入鸡蛋，焖5分钟',
      '拌匀后加盐调味即可'
    ],
    tips: '番茄要选熟透的，焖鸡蛋时不要开盖',
    substitues: {
      '番茄': '可用番茄酱替代'
    }
  },
  {
    id: 'rec_004',
    name: '鸡蛋豆腐汤',
    category: '汤粥',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 15,
    servings: 1,
    ingredients: [
      { name: '豆腐', amount: 1, unit: '块' },
      { name: '鸡蛋', amount: 2, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' },
      { name: '姜', amount: 1, unit: '块' }
    ],
    steps: [
      '豆腐切成小块，鸡蛋打散',
      '锅中加水烧开，放入姜片',
      '放入豆腐块煮3分钟',
      '淋入蛋液，轻轻搅动',
      '加盐调味，撒葱花出锅'
    ],
    tips: '淋蛋液时要慢慢倒入，用筷子轻轻搅动形成蛋花',
    substitues: {
      '豆腐': '可用内酯豆腐替代'
    }
  },
  {
    id: 'rec_005',
    name: '青椒肉丝',
    category: '家常菜',
    difficulty: 2,
    difficultyLabel: '中等',
    cookTime: 20,
    servings: 1,
    ingredients: [
      { name: '青椒', amount: 2, unit: '个' },
      { name: '鸡胸肉', amount: 1, unit: '块' },
      { name: '生抽', amount: 2, unit: '勺' },
      { name: '姜', amount: 1, unit: '块' },
      { name: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '鸡胸肉切丝，加生抽腌制10分钟',
      '青椒去籽切丝，姜切丝，蒜切末',
      '热锅倒油，先炒肉丝至变色盛出',
      '锅中爆香姜蒜，倒入青椒丝翻炒',
      '青椒断生后倒回肉丝，翻炒均匀',
      '加生抽和盐调味出锅'
    ],
    tips: '肉丝顺着纹理切更嫩，青椒不要炒太久保持脆爽',
    substitues: {
      '鸡胸肉': '可用猪肉里脊替代',
      '青椒': '可用彩椒替代'
    }
  },
  {
    id: 'rec_006',
    name: '牛奶滑蛋',
    category: '快手菜',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 5,
    servings: 1,
    ingredients: [
      { name: '鸡蛋', amount: 3, unit: '个' },
      { name: '牛奶', amount: 1, unit: '盒' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '鸡蛋打散，加入牛奶和盐搅匀',
      '平底锅小火加热，倒入少许油',
      '倒入蛋液，用铲子轻轻推动',
      '蛋液半凝固时关火，用余温烘熟',
      '出锅装盘，可撒黑胡椒'
    ],
    tips: '全程小火，蛋液不要过度搅拌，保持嫩滑口感',
    substitues: {
      '牛奶': '可用清水替代但口感会差一些'
    }
  },
  {
    id: 'rec_007',
    name: '胡萝卜炒鸡蛋',
    category: '家常菜',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 12,
    servings: 1,
    ingredients: [
      { name: '胡萝卜', amount: 1, unit: '根' },
      { name: '鸡蛋', amount: 2, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' },
      { name: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '胡萝卜去皮切薄片，鸡蛋打散',
      '热锅倒油，先炒鸡蛋盛出',
      '锅中爆香蒜末，放入胡萝卜片翻炒',
      '胡萝卜变软后倒回鸡蛋',
      '翻炒均匀加盐调味出锅'
    ],
    tips: '胡萝卜切薄片容易熟，也可以先焯水再炒',
    substitues: {
      '胡萝卜': '可用白萝卜替代'
    }
  },
  {
    id: 'rec_008',
    name: '蒜蓉西兰花',
    category: '减脂餐',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 10,
    servings: 1,
    ingredients: [
      { name: '西兰花', amount: 1, unit: '颗' },
      { name: '蒜', amount: 4, unit: '瓣' },
      { name: '橄榄油', amount: 1, unit: '勺' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '西兰花掰小朵，焯水1分钟捞出',
      '蒜切末',
      '热锅倒橄榄油，小火炒香蒜末',
      '倒入西兰花翻炒均匀',
      '加盐调味出锅'
    ],
    tips: '蒜末炒至金黄更香，西兰花焯水时加少许盐保持翠绿',
    substitues: {
      '西兰花': '可用花菜替代',
      '橄榄油': '可用其他食用油替代'
    }
  },
  {
    id: 'rec_009',
    name: '洋葱炒鸡蛋',
    category: '家常菜',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 10,
    servings: 1,
    ingredients: [
      { name: '洋葱', amount: 1, unit: '个' },
      { name: '鸡蛋', amount: 3, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '洋葱切丝，鸡蛋打散加盐',
      '热锅倒油，先炒鸡蛋盛出',
      '锅中炒洋葱至变软透明',
      '倒回鸡蛋翻炒均匀出锅'
    ],
    tips: '洋葱炒到微微焦黄更香更甜',
    substitues: {}
  },
  {
    id: 'rec_010',
    name: '凉拌番茄',
    category: '不开火',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 5,
    servings: 1,
    ingredients: [
      { name: '番茄', amount: 2, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '番茄洗净切片',
      '摆盘撒少许盐',
      '腌制2分钟即可食用'
    ],
    tips: '冷藏后口感更好，也可加少许糖',
    substitues: {}
  },
  {
    id: 'rec_011',
    name: '无油鸡胸肉',
    category: '高蛋白',
    difficulty: 2,
    difficultyLabel: '中等',
    cookTime: 20,
    servings: 1,
    ingredients: [
      { name: '鸡胸肉', amount: 1, unit: '块' },
      { name: '生抽', amount: 2, unit: '勺' },
      { name: '姜', amount: 1, unit: '块' },
      { name: '蒜', amount: 3, unit: '瓣' }
    ],
    steps: [
      '鸡胸肉从中间片开，用刀背拍松',
      '姜蒜切末，加生抽调成腌料',
      '鸡胸肉腌制15分钟',
      '平底锅小火，放入鸡胸肉',
      '两面各煎4-5分钟至金黄',
      '切片装盘'
    ],
    tips: '不粘锅可以不加油，小火慢煎更嫩',
    substitues: {
      '鸡胸肉': '可用鸡腿肉替代'
    }
  },
  {
    id: 'rec_012',
    name: '番茄豆腐汤',
    category: '汤粥',
    difficulty: 1,
    difficultyLabel: '简单',
    cookTime: 12,
    servings: 1,
    ingredients: [
      { name: '番茄', amount: 1, unit: '个' },
      { name: '豆腐', amount: 1, unit: '块' },
      { name: '鸡蛋', amount: 1, unit: '个' },
      { name: '盐', amount: 1, unit: '勺' }
    ],
    steps: [
      '番茄切块，豆腐切小块，鸡蛋打散',
      '锅中倒少许油，炒番茄至出汁',
      '加水烧开，放入豆腐煮3分钟',
      '淋入蛋液，加盐调味',
      '撒葱花出锅'
    ],
    tips: '番茄先炒出汁汤底更浓郁',
    substitues: {}
  }
]

// 食谱分类
const recipeCategories = [
  { key: 'all', name: '全部' },
  { key: '家常菜', name: '家常菜' },
  { key: '减脂餐', name: '减脂餐' },
  { key: '快手菜', name: '快手菜' },
  { key: '汤粥', name: '汤粥' },
  { key: '清冰箱', name: '清冰箱' },
  { key: '高蛋白', name: '高蛋白' },
  { key: '不开火', name: '不开火' }
]

/**
 * 计算食谱与库存的匹配度
 * @param {Object} recipe - 食谱对象
 * @param {Array} inventory - 库存数组
 * @returns {Object} { matchRate, availableIngredients, missingIngredients, substitues }
 */
function calculateMatch(recipe, inventory) {
  const inventoryMap = {}
  inventory.forEach(item => {
    inventoryMap[item.name] = item
  })

  const availableIngredients = []
  const missingIngredients = []
  const substitues = []

  recipe.ingredients.forEach(ing => {
    const stockItem = inventoryMap[ing.name]
    if (stockItem && stockItem.quantity >= ing.amount) {
      availableIngredients.push({
        ...ing,
        stockQuantity: stockItem.quantity,
        stockUnit: stockItem.unit
      })
    } else {
      const hasStock = stockItem ? stockItem.quantity : 0
      missingIngredients.push({
        ...ing,
        stockQuantity: hasStock
      })

      // 检查替代建议
      if (recipe.substitues && recipe.substitues[ing.name]) {
        substitues.push({
          ingredient: ing.name,
          suggestion: recipe.substitues[ing.name]
        })
      }
    }
  })

  const matchRate = recipe.ingredients.length > 0
    ? Math.round((availableIngredients.length / recipe.ingredients.length) * 100)
    : 0

  return {
    matchRate,
    availableIngredients,
    missingIngredients,
    substitues
  }
}

/**
 * 模拟 AI 生成食谱：根据库存计算匹配度，返回 top 4
 * @param {Array} inventory - 库存数组
 * @param {string} category - 分类筛选（可选，'all' 表示全部）
 * @returns {Array} 食谱数组（带匹配信息）
 */
function generateRecipes(inventory, category) {
  let candidates = mockRecipes

  // 分类筛选
  if (category && category !== 'all') {
    candidates = mockRecipes.filter(r => r.category === category)
  }

  // 计算匹配度并排序
  const scored = candidates.map(recipe => {
    const match = calculateMatch(recipe, inventory)
    return {
      ...recipe,
      ...match
    }
  })

  // 优先匹配度高的，但至少返回有一定食材的
  scored.sort((a, b) => b.matchRate - a.matchRate)

  // 返回最高 4 个（至少食材匹配度 > 0 的）
  const result = scored.filter(r => r.matchRate > 0).slice(0, 4)
  return result
}

/**
 * 根据ID获取食谱
 */
function getRecipeById(id) {
  return mockRecipes.find(r => r.id === id) || null
}

/**
 * 获取菜谱的完整匹配信息
 */
function getRecipeWithMatch(recipeId, inventory) {
  const recipe = getRecipeById(recipeId)
  if (!recipe) return null
  const match = calculateMatch(recipe, inventory)
  return { ...recipe, ...match }
}

module.exports = {
  mockRecipes,
  recipeCategories,
  calculateMatch,
  generateRecipes,
  getRecipeById,
  getRecipeWithMatch
}
