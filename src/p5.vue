<template>
  <div/>
</template>

<script>
import p5 from "p5/lib/p5.min.js";

export default {
  name: "VueP5",
  mounted() {
    const event_names = {
      preload: "preload",
      setup: "setup",
      draw: "draw",

      keyPressed: "keypressed",
      keyReleased: "keyreleased",
      keyTyped: "keytyped",

      mouseMoved: "mousemoved",
      mouseDragged: "mousedragged",
      mousePressed: "mousepressed",
      mouseReleased: "mousereleased",
      mouseClicked: "mouseclicked",
      doubleClicked: "doubleclicked",
      mouseWheel: "mousewheel",

      touchStarted: "touchstarted",
      touchMoved: "touchmoved",
      touchEnded: "touchended",

      deviceMoved: "devicemoved",
      deviceTurned: "deviceturned",
      deviceShaken: "deviceshaken",
    };

    new p5(sketch => {
      this.$emit("sketch", sketch);

      for (let p5EventName in event_names) {
        const vueEventName = event_names[p5EventName];
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
