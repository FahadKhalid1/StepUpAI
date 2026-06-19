/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // iOS / Apple system typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      // iOS continuous-style corners (slightly larger than Tailwind defaults)
      borderRadius: {
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.25rem', // 20px
        '3xl': '1.75rem', // 28px
      },
      // iOS-style soft, diffuse, low-opacity layered shadows
      boxShadow: {
        sm: '0 1px 2px 0 rgba(17, 24, 39, 0.04)',
        DEFAULT: '0 1px 3px 0 rgba(17, 24, 39, 0.06), 0 1px 2px -1px rgba(17, 24, 39, 0.04)',
        md: '0 4px 10px -2px rgba(17, 24, 39, 0.06), 0 2px 6px -2px rgba(17, 24, 39, 0.04)',
        lg: '0 12px 28px -8px rgba(17, 24, 39, 0.10), 0 6px 12px -6px rgba(17, 24, 39, 0.05)',
        xl: '0 24px 44px -12px rgba(17, 24, 39, 0.12), 0 10px 20px -10px rgba(17, 24, 39, 0.06)',
        '2xl': '0 36px 70px -18px rgba(17, 24, 39, 0.18), 0 14px 28px -14px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [],
};
