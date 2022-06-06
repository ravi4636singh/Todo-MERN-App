module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
		    colors: {
			    'dark': '#0A0A0A',
                'gray': '#1B1B1B',
			    'pink': '#5C36B5',
			    'dark-pink': '#5C01B1'
		    },
            backgroundImage: {
                'front-image': 'url("/src/images/front-image.jpg")'
            }
	    },
    },
    plugins: [],
}
