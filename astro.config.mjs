// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite'; // ✅ 변경: Vite 플러그인 import
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSR 활성화

  // ✅ 변경: 배포/개발 환경 모두 Cloudflare 어댑터 사용 (조건문 제거 권장)
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),

  integrations: [
    // tailwind(), ❌ 삭제: 더 이상 integration 방식이 아님
    react()
  ],

  server: {
    host: '0.0.0.0',
    port: 4321,
  },

  site: 'https://humanerd.kr',

  vite: {
    plugins: [tailwindcss()], // ✅ 추가: Tailwind CSS v4 플러그인 등록

    server: {
      allowedHosts: ['humanerd.kr', 'www.humanerd.kr']
    },

    optimizeDeps: {
      exclude: ['@astrojs/compiler']
    },
    build: {
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 1000,
    }
  }
});