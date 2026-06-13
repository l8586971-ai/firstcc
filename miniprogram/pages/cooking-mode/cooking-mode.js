const { getRecipeById } = require('../../mock/recipes')
const { getLatestHistoryByRecipeId } = require('../../mock/history')

Page({
  data: {
    recipe: null,
    currentStep: 0,
    lastRecord: null,
    hints: [
      '开始前请确认所有食材和调料已准备好',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '这是最后一步了，加油！'
    ]
  },

  onLoad(options) {
    const id = options.id
    const recipe = getRecipeById(id)
    const lastRecord = getLatestHistoryByRecipeId(id)

    if (recipe) {
      this.setData({ recipe, lastRecord })
      wx.setNavigationBarTitle({ title: recipe.name })
    }
  },

  onStepChange(e) {
    this.setData({ currentStep: e.detail.current })
  },

  onFinish() {
    const recipe = this.data.recipe
    wx.redirectTo({ url: `/pages/finish-record/finish-record?id=${recipe.id}` })
  }
})
