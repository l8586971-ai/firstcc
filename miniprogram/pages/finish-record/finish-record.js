const { getRecipeWithMatch } = require('../../mock/recipes')
const { getInventory, deductInventory } = require('../../mock/inventory')
const { addHistory, tasteTagOptions, textureTagOptions, portionTagOptions, difficultyTagOptions } = require('../../mock/history')
const { formatDate, showToast } = require('../../utils/util')
const { refreshCache } = require('../../mock/index')

Page({
  data: {
    recipe: null,
    consumptions: [],
    rating: 0,
    actualTime: 0,
    selectedTasteTags: [],
    selectedTextureTags: [],
    selectedPortionTags: [],
    selectedDifficultyTags: [],
    note: '',
    nextReminder: '',
    tasteTagOptions,
    textureTagOptions,
    portionTagOptions,
    difficultyTagOptions
  },

  onLoad(options) {
    const id = options.id
    if (!id) return

    const inventory = getInventory()
    const recipe = getRecipeWithMatch(id, inventory)

    if (recipe) {
      // 利用已有食材构建消耗列表
      const consumptions = recipe.availableIngredients.map(ing => ({
        foodId: this.findFoodId(ing.name, inventory),
        foodName: ing.name,
        planned: ing.amount,
        actual: ing.amount,
        unit: ing.unit,
        currentStock: ing.stockQuantity
      }))

      // 也加入部分缺少的食材（如果库存 > 0）
      recipe.missingIngredients.forEach(ing => {
        if (ing.stockQuantity > 0) {
          consumptions.push({
            foodId: this.findFoodId(ing.name, inventory),
            foodName: ing.name,
            planned: ing.amount,
            actual: Math.min(ing.stockQuantity, ing.amount),
            unit: ing.unit,
            currentStock: ing.stockQuantity
          })
        }
      })

      this.setData({
        recipe,
        consumptions,
        actualTime: recipe.cookTime
      })
    }
  },

  findFoodId(name, inventory) {
    const item = inventory.find(f => f.name === name)
    return item ? item.id : ''
  },

  // 实际消耗输入
  onConsumeInput(e) {
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value) || 0
    this.setData({ [`consumptions[${index}].actual`]: value })
  },

  // 评分
  onRate(e) {
    this.setData({ rating: e.detail.rating })
  },

  // 实际用时
  onTimeInput(e) {
    this.setData({ actualTime: Number(e.detail.value) || 0 })
  },

  // 标签切换
  onToggleTasteTag(e) { this.toggleTag('selectedTasteTags', e.currentTarget.dataset.tag) },
  onToggleTextureTag(e) { this.toggleTag('selectedTextureTags', e.currentTarget.dataset.tag) },
  onTogglePortionTag(e) { this.toggleTag('selectedPortionTags', e.currentTarget.dataset.tag) },
  onToggleDifficultyTag(e) { this.toggleTag('selectedDifficultyTags', e.currentTarget.dataset.tag) },

  toggleTag(field, tag) {
    const current = this.data[field]
    const index = current.indexOf(tag)
    if (index >= 0) {
      current.splice(index, 1)
    } else {
      current.push(tag)
    }
    this.setData({ [field]: current })
  },

  // 备注
  onNoteInput(e) {
    this.setData({ note: e.detail.value })
  },

  // 下次提醒
  onReminderInput(e) {
    this.setData({ nextReminder: e.detail.value })
  },

  // 提交
  onSubmit() {
    const { recipe, consumptions, rating, actualTime, selectedTasteTags,
      selectedTextureTags, selectedPortionTags, selectedDifficultyTags,
      note, nextReminder } = this.data

    // 1. 扣减库存
    const deductList = consumptions
      .filter(c => c.actual > 0)
      .map(c => ({ id: c.foodId, amount: c.actual }))

    if (deductList.length > 0) {
      deductInventory(deductList)
    }

    // 2. 保存制作记录
    addHistory({
      recipeId: recipe.id,
      recipeName: recipe.name,
      cookDate: formatDate(new Date()),
      rating,
      actualTime,
      tasteTags: selectedTasteTags,
      textureTags: selectedTextureTags,
      portionTags: selectedPortionTags,
      difficultyTags: selectedDifficultyTags,
      note,
      nextReminder,
      consumptions
    })

    // 3. 刷新缓存
    refreshCache()

    showToast('记录已保存，库存已更新', 'success')

    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' })
    }, 1000)
  }
})
