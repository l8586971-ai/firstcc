const { getInventory, deleteFood, getExpiringFoods, getLowStockFoods } = require('../../mock/inventory')
const { isExpired } = require('../../utils/util')
const { showConfirm, showToast } = require('../../utils/util')

Page({
  data: {
    inventory: [],
    filteredInventory: [],
    categories: [
      { key: 'all', name: '全部' },
      { key: '蔬菜', name: '蔬菜' },
      { key: '水果', name: '水果' },
      { key: '肉类', name: '肉类' },
      { key: '蛋奶', name: '蛋奶' },
      { key: '调料', name: '调料' },
      { key: '主食', name: '主食' },
      { key: '其他', name: '其他' }
    ],
    activeCategory: 'all',
    expiringCount: 0,
    lowStockCount: 0,
    expiredCount: 0
  },

  onShow() {
    this.loadInventory()
  },

  loadInventory() {
    const inventory = getInventory()
    const expiringList = getExpiringFoods()
    const lowStockList = getLowStockFoods()
    const expiredCount = inventory.filter(f => isExpired(f.expiryDate)).length

    this.setData({
      inventory,
      expiringCount: expiringList.length,
      lowStockCount: lowStockList.length,
      expiredCount
    })

    this.filterInventory()
  },

  // 按分类筛选
  filterInventory() {
    const { inventory, activeCategory } = this.data
    let filtered

    if (activeCategory === 'all') {
      filtered = [...inventory]
    } else {
      filtered = inventory.filter(f => f.category === activeCategory)
    }

    this.setData({ filteredInventory: filtered })
  },

  onCategoryChange(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category }, () => {
      this.filterInventory()
    })
  },

  onAddFood() {
    wx.navigateTo({ url: '/pages/add-food/add-food' })
  },

  onEditFood(e) {
    const { food } = e.detail
    wx.navigateTo({ url: `/pages/add-food/add-food?id=${food.id}` })
  },

  async onDeleteFood(e) {
    const { food } = e.detail
    const confirmed = await showConfirm('删除食材', `确定要删除「${food.name}」吗？`)
    if (confirmed) {
      deleteFood(food.id)
      showToast('已删除')
      this.loadInventory()
    }
  },

  onFoodTap(e) {
    const { food } = e.detail
    wx.navigateTo({ url: `/pages/add-food/add-food?id=${food.id}` })
  }
})
