/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_OPEN: boolean
  readonly VITE_REPORT: boolean
  readonly VITE_NODE_ENV: 'development' | 'production' | 'test'
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_DROP_CONSOLE: boolean
  readonly VITE_API_URL: string
  readonly VITE_API_URL_MINI: string
  readonly VITE_APP_ID: string
  readonly VITE_PROXY: [string, string][]
}
