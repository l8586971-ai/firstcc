const { isExpiringSoon, isExpired, daysFromNow } = require('../../utils/util')

Component({
  properties: {
    food: {
      type: Object,
      value: {}
    },
    showActions: {
      type: Boolean,
      value: true
    }
  },

  data: {
    expiring: false,
    expired: false,
    expiryDays: 0,
    lowStock: false
  },

  observers: {
    'food': function(food) {
      if (!food || !food.expiryDate) return
      const expired = isExpired(food.expiryDate)
      const expiring = !expired && isExpiringSoon(food.expiryDate)
      const expiryDays = daysFromNow(food.expiryDate)
      const lowStock = food.quantity < food.warningThreshold

      this.setData({
        expiring,
        expired,
        expiryDays,
        lowStock
      })
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { food: this.data.food })
    },

    onEdit() {
      this.triggerEvent('edit', { food: this.data.food })
    },

    onDelete() {
      this.triggerEvent('delete', { food: this.data.food })
    }
  }
})
