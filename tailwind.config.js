import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors:{
                'cream': '#F5F7F8',
                'prismarine': '#379777',
                'link_blue': '#008AD8',
                'darkgray': '#45474B',
            },
            fontFamily: {
                sans: ['Public Sans'],
            },
            
        },
    },

    plugins: [forms],
};
