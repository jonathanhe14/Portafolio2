/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}', // Añade aquí las extensiones que utilices
	],
	theme: {
	  extend: {
		colors: {
		  'primario': '#1F2D35 ',
		  'secundario': '#2B3F46 ',
		  'complementario': '#DBFF79',
		},
		keyframes: {
			pulseDot: {
			  '0%, 100%': { transform: 'scale(1)', opacity: '1' },
			  '50%': { transform: 'scale(1.5)', opacity: '0.5' },
			},
		  },
		  animation: {
			pulseDot: 'pulseDot 1s infinite',
		  },
	  },
	},
	plugins: [],
  };
  