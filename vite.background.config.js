import { defineConfig } from 'vite'

export default defineConfig({
    root: 'src',
    build: {
        rollupOptions: {
            input: {
                app: 'src/background/background.js',
            },
            output: {
                entryFileNames: 'background.js',
                dir: process.env.IT_OUTPUT_PATH
            }
        }
    }
})
