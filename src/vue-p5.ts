import P5 from "p5";
import { ref, defineComponent, onMounted, h } from "vue-demi";

const toLowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;

const p5EventNames = Object.freeze([
  "preload",
  "setup",
  "draw",

  "deviceMoved",
  "deviceTurned",
  "deviceShaken",

  "keyPressed",
  "keyReleased",
  "keyTyped",

  "mouseMoved",
  "mouseDragged",
  "mousePressed",
  "mouseReleased",
  "mouseClicked",
  "doubleClicked",
  "mouseWheel",

  "touchStarted",
  "touchMoved",
  "touchEnded",

  "windowResized"
] as const);

export default defineComponent({
  name: "VueP5",
  emits: ['sketch', ...p5EventNames.map(toLowerCase)],
  setup(_props, context) {
    const root = ref<unknown>(null);

    onMounted(() => {
      new P5((sketch: P5) => {
        context.emit("sketch", sketch);

        p5EventNames.forEach(<P5EventName extends typeof p5EventNames[number]>(p5EventName: P5EventName) => {
          const vueEventName = toLowerCase(p5EventName);
          const savedCallback = sketch[p5EventName];
          sketch[p5EventName] = (...args: Parameters<P5[P5EventName]>) => {
            if (savedCallback) {
              savedCallback.apply<P5, Parameters<P5[P5EventName]>, void>(sketch, args);
            }
            context.emit(vueEventName, sketch, ...args);
          };
        });
      }, root.value as HTMLElement);
    });

    return () => h('div', { ref: root });
  }
});
