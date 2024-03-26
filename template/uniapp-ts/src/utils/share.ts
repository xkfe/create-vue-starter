/**
 * 分享配置
 */
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

// 微信分享结构类型
interface wxshareConfig {
  title?: string // 分享标题
  desc?: string // 描述
  imageUrl?: string // 分享图片
  path?: string // 分享路径
  copyLink?: string // 复制链接
  query?: any // 分享参数
}

export function share(args: wxshareConfig = {}) {
  const defaultWxshareConfig: wxshareConfig = {
    ...args,
  }
  // 分享朋友默认配置
  let shareAppOptions: wxshareConfig = {}
  // 分享朋友圈默认配置
  let shareTimeOptions: wxshareConfig = {}
  // onShareAppMessage
  const shareApp = (options: wxshareConfig = {}) => {
    onShareAppMessage((): wxshareConfig => {
      return {
        ...defaultWxshareConfig,
        ...options,
        ...shareAppOptions,
      }
    })
  }
  // 添加onShareAppMessage参数
  const setShareApp = (options: wxshareConfig = {}) => {
    shareAppOptions = options
  }
  // onShareTimeline
  const shareTime = (options: wxshareConfig = {}) => {
    onShareTimeline((): wxshareConfig => {
      return {
        ...defaultWxshareConfig,
        ...options,
        ...shareTimeOptions,
      }
    })
  }
  // 添加onShareTimeline参数
  const setShareTime = (options = {}) => {
    shareTimeOptions = options
  }

  return {
    onShareAppMessage: shareApp,
    onShareTimeline: shareTime,
    setShareApp,
    setShareTime,
  }
}
