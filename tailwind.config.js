/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom romantic colors (brighter pinks)
        blush: "#FF8DAE",
        babyPink: "#FFAEC9",
        softWhite: "#FFF0F6",
        creamWhite: "#FFF5F9",
        rosePink: "#FF6692",
        romanticRed: "#FF1758",
        deepRose: "#E0115F",
        peach: "#FFC2C2",
        softCoral: "#FF5E85",
        textDark: "#3D1A2B",
        textLight: "#7D5267",
        hotPink: "#FF1493",
        brightPink: "#FF69B4",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '20px',
        '3xl': '32px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 8px 32px rgba(255, 107, 129, 0.12)",
        cardHover: "0 12px 48px rgba(255, 107, 129, 0.2)",
        glowPink: "0 0 40px rgba(255, 193, 204, 0.6)",
        glowRed: "0 0 60px rgba(255, 107, 129, 0.5)",
        textGlow: "0 0 20px rgba(255, 182, 193, 0.8)",
        glass: "0 4px 24px rgba(255, 182, 193, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        floatHeart: {
          "0%": { transform: "translateY(100vh) scale(0.5) rotate(-10deg)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-10vh) scale(1) rotate(10deg)", opacity: "0" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        equalizer: {
          "0%, 100%": { height: "20%" },
          "50%": { height: "80%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        rotateBorder: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 5s ease-in-out infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        floatHeart: "floatHeart 15s ease-in-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        pulseHeart: "pulseHeart 2s ease-in-out infinite",
        gradientShift: "gradientShift 20s ease infinite",
        spinSlow: "spinSlow 4s linear infinite",
        equalizer: "equalizer 1s ease-in-out infinite alternate",
        shimmer: "shimmer 3s linear infinite",
        bounceSoft: "bounceSoft 1.5s ease-in-out infinite",
        glowPulse: "glowPulse 6s ease-in-out infinite",
        rotateBorder: "rotateBorder 4s linear infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
