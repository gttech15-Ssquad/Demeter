// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/page-content/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         appBlack: "#0c0c0c",
//         cardBg: "#1a1a1f",
//         accentRed: "#c6453b",
//         accentRedSoft: "#6b2a24",
//         textSoft: "#b3b3b3",
//         textMuted: "#8b8b8b",
//       },
//       borderRadius: {
//         xl: "18px",
//       },
//     },
//   },
// };

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/page-content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appBlack: "#0c0c0c",
        cardBg: "#1a1a1f",
        accentRed: "#c6453b",
        accentRedSoft: "#6b2a24",
        textSoft: "#b3b3b3",
        textMuted: "#8b8b8b",
      },
      borderRadius: {
        xl: "18px",
      },
    },
  },
};
export default config;
