Component({
  properties: {
    rating: {
      type: Number,
      value: 0
    },
    readonly: {
      type: Boolean,
      value: false
    }
  },

  data: {
    currentRating: 0,
    ratingLabels: {
      1: '一般',
      2: '还行',
      3: '不错',
      4: '好吃',
      5: '超赞'
    }
  },

  observers: {
    'rating': function(val) {
      this.setData({ currentRating: val })
    }
  },

  methods: {
    onRate(e) {
      if (this.data.readonly) return
      const rating = e.currentTarget.dataset.rating
      this.setData({ currentRating: rating })
      this.triggerEvent('rate', { rating })
    }
  }
})
