var { initMockData } = require('./mock/index')

App({
  globalData: {
    inventoryReady: false,
    userInfo: null
  },

  onLaunch() {
    try {
      initMockData()
      this.globalData.inventoryReady = true
      console.log('[App] Mock 数据初始化完成')
    } catch (e) {
      console.error('[App] 初始化失败:', e)
    }

    try {
      var systemInfo = wx.getSystemInfoSync()
      this.globalData.systemInfo = systemInfo
    } catch (e) {
      console.error('[App] 获取系统信息失败:', e)
    }
  }
})
