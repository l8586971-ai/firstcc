var { generateRecipes, recipeCategories } = require('../../mock/recipes')
var { getInventory } = require('../../mock/inventory')
var { getStats, getAllHistory } = require('../../mock/history')

function toStars(n) {
  var s = ''
  for (var i = 0; i < n; i++) { s += '⭐' }
  return s
}

Page({
  data: {
    categories: recipeCategories,
    activeCategory: 'all',
    recipes: [],
    hasGenerated: false,
    topCooked: [],
    topRated: [],
    recentMade: []
  },

  onShow() {
    this.loadStats()
  },

  loadStats() {
    var stats = getStats()
    var allHistory = getAllHistory()

    var topCooked = Object.values(stats)
      .sort(function(a, b) { return b.cookCount - a.cookCount })
      .slice(0, 3)
    topCooked = topCooked.map(function(r) {
      r.stars = toStars(Math.round(r.avgRating || 0))
      return r
    })

    var topRated = Object.values(stats)
      .filter(function(s) { return s.avgRating > 0 })
      .sort(function(a, b) { return b.avgRating - a.avgRating })
      .slice(0, 3)
    topRated = topRated.map(function(r) {
      r.stars = toStars(Math.round(r.avgRating))
      return r
    })

    var recentMade = allHistory.slice(0, 3)
    recentMade = recentMade.map(function(r) {
      r.stars = toStars(r.rating)
      return r
    })

    this.setData({ topCooked: topCooked, topRated: topRated, recentMade: recentMade })
  },

  onCategoryChange(e) {
    var category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category })
    if (this.data.hasGenerated) {
      this.generateRecipes()
    }
  },

  onGenerate() {
    this.generateRecipes()
  },

  generateRecipes() {
    var inventory = getInventory()
    var recipes = generateRecipes(inventory, this.data.activeCategory)

    this.setData({
      recipes: recipes,
      hasGenerated: true
    })

    if (recipes.length === 0) {
      wx.showToast({ title: '暂无可匹配食谱，请添加更多食材', icon: 'none' })
    } else {
      this.loadStats()
      wx.showToast({ title: '已生成 ' + recipes.length + ' 份食谱', icon: 'success' })
    }
  },

  onRecipeDetail(e) {
    var recipe = e.detail.recipe
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + recipe.id })
  },

  onMyRecipes() {
    wx.navigateTo({ url: '/pages/my-recipes/my-recipes' })
  },

  onHistory() {
    wx.navigateTo({ url: '/pages/history/history' })
  }
})
