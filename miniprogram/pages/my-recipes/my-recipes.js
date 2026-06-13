const { getStats, getAllHistory } = require('../../mock/history')

function toStars(n) {
  var s = ''
  for (var i = 0; i < n; i++) { s += '⭐' }
  return s
}

Page({
  data: {
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

    // 最常做
    var topCooked = Object.values(stats)
      .sort(function(a, b) { return b.cookCount - a.cookCount })
      .slice(0, 10)
    topCooked = topCooked.map(function(r) {
      r.stars = toStars(Math.round(r.avgRating || 0))
      return r
    })

    // 最高评分
    var topRated = Object.values(stats)
      .filter(function(s) { return s.avgRating > 0 })
      .sort(function(a, b) { return b.avgRating - a.avgRating })
      .slice(0, 10)
    topRated = topRated.map(function(r) {
      r.stars = toStars(Math.round(r.avgRating))
      return r
    })

    // 最近制作
    var recentMade = allHistory.slice(0, 10)
    recentMade = recentMade.map(function(r) {
      r.stars = toStars(r.rating)
      return r
    })

    this.setData({ topCooked: topCooked, topRated: topRated, recentMade: recentMade })
  },

  onRecipeTap(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onHistory() {
    wx.navigateTo({ url: '/pages/history/history' })
  }
})
