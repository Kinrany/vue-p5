import VueP5 from "./p5";

export default VueP5;

// `typeof Vue !== 'undefined'` prevents
// the "Vue is not defined" error
if (typeof Vue !== 'undefined' && Vue) {
  Vue.component('vue-p5', VueP5);
}
