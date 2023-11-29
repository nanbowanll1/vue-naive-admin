import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  const { VITE_PROT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  return {
    plugins: [vue()],
    base: VITE_PUBLIC_PATH || '/'
  }
})
