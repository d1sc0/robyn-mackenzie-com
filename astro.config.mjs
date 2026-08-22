import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://robynmackenzie.com',
  vite: {
    css: {
      devSourcemap: true,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  integrations: [
    mdx(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    sitemap(),
  ],
});
