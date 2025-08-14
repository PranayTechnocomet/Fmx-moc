/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/utils/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                "punc-bg": "#f8f9fd",
                primary: {
                    175: "#0B1D64",
                    150: "#112E9F",
                    125: "#1334B3",
                    100: "#153AC7",
                    75: "#2C4ECD",
                    50: "#E8EBF9",
                    25: "#F3F4FB"
                },
                secondary: {
                    175: "#01000B",
                    150: "#02001C",
                    125: "#020027",
                    100: "#030037",
                    75: "#1C1A4B",
                    50: "#686687",
                    25: "#030037"
                },
                information: {
                    175: "#004280",
                    150: "#005CB3",
                    125: "#006ACC",
                    100: "#0084FF",
                    75: "#339DFF",
                    50: "#B3DAFF",
                    25: "#F2F8FF"
                },
                "punc-yellow": {
                    175: "#4A4015",
                    150: "#C6AA39",
                    125: "#DFC040",
                    100: "#F8D547",
                    75: "#F9DD6C",
                    50: "#FBE691",
                    25: "#FBE691"
                },
                // todo: add punc colors
                "punc-red": {
                    175: "#461519",
                    150: "#BA3943",
                    125: "#D1404C",
                    100: "#E84754",
                    75: "#ED6C76",
                    50: "#F4A3AA",
                    25: "#FDF5F6"
                },
                "punc-green": {
                    175: "#1E4A1E",
                    150: "#2CB32C",
                    125: "#33CC33",
                    100: "#4BE54B",
                    75: "#66FF66",
                    50: "#B3FFB3",
                    25: "#EBFFE5"
                },
                "punc-gray": {
                    175: "#1E1E1E",
                    150: "#333333",
                    125: "#4B4B4B",
                    100: "#666666",
                    75: "#808080",
                    50: "#B3B3B3",
                    25: "#EBEBEB"
                }
            }
        }
    },
    modules: true
}
