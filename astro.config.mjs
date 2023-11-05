import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://bitshala.github.io/website-v2",
  base: "",
  integrations: [tailwind(), react()],
});
