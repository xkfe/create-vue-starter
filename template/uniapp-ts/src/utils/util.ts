/* eslint-disable eqeqeq */
import type { ComponentInternalInstance } from 'vue'

interface Data {
  [key: string]: any
}

/**
 * 把一个数字进行分页返回数字数组
 * @param total 总数
 * @param pageSize 分页大小
 * @returns 数字数组
 */
export function paginate(total: number, pageSize: number): number[] {
  const pages = Math.ceil(total / pageSize)
  const pageArr: number[] = []
  for (let i = 0; i < pages; i++)
    pageArr.push(i + 1)

  return pageArr
}

/**
 * 取对象数据值（可深层次取值）
 * @example getValue(data,"a.b.c")
 * @param data 对象数据
 * @param keys 键值
 * @returns 返回值
 * @description 注意不会去改变原来的数据
 */
export function getValue(data: Data, keys: string): any {
  const keyArr = keys.split('.')
  let result = { ...data }

  for (const key of keyArr) {
    result = result[key]
    if (result === undefined || result === null)
      return result
  }

  return result
}

/**
 * 设置对象键值（可深层次设置值）
 * @example setValue(data,"a.b.c","haha")
 * @param data 对象数据
 * @param keys 键值
 * @returns 修改后的对象数据。
 * @description 改变原来的数据
 */
export function setValue(data: Data, keys: string, value: any): void {
  const keyArr = keys.split('.')
  let obj = data
  for (let i = 0; i < keyArr.length - 1; i++) {
    const key = keyArr[i]
    if (!(key in obj))
      obj[key] = {}

    obj = obj[key]
  }
  obj[keyArr[keyArr.length - 1]] = value
}
/**
 * 计算并返回一个对象中最大的层级数
 * @param data 待检测对象数据
 * @returns 最大层级数
 */
export function getMaxDepth(data: Data): number {
  let maxDepth = 0

  function traverse(obj: any, depth: number): void {
    if (typeof obj !== 'object' || obj === null) {
      maxDepth = Math.max(maxDepth, depth)
      return
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key))
        traverse(obj[key], depth + 1)
    }
  }

  traverse(data, 0)

  return maxDepth
}

/**
 * 深度合并对象
 * @param FirstOBJ 需要合并的对象
 * @param SecondOBJ 被合并的对象
 * @returns 返回合并后的对象
 */
export function deepObjectMerge(FirstOBJ: Data, SecondOBJ: Data): Data { // 深度合并对象
  for (const key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key]?.toString() === '[object Object]'
      ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
      : FirstOBJ[key] = SecondOBJ[key]
  }
  return FirstOBJ
}

/**
 * 数据分组
 * @param {Array} oArr - 原数组列表
 * @param {number} length - 单个数组长度
 * @return {Array}  arr - 分组后的新数组
 */
export function splitData<T>(arr: Array<T> = [], size = 1): Array<T[]> {
  const result = []
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size))

  return result as T[][]
}

/**
 * 深度克隆
 * @param {T} data 待克隆复制的数据
 * @return {T} any
 */
export function deepClone<T>(data: T): T {
  // 对常见的“非”值，直接返回原来值
  if (data === null || typeof data !== 'object')
    return data

  if (Array.isArray(data)) {
    const clone: any[] = []
    for (const item of data)
      clone.push(deepClone(item))

    return clone as any
  }
  if (data instanceof Date)
    return new Date(data.getTime()) as unknown as T

  if (data instanceof RegExp) {
    const flags = data.flags
    return new RegExp(data.source, flags) as unknown as T
  }
  if (typeof data === 'function')
    return data as unknown as T

  const clone = {} as T
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key))
      clone[key] = deepClone(data[key])
  }
  return clone
}

/**
 * 剩余时间格式化
 * @param {number} t - 剩余多少秒
 * @return {object}  format - 格式后的天时分秒对象
 */
export function timeMuch(t: number) {
  const format: any = {
    d: '00',
    h: '00',
    m: '00',
    s: '00',
  }
  if (t > 0) {
    const d = Math.floor(t / 86400)
    const h = Math.floor((t / 3600) % 24)
    const m = Math.floor((t / 60) % 60)
    const s = Math.floor(t % 60)
    format.d = d < 10 ? `0${d}` : d
    format.h = h < 10 ? `0${h}` : h
    format.m = m < 10 ? `0${m}` : m
    format.s = s < 10 ? `0${s}` : s
  }
  return format
}
// 获取时间距离当前时间
export function getDateToNewData(timestamp: number | string | Date = new Date().getTime()) {
  if (typeof timestamp == 'string')
    timestamp = new Date(timestamp).getTime()

  // 补全为13位
  const arrTimestamp: Array<string> = (`${timestamp}`).split('')
  for (let start = 0; start < 13; start++) {
    if (!arrTimestamp[start])
      arrTimestamp[start] = '0'
  }
  timestamp = Number(arrTimestamp.join('')) * 1

  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - timestamp

  // 如果本地时间反而小于变量时间
  if (diffValue < 0)
    return '不久前'

  // 计算差异时间的量级
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute

  // 数值补0方法
  const zero = function (value: number) {
    if (value < 10)
      return `0${value}`

    return value
  }

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (function () {
      const date = new Date(timestamp)
      return `${date.getFullYear()}年${zero(date.getMonth() + 1)}月${zero(date.getDate())}日`
    })()
  }
  else if (monthC >= 1) {
    return `${Number.parseInt(`${monthC}`)}月前`
  }
  else if (weekC >= 1) {
    return `${Number.parseInt(`${weekC}`)}周前`
  }
  else if (dayC >= 1) {
    return `${Number.parseInt(`${dayC}`)}天前`
  }
  else if (hourC >= 1) {
    return `${Number.parseInt(`${hourC}`)}小时前`
  }
  else if (minC >= 1) {
    return `${Number.parseInt(`${minC}`)}分钟前`
  }
  return '刚刚'
}

