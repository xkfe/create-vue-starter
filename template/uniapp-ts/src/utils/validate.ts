/**
 * 检测是否是数字
 * @param arg 待检测的字符
 * @param defaultNum 0,如果不符合值时设置默认值
 * @returns number类型数值
 */
export function isNumber(arg: string | number | undefined | null, defaultNum = 0): number {
  const p = Number(arg)
  return p || defaultNum
}
/**
 * 检测是否是字符串
 * @param arg 待检测的字符
 * @param defaultNum 默认"",如果不符合值是设置默认值
 * @returns 字符串
 */
export function isString(arg: string | number | undefined | null, defaultStr = ''): string {
  let p = ''
  if (typeof arg === 'string' && arg != null)
    p = String(arg)

  else p = defaultStr
  return p
}

/**
 * 是否是手机号码
 * @param phone 号码
 * @returns Boolean
 */
export function isPhone(phone: string | number) {
  const val = String(phone)
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return !!val.match(reg)
}

/**
 * 是否含有中文
 * @param s 字符串
 * @returns Boolean
 */
export function isChina(s: string) {
  const pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
  return !!pattern.exec(s)
}

/**
 * 是否为空
 * @description 判断是否是null,对象是否为空，数组是否为空。是否为 undefaind，是否为 “”空字符串。
 * @param s 任意
 */
export function isEmpty(s: any) {
  if (typeof s === 'string')
    s = s.trim()

  if (s === '')
    return true
  if (s == null)
    return true
  if (typeof s === 'undefined')
    return true
  if (Array.isArray(s)) {
    if (s.length === 0)
      return true
  }

  if (typeof s === 'object') {
    if (Object.keys(s).length === 0)
      return true
  }

  return false
}
/**
 * 是否邮箱
 * @param s 字符串
 * @returns Boolean
 */
export function isEmail(s: string) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return !!s.match(reg)
}
/**
 * 是否身份证号
 * @param val 字符号或者数字
 * @returns Boolean
 * @author https://cloud.tencent.com/developer/article/1114323
 */
export function isIdCard(val: string | number) {
  val = String(val)
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  const code = val.substring(17)
  if (p.test(val)) {
    let sum: number = 0
    for (let i = 0; i < 17; i++) {
      const id: number | string | any = val[i]
      sum += id * factor[i]
    }
    if (parity[sum % 11] === code.toUpperCase())
      return true
  }
  return false
}
/**
 * 是否车牌
 * @description 蓝牌5位，绿牌6位。
 * @param s 字符串
 * @returns Boolean
 */
export function isIdCar(s: string) {
  const reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/
  return !!s.match(reg)
}

/**
 * 纯数字密码验证
 * @param s 字符串或者数字
 * @param len 最小长度，默认6
 * @param maxLen 最大长度，默认20
 * @returns Boolean
 */
export function isPasswordOfNumber(s: number | string, len = 6, maxLen = 20) {
  s = String(s)
  const reg = new RegExp(`^[0-9]{${len},${maxLen}}$`)
  return !!s.match(reg)
}

/**
 * 密码验证
 * @param s 字符串或者数字
 * @param len 最小长度，默认6
 * @param maxLen 最大长度，默认20
 * @param model 0数字和英文，1数字，英文必须包含，不允许有特殊字符，2数字和字母必须包含，可以有特殊字符。
 * @returns Boolean
 */
export function isPasswordOfOther(s: string | number, _len = 6, _maxLen = 20, model = 0) {
  s = String(s)
  // 密码至少包含 数字和英文，长度6-20
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  // 密码包含 数字,英文,字符中的两种以上，长度6-20
  if (model === 1)
    reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/

  // 至少包含数字跟字母，可以有字符
  if (model === 2)
    reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/

  return !!s.match(reg)
}

/**
 * 是否是一个有效的日期
 * @param s 字符串，数字，日期对象
 * @returns Boolean
 */
export function isDate(s: string | number | Date) {
  if (s == null || typeof s === 'undefined' || !s)
    return false
  if (typeof s === 'string') {
    // 兼容ios,mac
    s = s.replace('-', '/')
  }
  const d = new Date(s)
  if (d.toString() === 'Invalid Date')
    return false
  return true
}
