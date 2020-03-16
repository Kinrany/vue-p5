<template>
  <div></div>
</template>

<script>
import p5 from "p5/lib/p5.min.js";

function distinct(arr) {
  return Array.from(new Set(arr));
}

const initialEvents = [
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
];

export default {
  // re-export p5 for use with other libraries
  p5,

  name: "VueP5",
  props: ["additionalEvents"],
  computed: {
    p5Events() {
      const { additionalEvents } = this;
      return Array.isArray(additionalEvents)
        ? distinct(initialEvents.concat(additionalEvents))
        : initialEvents;
    }
  },
  mounted() {
    new p5(sketch => {
      this.$emit("sketch", sketch);

      for (const p5EventName of this.p5Events) {
        const vueEventName = p5EventName.toLowerCase();
        const savedCallback = sketch[p5EventName];

        sketch[p5EventName] = (...args) => {
          if (savedCallback) {
            savedCallback(sketch, ...args);
          }
          this.$emit(vueEventName, sketch, ...args);
        };
      }
    }, this.$el);
  }
};
</script>
