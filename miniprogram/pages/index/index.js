const { getExpiringFoods, getLowStockFoods } = require('../../mock/inventory')
const { getAllHistory } = require('../../mock/history')

function toStars(n) {
  var s = ''
  for (var i = 0; i < n; i++) { s += '⭐' }
  return s
}

Page({
  data: {
    expiringFoods: [],
    lowStockFoods: [],
    recentHistory: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    var expiringFoods = getExpiringFoods()
    var lowStockFoods = getLowStockFoods()
    var allHistory = getAllHistory()
    var recentHistory = allHistory.slice(0, 3)
    recentHistory = recentHistory.map(function(r) {
      r.stars = toStars(r.rating)
      return r
    })

    this.setData({
      expiringFoods: expiringFoods,
      lowStockFoods: lowStockFoods,
      recentHistory: recentHistory
    })
  },

  // 生成今日食谱
  onGenerateRecipe() {
    wx.switchTab({ url: '/pages/recipe/recipe' })
  },

  // 添加食材
  onAddFood() {
    wx.navigateTo({ url: '/pages/add-food/add-food' })
  },

  // 查看采购单
  onGoShopping() {
    wx.switchTab({ url: '/pages/shopping/shopping' })
  },

  // 我的常做菜
  onMyRecipes() {
    wx.navigateTo({ url: '/pages/my-recipes/my-recipes' })
  },

  // 食谱详情
  onRecipeDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe-detail/recipe-detail?id=${id}` })
  }
})
