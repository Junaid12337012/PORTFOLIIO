/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            boxShadow: {
                'glow-effect': '0 0 15px rgba(0, 150, 255, 0.8), 0 0 30px rgba(0, 150, 255, 0.6)', // Blue glow effect for the line
            },
            animation: {
                'line-load': 'line-load 2s ease-in-out forwards',
            },
            keyframes: {
                'line-load': {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' }, // Line grows to full width
                },
            },
        },
    },
  plugins: [],
}

