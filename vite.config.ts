import { defineConfig } from 'vite';
import { resolve } from 'path';


export default defineConfig({
  root: './app',
  resolve: {
    alias: {
      "@test": resolve(__dirname, "./src/test"),
    },
  },
});