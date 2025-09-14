/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    }
  ]
}

export default config
