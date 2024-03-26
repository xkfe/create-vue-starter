/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_REPORT: boolean
  VITE_NODE_ENV: 'development' | 'production' | 'test'
  VITE_PUBLIC_PATH: string
  VITE_DROP_CONSOLE: boolean
  VITE_API_URL: string
  VITE_API_URL_MINI: string
  VITE_APP_ID: string
  VITE_PROXY: [string, string][]
}
