const { getAllHistory } = require('../../mock/history')

function toStars(n) {
  var s = ''
  for (var i = 0; i < n; i++) { s += '⭐' }
  return s
}

Page({
  data: {
    records: []
  },

  onShow() {
    this.loadRecords()
  },

  loadRecords() {
    var records = getAllHistory()
    records = records.map(function(r) {
      r.stars = toStars(r.rating)
      return r
    })
    this.setData({ records: records })
  },

  onRecordTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe-detail/recipe-detail?id=${id}` })
  }
})
