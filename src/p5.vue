<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import p5 from "p5/lib/p5.min.js";

function distinct(arr: string[]) {
  return Array.from(new Set(arr));
}

const initialEvents: string[] = [
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

export default Vue.extend({
  // re-export p5 for use with other libraries
  // p5,
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
  methods: {
    extractEvents(sketch: object) {
      // emmiting with the new defined consts
      this.$emit("sketch", sketch, p5);

      for (const p5EventName of this.p5Events as string[]) {
        const vueEventName = p5EventName.toLowerCase();
        const savedCallback = sketch[p5EventName];
  
        sketch[p5EventName] = (...args) => {
          if (savedCallback) {
            savedCallback(sketch, ...args);
          }
          this.$emit(vueEventName, sketch, ...args);
        };
      }
    }
  },
  mounted() {
    new p5((sketch: object) => {
      this.extractEvents(sketch)
    }, this.$el);
  }
});
</script>
