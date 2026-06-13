/**
 * 视频来源 Mock 数据
 * 模拟小红书/B站/抖音视频链接
 */

const mockVideos = [
  {
    id: 'vid_001',
    recipeId: 'rec_001',
    platform: 'B站',
    platformIcon: 'bilibili',
    title: '番茄炒蛋 — 家常做法，味道超赞',
    url: 'https://www.bilibili.com/video/BV1xx411c7mD',
    author: '美食作家王刚',
    duration: '3:25'
  },
  {
    id: 'vid_002',
    recipeId: 'rec_002',
    platform: '小红书',
    platformIcon: 'xiaohongshu',
    title: '减脂期必吃！鸡胸肉炒西兰花，低卡高蛋白',
    url: 'https://www.xiaohongshu.com/explore/123456',
    author: '减脂厨房',
    duration: '2:15'
  },
  {
    id: 'vid_003',
    recipeId: 'rec_003',
    platform: '抖音',
    platformIcon: 'douyin',
    title: '懒人必备！电饭煲番茄饭，一锅搞定',
    url: 'https://www.douyin.com/video/789012',
    author: '懒人美食',
    duration: '1:08'
  },
  {
    id: 'vid_004',
    recipeId: 'rec_004',
    platform: 'B站',
    platformIcon: 'bilibili',
    title: '鸡蛋豆腐汤 — 暖胃又营养',
    url: 'https://www.bilibili.com/video/BV1xx411c7mE',
    author: '日食记',
    duration: '4:12'
  },
  {
    id: 'vid_005',
    recipeId: 'rec_005',
    platform: '小红书',
    platformIcon: 'xiaohongshu',
    title: '青椒肉丝这样做，三碗米饭不够吃',
    url: 'https://www.xiaohongshu.com/explore/234567',
    author: '家常菜日记',
    duration: '2:45'
  },
  {
    id: 'vid_006',
    recipeId: 'rec_006',
    platform: '抖音',
    platformIcon: 'douyin',
    title: '5分钟快手早餐 — 牛奶滑蛋三明治',
    url: 'https://www.douyin.com/video/345678',
    author: '早餐达人',
    duration: '0:58'
  }
]

// 根据食谱ID获取视频
function getVideoByRecipeId(recipeId) {
  return mockVideos.find(v => v.recipeId === recipeId) || null
}

module.exports = {
  mockVideos,
  getVideoByRecipeId
}
