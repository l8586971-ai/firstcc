const { getVideoByRecipeId } = require('../../mock/videos')

Component({
  properties: {
    recipe: {
      type: Object,
      value: {}
    }
  },

  data: {
    video: null,
    matchRate: 0
  },

  observers: {
    'recipe': function(recipe) {
      if (!recipe || !recipe.id) return

      const video = getVideoByRecipeId(recipe.id)
      this.setData({
        video,
        matchRate: recipe.matchRate || 0
      })
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { recipe: this.data.recipe })
    },

    onDetail() {
      this.triggerEvent('detail', { recipe: this.data.recipe })
    },

    onWatchVideo() {
      const video = this.data.video
      if (video) {
        // 模拟打开视频链接
        wx.showModal({
          title: '查看原视频',
          content: `【${video.platform}】${video.title}\n作者：${video.author}\n\n即将跳转到外部视频（V1 模拟）`,
          showCancel: true,
          confirmText: '去看看',
          success(res) {
            if (res.confirm) {
              // V1 先做剪贴板复制链接
              wx.setClipboardData({
                data: video.url,
                success() {
                  wx.showToast({ title: '链接已复制，请在App中打开', icon: 'none', duration: 2000 })
                }
              })
            }
          }
        })
      }
    }
  }
})
