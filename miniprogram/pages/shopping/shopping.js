const { getShoppingList, refreshCache } = require('../../mock/index')
const { addInventory } = require('../../mock/inventory')

Page({
  data: {
    shoppingList: [],
    totalItems: 0,
    purchasedItems: 0,
    unpurchasedItems: 0,
    showStockInModal: false,
    currentItem: null,
    stockInAmount: 0
  },

  onShow() {
    this.loadShoppingList()
  },

  loadShoppingList() {
    const list = getShoppingList()
    const purchasedItems = list.filter(item => item.purchased).length

    this.setData({
      shoppingList: list,
      totalItems: list.length,
      purchasedItems,
      unpurchasedItems: list.length - purchasedItems
    })
  },

  onRefresh() {
    refreshCache()
    this.loadShoppingList()
    wx.showToast({ title: '已刷新', icon: 'success' })
  },

  onCheckItem(e) {
    const id = e.currentTarget.dataset.id
    const list = this.data.shoppingList
    const item = list.find(i => i.id === id)

    if (item) {
      item.purchased = !item.purchased
      if (item.purchased) {
        item.actualAmount = item.suggestAmount
      } else {
        item.actualAmount = 0
      }

      const purchasedItems = list.filter(i => i.purchased).length
      this.setData({
        shoppingList: list,
        purchasedItems,
        unpurchasedItems: list.length - purchasedItems
      })
    }
  },

  // 单个入库
  onStockIn(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.shoppingList.find(i => i.id === id)

    if (item) {
      this.setData({
        showStockInModal: true,
        currentItem: item,
        stockInAmount: item.suggestAmount
      })
    }
  },

  // 一键入库
  onBatchStockIn() {
    const unpurchased = this.data.shoppingList.filter(i => !i.purchased)
    if (unpurchased.length === 0) {
      wx.showToast({ title: '没有待入库项', icon: 'none' })
      return
    }

    // 逐个确认
    wx.showModal({
      title: '一键入库',
      content: `确定将 ${unpurchased.length} 件食材按建议数量入库吗？`,
      success: (res) => {
        if (res.confirm) {
          unpurchased.forEach(item => {
            addInventory(item.foodId, item.suggestAmount)
            item.purchased = true
            item.actualAmount = item.suggestAmount
          })
          this.loadShoppingList()
          wx.showToast({ title: '已全部入库', icon: 'success' })
        }
      }
    })
  },

  // 入库数量输入
  onAmountInput(e) {
    this.setData({ stockInAmount: Number(e.detail.value) || 0 })
  },

  // 确认入库
  onConfirmStockIn() {
    const { currentItem, stockInAmount } = this.data

    if (stockInAmount <= 0) {
      wx.showToast({ title: '请输入有效数量', icon: 'none' })
      return
    }

    addInventory(currentItem.foodId, stockInAmount)
    currentItem.purchased = true
    currentItem.actualAmount = stockInAmount

    this.setData({ showStockInModal: false })
    this.loadShoppingList()
    wx.showToast({ title: `${currentItem.name} 已入库`, icon: 'success' })
  },

  onCloseModal() {
    this.setData({ showStockInModal: false })
  }
})
