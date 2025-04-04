import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bitshala.org",
  base: "/",
  integrations: [
    tailwind(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  redirects: {
    "/apply": "/cohorts",
    "/chaincodeboss":
      "https://chaincode.applytojob.com/apply/BE0IuAAsqT/Bitshala-Start-Your-Career-In-Bitcoin-Open-Source-2025",
  },
});
