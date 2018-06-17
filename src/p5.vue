<template>
  <div></div>
</template>

<script>
import p5 from "p5/lib/p5.min.js";

export default {
  name: "p5",
  mounted() {
    const event_names = {
      preload: "preload",
      setup: "setup",
      draw: "draw",

      keyPressed: "keypressed",
      keyReleased: "keyreleased",
      keyTyped: "keytyped",

      mousePressed: "mousepressed",
      mouseReleased: "mousereleased",
      mouseClicked: "mouseclicked",
      mouseMoved: "mousemoved",
      mouseDragged: "mousedragged"
    };

    new p5(sketch => {
      this.$emit("sketch", sketch);

      for (let p5EventName in event_names) {
        const vueEventName = event_names[p5EventName];
        const savedCallback = sketch[p5EventName];

        sketch[p5EventName] = () => {
          if (savedCallback) {
            savedCallback(sketch);
          }
          this.$emit(vueEventName, sketch);
        };
      }
    }, this.$el);
  }
};
</script>
