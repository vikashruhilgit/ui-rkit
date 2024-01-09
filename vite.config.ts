import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import path, { resolve } from 'path'

console.log(path.resolve(__dirname));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: "lib", insertTypesEntry: true }),
    libInjectCss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'UirKit',
      fileName: 'ui-rkit',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
        },
      },
    },
  },
})
