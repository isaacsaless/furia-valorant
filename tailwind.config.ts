import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'carteirinha': "url('/src/assets/carteirinha-bg.png')",
      },
      maxWidth: {
        '8xl': '96rem',
      },
      maxHeight: {
        'livestreamSize': '480px'
      },
      borderColor: {
        'gold': '#817d4f'
        // 'gold': '#daa520'
      },
      width: {
        '100': '400px' 
      },
      backgroundColor: {
        'card-bg': '#0c1017',
        'bottom-bg': '#141b26'
      }
    },
  },
  plugins: [
  ],
};
export default config;
