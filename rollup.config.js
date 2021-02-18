import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: 'src/vue-p5.js',
  output: {
    file: 'dist/vue-p5.js',
    format: 'umd',
    name: 'VueP5'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
