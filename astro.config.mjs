import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
   site: 'https://bitshala.github.io',
  base: '/my-repo',
  integrations: [tailwind()],
});
