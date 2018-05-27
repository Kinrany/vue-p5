import VuePlugin from "rollup-plugin-vue";

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/vue-p5.js',
    format: 'cjs'
  },
  plugins: [VuePlugin()],
  external: ['p5']
}