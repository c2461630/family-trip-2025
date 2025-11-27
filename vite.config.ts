import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // 告訴 Vite 這些模組是外部的，不要嘗試打包它們
      // 瀏覽器會在執行時透過 index.html 的 importmap 找到它們
      external: [
        'firebase/app',
        'firebase/firestore'
      ]
    }
  }
});
