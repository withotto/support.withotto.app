import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                accent: {
                    '50': '#f5f5f9',
                    '100': '#e7e8f2',
                    '200': '#d5d6e8',
                    '300': '#b8bbd8',
                    '400': '#9699c4',
                    '500': '#7c7cb5',
                    '600': '#6e6aa6',
                    '700': '#635c93',
                    '800': '#58517c',
                    '900': '#484464',
                    '950': '#2e2c3f',
                },
                gray: {
                    100: '#f5f6f8',
                    200: '#eceef2',
                    300: '#c0c2c7',
                    400: '#888b96',
                    500: '#545861',
                    700: '#353841',
                    800: '#24272f',
                    900: '#17181c'
                }
            },
        },
    },
    plugins: [
        starlightPlugin(),
    ],
}