/**
 * 打电话
 * @param {string<number>} phoneNumber - 数字字符串
 * @return {Promise}
 */
export function callPhone(phoneNumber = '') {
  const num = phoneNumber.toString()
  return new Promise((rs, rj) => {
    uni.makePhoneCall({
      phoneNumber: num,
      success: () => rs(true),
      fail: err => rj(err),
    })
  })
}

/**
 * 调起客户端相机扫码。
 * @param {boolean} onlyFromCamera true 是否只允许相机扫码识别
 * @param {Array<string>} scanType ['barCode', 'qrCode', 'datamatrix','datamatrix']
 * @returns Promise 成功返回相关数据结构
 */
export function scanCode(onlyFromCamera = true, scanType = ['barCode', 'qrCode', 'datamatrix', 'datamatrix']): Promise<string | UniApp.ScanCodeSuccessRes> {
  return new Promise((rs, rj) => {
    // #ifdef H5
    rj(new Error('不支持H5'))
    // #endif
    // #ifndef H5
    uni.scanCode({
      onlyFromCamera,
      scanType,
      success: res => rs(res),
      fail: error => rj(error),
    })
    // #endif
  })
}

/**
 * 设置剪切板内容。
 * @param {string} data
 * @returns Promise true/false
 */
export function setClipboardData(data: string): Promise<string | boolean> {
  return new Promise((rs, rj) => {
    // #ifndef H5
    uni.setClipboardData({
      data,
      success: () => rs(true),
      fail: error => rj(error),
    })
    // #endif
    // #ifdef H5
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(data).then(() => rs(true)).catch((error => rs(error)))
    }
    else {
      const textArea = document.createElement('textarea')
      textArea.style.opacity = '0'
      textArea.style.position = 'fixed'
      textArea.style.top = '0px'
      textArea.value = data
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy') ? rs(true) : rj(new Error('错误'))
      textArea.remove()
    }
    // #endif
  })
}
/**
 * 获取剪切板内容
 * @returns Promise 剪切板内容
 */
export function getClipboardData(): Promise<boolean | string> {
  return new Promise((rs, rj) => {
    // #ifndef H5
    uni.getClipboardData({
      success: res => rs(res.data),
      fail: error => rj(error),
    })
    // #endif
    // #ifdef H5
    console.error('H5无法获取剪切板内容')
    rj(new Error('H5无法获取剪切板内容'))
    // #endif
  })
}

/**
 * 设置cookie数据
 * @param {string} key 键值
 * @param {string} data 值
 * @returns Boolean
 */
export function setCookie(key: string, data: any) {
  try {
    uni.setStorageSync(key, data)
    return true
  }
  catch (e) {
    return false
  }
}
/**
 * 删除一个本地cookie
 * @param {string} key 键值
 * @returns Boolean
 */
export function delCookie(key: string) {
  try {
    uni.removeStorageSync(key)
    return true
  }
  catch (e) {
    return false
  }
}

/**
 * 获取一个cookie数据
 * 如果存入的是对象，返回的也是对象。如果是string返回的也是字符串。
 * @param {string} key 键
 * @returns json/string
 */
export function getCookie(key: string) {
  try {
    const value = uni.getStorageSync(key)
    try {
      const val = JSON.parse(value)
      return val
    }
    catch (e) {
      return value
    }
  }
  catch (e) {
    return undefined
  }
}

/**
 * 向地址连接追加参数。
 * @param {string} uri 网址
 * @param {string} key 字段
 * @param {string} value 字段值
 * @returns
 */
export function httpUrlAddKey(uri: string, key: string, value: string) {
  if (!value)
    return uri

  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i')
  const separator = uri.includes('?') ? '&' : '?'
  if (uri.match(re))
    return uri.replace(re, `$1${key}=${value}$2`)

  else
    return `${uri + separator + key}=${value}`
}
/**
 * 取url参数
 * @param {string} uri 网址
 * @param {string} key 字段
 * @returns string
 */
export function getQueryString(url: string, key: string): string {
  const query_string = url.substring(url.indexOf('?'))
  if (!query_string)
    return ''
  const re = /[?&]?([^=]+)=([^&]*)/g
  let tokens: any

  // eslint-disable-next-line no-cond-assign
  while (tokens = re.exec(query_string)) {
    if (decodeURIComponent(tokens[1]) === key) {
      return decodeURIComponent(tokens[2])
      break
    }
  }
  return ''
}

