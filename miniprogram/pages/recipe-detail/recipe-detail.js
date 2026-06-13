const { getRecipeWithMatch } = require('../../mock/recipes')
const { getInventory } = require('../../mock/inventory')
const { getVideoByRecipeId } = require('../../mock/videos')
const { getLatestHistoryByRecipeId } = require('../../mock/history')

Page({
  data: {
    recipe: null,
    video: null,
    lastRecord: null,
    matchClass: ''
  },

  onLoad(options) {
    const id = options.id
    if (!id) return

    const inventory = getInventory()
    const recipe = getRecipeWithMatch(id, inventory)

    if (recipe) {
      const video = getVideoByRecipeId(id)
      const lastRecord = getLatestHistoryByRecipeId(id)

      let matchClass = ''
      if (recipe.matchRate >= 75) matchClass = 'high'
      else if (recipe.matchRate >= 50) matchClass = 'mid'
      else matchClass = 'low'

      this.setData({ recipe, video, lastRecord, matchClass })
    }
  },

  // 查看原视频
  onWatchVideo() {
    const video = this.data.video
    if (!video) return

    wx.showModal({
      title: '查看原视频',
      content: `【${video.platform}】${video.title}\n作者：${video.author}\n\nV1 阶段将通过剪贴板复制链接`,
      showCancel: true,
      confirmText: '复制链接',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: video.url,
            success() {
              wx.showToast({ title: '链接已复制，请在App中打开', icon: 'none' })
            }
          })
        }
      }
    })
  },

  // 开始跟做
  onStartCooking() {
    const recipe = this.data.recipe
    wx.navigateTo({ url: `/pages/cooking-mode/cooking-mode?id=${recipe.id}` })
  },

  // 完成并记录
  onFinishRecord() {
    const recipe = this.data.recipe
    wx.navigateTo({ url: `/pages/finish-record/finish-record?id=${recipe.id}` })
  }
})
