<template>
  <div></div>
</template>

<script>
import p5 from "p5/lib/p5.min.js";

export default {
  name: "p5",
  mounted() {
    const event_names = {
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
      for (let key in event_names) {
        let value = event_names[key];
        sketch[key] = () => this.$emit(value, sketch);
      }
    }, this.$el);
  }
};
</script>
