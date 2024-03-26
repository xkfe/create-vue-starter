import { un } from '@uni-helper/uni-network'
import type { UnConfig, UnInstance } from '@uni-helper/uni-network'

import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceLoading'
import { checkStatus } from './checkStatus'
import { ResultEnum } from './httpEnum'
import { useLoginStore } from '@/stores/user/index'

const loginInfoStore = useLoginStore()

let baseURL = import.meta.env.VITE_API_URL
// #ifdef MP
baseURL = import.meta.env.VITE_API_URL_MINI
// #endif

const config: UnConfig = {
  baseUrl: baseURL,
  timeout: Number(ResultEnum.TIMEOUT),
  withCredentials: true,
  headers: {},
}

class RequestHttp {
  service: UnInstance
  public constructor(config: UnConfig) {
    // instantiation
    this.service = un.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 pinia/本地储存当中
     */
    this.service.interceptors.request.use((config) => {
      // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
      config.noLoading || showFullScreenLoading()

      const token = loginInfoStore.loginInfo.token
      if (token && config.headers)
        config.headers.Authorization = token

      return config
    }, (error) => {
      return Promise.reject(error)
    })

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     *  response: any 临时解决一下
     */
    this.service.interceptors.response.use((response: any) => {
      const { data } = response

      if (data.code !== 200 && toString.call(data) !== '[object ArrayBuffer]') {
        if (data.code === 401) {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }
        checkStatus(data.code, data.msg)
        return Promise.reject(data)
      }

      // loading -> false
      tryHideFullScreenLoading()
      return data
    }, (error) => {
    // loading -> false
      tryHideFullScreenLoading()

      const { response } = error
      if (response)
        checkStatus(response.code, response.msg)

      return Promise.reject(response)
    })
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object | string, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
