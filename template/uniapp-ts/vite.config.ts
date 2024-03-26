import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './src/utils/getEnv'
import { vitePlugins } from './src/utils/vitePlugins'
import { createProxy } from './src/utils/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env')
  const viteEnv = wrapperEnv(env)
  return {
    plugins: vitePlugins(),
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname)}/src`,
      },
    },
    envDir: 'env',
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
  }
})
