import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/admin_components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      textBlack: "#494F53",
      textLight: "#495053",
      error: "#f23a3a",
      borderColor: "#D2D7DC",
      dbBlack: "#1C2024",
      adminBg: "#f4f4f4",
      primary: "#3190E6",
      secondary: "#FF782C",
      white: "#fff",
    },
  },

  plugins: [],
};
export default config;