/**
 *
 * @param rdix 随机因子
 * @param length 取的长度
 * @param isAddStr 是否限制随机结果中的长度,不允许输出长度
 * @returns String
 */
export function getUid(rdix = 1, length = 12, isAddStr = false) {
  return Math.floor(Math.random() * rdix * Math.floor(Math.random() * Date.now())).toString(isAddStr ? 16 : 10).substring(0, length)
}

/*
防抖
防抖原理：在一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
  @param {Function} func 要执行的回调函数
  @param {Number} wait 延迟的时间
  @param{Boolean} immediate 是否要立即执行
*/
let timeout: any = getUid(1)
export function debounce(func: Function, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null)
    clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    typeof func === 'function' && func()
  }
  else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = getUid(1)
    timeout = setTimeout(() => {
      typeof func === 'function' && func()
    }, wait)
  }
}

/**
 * 节流
  节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数
 * @param {number} wait 延时的时间
 * @param {boolean} immediate 是否立即执行
 * @return null
 */

// eslint-disable-next-line unused-imports/no-unused-vars
let timesr: any = Number.NaN
let throttleFlag: boolean
export function throttle(func: Function, wait = 500, immediate = true) {
  if (immediate) {
    if (!throttleFlag) {
      throttleFlag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      timesr = setTimeout(() => {
        throttleFlag = false
      }, wait)
    }
  }
  else {
    if (!throttleFlag) {
      throttleFlag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timesr = setTimeout(() => {
        throttleFlag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
};

/** 等同：queryDom */
export function quereyDom(t: ComponentInternalInstance, node: string): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
  return new Promise((res, _rej) => {
    // #ifdef APP-NVUE
    const dom: any = uni.requireNativePlugin('dom')
    setTimeout(() => {
      node = node.replace(/^[#\.]/g, '')
      dom.getComponentRect(t.refs[node], (el: any) => {
        res(el?.size)
      })
    }, 60)
    // #endif
    // #ifndef APP-NVUE
    const query = uni.createSelectorQuery().in(t)
    query.select(node).boundingClientRect((el) => {
      res(el)
    }).exec()
    // #endif
  })
}
/**
 * 查询文档节点信息
 * @param t Vue上下文对象
 * @param node 提供带#的id比如：'#id',在nvue中应该是元素上写明ref='id'
 * @returns vue页面返回查询的节点信息，nvue返回weex的节点信息。
 */
export const queryDom = quereyDom

type openUrlType = 'navigate' | 'redirect' | 'reLaunch' | 'switchTab' | 'navigateBack'
/**
 *
 * @param url string 打开的页面路径
 * @param type openUrlType "navigate"|"redirect"|"reLaunch"|"switchTab"|"navigateBack"
 */
export function routerTo(url: string, type: openUrlType = 'navigate') {
  const funType = {
    navigate: 'navigateTo',
    redirect: 'redirectTo',
    switchTab: 'switchTab',
    reLaunch: 'reLaunch',
    navigateBack: 'navigateBack',
  }
  const fun = funType[type]
  if (fun == 'navigateBack') {
    uni.navigateBack({
      fail(error) {
        console.error(error)
      },
    })
  }
  else if (fun == 'reLaunch') {
    uni.reLaunch({
      url,
      fail(error) {
        console.error(error)
      },
    })
  }
  else if (fun == 'switchTab') {
    uni.switchTab({
      url,
      fail(error) {
        console.error(error)
      },
    })
  }
  else if (fun == 'redirectTo') {
    uni.redirectTo({
      url,
      fail(error) {
        console.error(error)
      },
    })
  }
  else if (fun == 'navigateTo') {
    uni.navigateTo({
      url,
      fail(error) {
        console.error(error)
      },
    })
  }
}

/**
 * 将rpx转换为px
 * @param v 待转换的数字
 * @param screenWidth 屏幕的宽度，如果不提供默认自动获取
 * @return number
 */
export function toRpx(v: number, screenWidth: number = 0) {
  if (typeof screenWidth === 'undefined' || !screenWidth)
    screenWidth = uni.getSystemInfoSync().screenWidth

  const pixelRatio = 750 / screenWidth
  return Math.ceil(v * pixelRatio)
}
/**
 * 将rpx转换为px
 * @param v 待转换的数字
 * @return number
 */
export function toPx(v: number) {
  return Math.ceil(uni.upx2px(Number(v)))
}
let lastTime = 0
/**
 * 在下一次前执行回调函数
 * @param callback 回调函数
 * @returns 一个id值，取消时cancelAnimationFrame(id)来取消
 */
export function requestAnimationFrame(callback: Function): number {
  const currentTime = new Date().getTime()
  const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
  const id = <any>setTimeout(() => {
    callback(currentTime + timeToCall)
  }, timeToCall)
  lastTime = currentTime + timeToCall
  return id
}
/**
 * 取消回调执行
 * @param id requestAnimationFrame产生的id
 */
export function cancelAnimationFrame(id: number): void {
  clearTimeout(id)
}
