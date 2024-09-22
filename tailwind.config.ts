import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F7F7F7",
          dark: "#100D0E",
        },
        text: {
          light: "#231F20",
          dark: "#F3EED4",
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.light"),
            a: {
              color: theme("colors.blue.600"),
              "&:hover": {
                color: theme("colors.blue.800"),
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.text.light"),
              "margin-top": "1.5em",
              "margin-bottom": "0.5em",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.text.dark"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.text.dark"),
            },
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [typography],
};

export default config;
