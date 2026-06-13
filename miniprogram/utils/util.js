/**
 * 通用工具函数
 */

/**
 * 格式化日期为 'YYYY-MM-DD'
 */
function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 计算两个日期相差的天数
 */
function daysBetween(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diff = d2.getTime() - d1.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * 计算距离今天的天数
 */
function daysFromNow(dateStr) {
  return daysBetween(new Date(), dateStr)
}

/**
 * 判断是否临期（距到期 <= 3 天）
 */
function isExpiringSoon(expiryDate) {
  const days = daysFromNow(expiryDate)
  return days >= 0 && days <= 3
}

/**
 * 判断是否已过期
 */
function isExpired(expiryDate) {
  return daysFromNow(expiryDate) < 0
}

/**
 * 获取到期状态
 */
function getExpiryStatus(expiryDate) {
  const days = daysFromNow(expiryDate)
  if (days < 0) return { status: 'expired', label: '已过期', days }
  if (days <= 1) return { status: 'urgent', label: '即将过期', days }
  if (days <= 3) return { status: 'warning', label: '临期', days }
  return { status: 'normal', label: '', days }
}

/**
 * 生成唯一ID
 */
function generateId(prefix = 'id') {
  return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6)
}

/**
 * 解析极简输入，例如 "番茄 3 个"
 * 返回 { name, quantity, unit }
 */
function parseQuickInput(text) {
  if (!text || !text.trim()) return null

  const input = text.trim()

  // 匹配 "名称 数字 单位" 格式
  const patterns = [
    /^(.+?)\s+(\d+\.?\d*)\s*(个|g|克|ml|毫升|盒|袋|瓶|把|颗|块|根|瓣|杯|勺|斤|公斤|两)$/,
    /^(\d+\.?\d*)\s*(个|g|克|ml|毫升|盒|袋|瓶|把|颗|块|根|瓣|杯|勺|斤|公斤|两)\s+(.+)$/,
    /^(.+?)\s*[xX×]\s*(\d+)$/
  ]

  // 单位映射
  const unitMap = {
    '克': 'g',
    '毫升': 'ml',
    '斤': '斤',
    '公斤': 'kg',
    '两': '两'
  }

  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match) {
      if (pattern === patterns[0]) {
        const name = match[1].trim()
        const quantity = parseFloat(match[2])
        let unit = match[3].trim()
        unit = unitMap[unit] || unit
        return { name, quantity, unit }
      } else if (pattern === patterns[1]) {
        const quantity = parseFloat(match[1])
        let unit = match[2].trim()
        unit = unitMap[unit] || unit
        const name = match[3].trim()
        return { name, quantity, unit }
      } else if (pattern === patterns[2]) {
        const name = match[1].trim()
        const quantity = parseInt(match[2])
        return { name, quantity, unit: '个' }
      }
    }
  }

  // 只输入了名称
  return { name: input, quantity: 1, unit: '个' }
}

/**
 * 显示 Toast 提示
 */
function showToast(title, icon = 'none') {
  wx.showToast({ title, icon, duration: 2000 })
}

/**
 * 显示确认弹窗
 */
function showConfirm(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success: res => resolve(res.confirm),
      fail: () => resolve(false)
    })
  })
}

module.exports = {
  formatDate,
  daysBetween,
  daysFromNow,
  isExpiringSoon,
  isExpired,
  getExpiryStatus,
  generateId,
  parseQuickInput,
  showToast,
  showConfirm
}
