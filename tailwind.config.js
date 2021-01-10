module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'aqua-llama': '#7CC9B4',
        'soft-llama-pink': '#e4c3c3',
        'calma-llama': '#4b31a1',
        'violet-llama': '#7e7192',
        'darth-llama': '#00140F',
        'bookface': '#3b5998',
        'chic-tweetz': '#1DA1F2',
        'linked': '#0072b1',
        'pints': '#C92228'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

