/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#B02020',
                text: '#9ca3af',
                dark: '#313338',
                darker: '#2B2D31',
                darkest: '#1E1F22'
            }
        }
    },
    plugins: []
};
