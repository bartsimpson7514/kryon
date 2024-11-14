/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1352px",
      },
    },

    backdropBlur: {
      sm: "6px",
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    extend: {
      screens: {
        "min-xl": "1450px",
      },
      borderRadius: {
        "4xl": "1.75rem",
      },
      fontSize: {
        14: ["0.875", "1.138rem"],
        16: ["1rem", "1.4rem"],
        "16-24": ["1rem", "1.5rem"],
        18: ["1.125rem", "1.575rem"],
        24: ["1.5rem", "1.8rem"],
        "36-46": ["2.25rem", "2.925rem"],
      },
      colors: {
        "white-v": {
          "001": "rgba(255, 255, 255, 0.01)",
          "04": "rgba(255, 255, 255, 0.04)",
          "03": "rgba(255, 255, 255, 0.32)",
          16: "rgba(255, 255, 255, 0.16)",
          "008": "rgba(255, 255, 255, 0.08)",
          24: "rgba(255, 255, 255, 0.24)",
          50: "#FAFAF9",
          600: "rgba(255, 255, 255, 0.66)",
          900: "rgba(255, 255, 255, 0.90)",
          500: "rgba(255, 255, 255, 0.50)",
        },
        mustard: {
          800: "#E19430",
        },
        yellow: {
          10: "rgba(226, 206, 44, 0.10)",
          16: "rgba(255, 230, 0, 0.16)",
          40: "rgba(255, 230, 0, 0.4)",
          300: "#FFF7BC",
          400: "#FFF291",
        },
        brown: {
          800: "#86540A",
        },
        green: {
          100: "#B4FF99",
          900: "#0A8659",
        },
        error: "#FFB299",
        dark: {
          "040": "rgba(0, 0, 0, 0.48)",
          50: "#141110",
          100: "#1C1917",
          900: "#0C0A09",
          18: "#181818",
          10: "#101010",

          text: {
            50: "#0C0A09",
            400: "#57534E",
            600: "rgba(255, 255, 255, 0.66)",
            500: "#78716C",
            700: "#D6D3D1",
            950: "#FFFFFF",
          },
        },
        dimgrey: "rgba(230,227,222,0.34)",
        light: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          900: "#FFFFFF",

          text: {
            50: "#FFFFFF",
            400: "#A8A29E",
            500: "#78716C",
            600: "rgba(255, 255, 255, 0.66)",
            700: "#44403C",
            950: "#0C0A09",
          },
        },
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        nyght: ["var(--font-nyght-serif)"],
      },
      boxShadow: {
        mustard100: "0px 0px 0px 3px rgba(225, 143, 48, 0.24)",
        mustard240: "0px 2px 16px 0px rgba(226, 178, 46, 0.24)",
        mustard250:
          "0px 2px 16px 0px rgba(226, 178, 46, 0.24), 1px 1px 3px 0px #E09130 inset",
        "black-04": "0px 2px 2px 0px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        noiseImage: "url('/assets/images/noise.png')",
        dotsImage: "url('/assets/icons/dots.svg')",
        mustardGradient: "linear-gradient(97deg, #E2D02C 0%, #E18F30 100%)",
        mustardGradientReverse:
          "linear-gradient(97deg, #E18F30 0%, #E2D02C 100%)",
      },
      transitionDuration: {},
      backgroundPosition: {},
      backdropFilter: {
        "card-filter": "blur(17.600000381469727px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scale: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: 0,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scale: "scale 1s ease-out",
        fadeIn: "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function ({ addVariant }: any) {
      addVariant("strong-child", "& > * > strong")
      addVariant("para-child", "& > p")
      addVariant("anchor-child", "& > * > a")
      addVariant("child-hover", "& > *:hover")
    },
  ],
}
