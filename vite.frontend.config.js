import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  root: 'src',
  plugins: [svelte()],
  build: {
    outDir: "../" + process.env.IT_OUTPUT_PATH
  }
})
