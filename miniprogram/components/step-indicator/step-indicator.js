Component({
  properties: {
    steps: {
      type: Array,
      value: []
    },
    hints: {
      type: Array,
      value: []
    },
    current: {
      type: Number,
      value: 0
    }
  },

  data: {
    total: 0,
    stepText: ''
  },

  observers: {
    'steps': function(steps) {
      this.setData({ total: steps.length })
    },
    'current, steps': function(current, steps) {
      if (steps && steps.length > 0) {
        this.setData({
          stepText: steps[current] || '',
          hint: (this.data.hints && this.data.hints[current]) || ''
        })
      }
    }
  },

  methods: {
    onPrev() {
      if (this.data.current > 0) {
        this.triggerEvent('change', { current: this.data.current - 1 })
      }
    },

    onNext() {
      if (this.data.current < this.data.total - 1) {
        this.triggerEvent('change', { current: this.data.current + 1 })
      } else {
        this.triggerEvent('finish')
      }
    }
  }
})
