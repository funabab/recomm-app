module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    ['tailwindcss/nesting', 'postcss-nesting'],
    'postcss-hover-media-feature',
    'autoprefixer',
  ],
}
