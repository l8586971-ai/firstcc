const {
  getFoodById, addFood, updateFood, deleteFood,
  categories, storageLocations, units
} = require('../../mock/inventory')
const { formatDate, parseQuickInput, showToast, showConfirm } = require('../../utils/util')

Page({
  data: {
    isEdit: false,
    editId: '',
    categories,
    storageLocations,
    units,
    categoryIndex: 0,
    unitIndex: 0,
    locationIndex: 0,
    quickInput: '',
    form: {
      name: '',
      category: '蔬菜',
      quantity: 1,
      unit: '个',
      storageLocation: '冷藏',
      purchaseDate: '',
      expiryDate: '',
      warningThreshold: 1,
      thresholdUnit: '个',
      isCommon: false,
      note: ''
    }
  },

  onLoad(options) {
    // 编辑模式
    if (options.id) {
      const food = getFoodById(options.id)
      if (food) {
        this.setData({
          isEdit: true,
          editId: food.id,
          form: { ...food },
          categoryIndex: categories.findIndex(c => c.key === food.category),
          unitIndex: units.indexOf(food.unit),
          locationIndex: storageLocations.indexOf(food.storageLocation)
        })
      }
    }

    // 设置默认日期
    if (!this.data.form.purchaseDate) {
      this.setData({ 'form.purchaseDate': formatDate(new Date()) })
    }
    if (!this.data.form.expiryDate) {
      const defaultExp = new Date()
      defaultExp.setDate(defaultExp.getDate() + 7)
      this.setData({ 'form.expiryDate': formatDate(defaultExp) })
    }
  },

  // 极简输入
  onQuickInput(e) {
    this.setData({ quickInput: e.detail.value })
  },

  onQuickParse() {
    const input = this.data.quickInput.trim()
    if (!input) {
      showToast('请输入食材信息')
      return
    }

    const parsed = parseQuickInput(input)
    if (!parsed) {
      showToast('无法识别，请手动填写')
      return
    }

    this.setData({
      'form.name': parsed.name,
      'form.quantity': parsed.quantity,
      'form.unit': parsed.unit,
      unitIndex: units.indexOf(parsed.unit) >= 0 ? units.indexOf(parsed.unit) : 0,
      quickInput: ''
    })

    showToast(`已识别：${parsed.name} ${parsed.quantity}${parsed.unit}`)
  },

  // 表单字段输入
  onFieldInput(e) {
    const field = e.currentTarget.dataset.field
    let value = e.detail.value

    if (field === 'quantity' || field === 'warningThreshold') {
      value = Number(value) || 0
    }

    this.setData({ [`form.${field}`]: value })
  },

  // 分类选择
  onCategoryChange(e) {
    const index = Number(e.detail.value)
    this.setData({
      categoryIndex: index,
      'form.category': categories[index].key
    })
  },

  // 单位选择
  onUnitChange(e) {
    const index = Number(e.detail.value)
    this.setData({
      unitIndex: index,
      'form.unit': units[index]
    })
  },

  // 存放位置选择
  onLocationChange(e) {
    const index = Number(e.detail.value)
    this.setData({
      locationIndex: index,
      'form.storageLocation': storageLocations[index]
    })
  },

  // 日期选择
  onDateChange(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  // 常备开关
  onSwitchChange(e) {
    this.setData({ 'form.isCommon': e.detail.value })
  },

  // 保存
  onSave() {
    const { form, isEdit, editId } = this.data

    if (!form.name.trim()) {
      showToast('请输入食材名称')
      return
    }
    if (!form.quantity || form.quantity <= 0) {
      showToast('请输入有效数量')
      return
    }

    form.warningThreshold = form.warningThreshold || 1

    if (isEdit) {
      updateFood(editId, form)
      showToast('已更新', 'success')
    } else {
      addFood({ ...form })
      showToast('已添加', 'success')
    }

    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  },

  // 删除
  async onDelete() {
    const confirmed = await showConfirm('删除食材', `确定要删除「${this.data.form.name}」吗？`)
    if (confirmed) {
      deleteFood(this.data.editId)
      showToast('已删除')
      setTimeout(() => {
        wx.navigateBack()
      }, 800)
    }
  }
})
