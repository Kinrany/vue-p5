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

      keyPressed: "key-pressed",
      keyReleased: "key-released",
      keyTyped: "key-typed",

      mousePressed: "mouse-pressed",
      mouseReleased: "mouse-released",
      mouseClicked: "mouse-clicked",
      mouseMoved: "mouse-moved",
      mouseDragged: "mouse-dragged"
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
