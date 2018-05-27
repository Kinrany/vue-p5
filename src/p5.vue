<template>
  <div id="p5-container"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "p5",
  props: {
    draw: {
      type: Function,
      required: true
    },
    state: null, // null matches any type
    setup: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return { sketch: null };
  },
  methods: {
    filterByKeys(obj, keys) {
      return keys.reduce(
        (acc, key) => Object.assign(acc, { [key]: obj[key] }),
        {}
      );
    }
  },
  mounted() {
    new p5(
      sketch =>
        Object.assign(sketch, {
          setup: () => this.setup(sketch),
          draw: () => {
            this.$emit("update");
            this.draw(sketch, this.state);
          },

          keyPressed: () => this.$emit("key-pressed", sketch.keyCode),
          keyReleased: () => this.$emit("key-released", sketch.keyCode),
          keyTyped: () => this.$emit("key-typed", sketch.key),

          mousePressed: () => this.$emit("mouse-pressed", sketch.mouseButton),
          mouseReleased: () => this.$emit("mouse-released", sketch.mouseButton),
          mouseClicked: () => this.$emit("mouse-clicked", sketch.mouseButton),
          mouseMoved: () =>
            this.$emit(
              "mouse-moved",
              this.filterByKeys(sketch, [
                "mouseX",
                "mouseY",
                "pmouseX",
                "pmouseY"
              ])
            ),
          mouseDragged: () =>
            this.$emit(
              "mouse-dragged",
              this.filterByKeys(sketch, [
                "mouseX",
                "mouseY",
                "pmouseX",
                "pmouseY"
              ])
            )
            
        }),
      "p5-container"
    );
  }
};
</script>
