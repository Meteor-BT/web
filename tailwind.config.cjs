/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["index.html", "./src/**/*.{html,tsx,ts}"],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
