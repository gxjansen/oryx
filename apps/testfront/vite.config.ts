import { join } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { viteConfig } from './vite.config.common.js';

export default defineConfig((config) => {
  return {
    root: viteConfig.index,
    envDir: viteConfig.root,
    envPrefix: viteConfig.envPrefix,
    build: {
      outDir: join(viteConfig.build.outDirRoot, viteConfig.build.index),
      emptyOutDir: true,
    },
    publicDir: '../../../libs/template/presets/public',
    plugins: [splitVendorChunkPlugin()],
  };
});