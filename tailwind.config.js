/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '640px',
			sm: '768px',
			md: '1024px',
			lg: '1440px',
			xl: '1536px',
			'2xl': '1920px',
		},
		extend: {
			colors: {
				primary: 'var(--bg-primary)',
			},
		},
	},
	plugins: [],
};
