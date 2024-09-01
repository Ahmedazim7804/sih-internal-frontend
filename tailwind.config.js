/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                lexend: ["lexend", "sans-serif"],
            },
            dropShadow: {
                glow: ["0 0px 20px #ea580c", "0 0px 65px #ea580c"],
            },
        },
    },
    plugins: [],
};
