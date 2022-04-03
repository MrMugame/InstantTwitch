import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'src',
    build: {
        rollupOptions: {
            input: {
                app: 'src/background.js',
            },
            output: {
                entryFileNames: 'background.js',
                dir: 'dist'
            }
        }
    }
})
