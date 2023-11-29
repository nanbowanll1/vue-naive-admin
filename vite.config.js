import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { wrapperEnv, createProxy } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  return {
    plugins: [vue()],
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/variables.less";`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    }
  }
})
