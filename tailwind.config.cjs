/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["index.html", "./src/**/*.{html,tsx,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
