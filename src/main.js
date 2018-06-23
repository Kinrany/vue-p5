import VueP5 from "./p5.vue";

export default VueP5;

if (typeof Vue !== 'undefined' && Vue) {
  Vue.component('vue-p5', VueP5);
}