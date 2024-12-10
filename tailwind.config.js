/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class", // Active le mode sombre via la classe `dark`
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/css/forms.css", // Ajout de fichiers CSS spécifiques si nécessaire
  ],
  theme: {
    extend: {
      cursor: {
        "col-resize": "col-resize",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Couleurs personnalisées
        "tech-blue": "#007AFF",
        "tech-purple": "#5856D6",
        "tech-pink": "#FF2D55",
        "tech-green": "#34C759",
        "tech-grey": "#8E8E93",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Plugin pour les animations
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".touch-none": {
          "touch-action": "none",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
