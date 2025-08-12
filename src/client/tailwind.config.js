/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure it covers all your src files
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          '100%': { transform: 'translateY(0px) rotate(360deg)' },
        },
        sway: {
            '0%, 100%': { transform: 'translateX(-10px) rotate(-1deg)' },
            '50%': { transform: 'translateX(10px) rotate(1deg)' },
        },
        explode: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(5)', opacity: '0' },
        },
        flash: {
            '0%': { opacity: '1', transform: 'translate(-50%, 0)' },
            '100%': { opacity: '0', transform: 'translate(-50%, -50px)' },
        },
        fadeIn: {
            'from': { opacity: '0', transform: 'translateY(-20px)' },
            'to': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        explode: 'explode 0.5s forwards',
        flash: 'flash 1s forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
      }
    },
  },
  plugins: [],
}
