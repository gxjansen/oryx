import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../dist/libs/content',
    emptyOutDir: false,
    lib: {
      entry: 'index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
  },
  plugins: [
    tsconfigPaths({ root: '../../' }),
    copy({
      targets: [
        { src: ['package.json', '*.md'], dest: '../../dist/libs/content' },
      ],
    }),
  ],
});