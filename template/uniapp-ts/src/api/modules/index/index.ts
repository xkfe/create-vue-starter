import type { ResultData } from '@/api/request/interface'
import http from '@/api/request'

/**
 * @description: 示例接口
 * @param {number} id
 * @return void
 */
export function testApi<T>(params: { id: number | string }) {
  return http.get<ResultData<T>>('/xxx', params)
}
