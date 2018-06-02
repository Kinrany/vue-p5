# vue-p5

[Vue](https://vuejs.org/) component for [p5.js](https://p5js.org/).

## Installation

### NPM

```bash
npm install --save vue vue-p5
```

`grunt-mocha` and `ajv` peer dependencies can be ignored, I think...

### Script tag

```html
<script src="https://unpkg.com/vue-p5@0.3.x"></script>
```

This will expose a global `VueP5` object.

## Examples

### Vue app

```html
<div id="app">
  <p5 :draw="sketch => sketch.background(255, 0, 0)"
      @mouse-clicked="console.log(`mouse clicked: ${$event}`)"></p5>
</div>
```

```javascript
import Vue from 'vue';
import VueP5 from 'vue-p5';

new Vue({
  el: '#app',
  components: {
    p5: VueP5
  }
});
```

### Other examples

Minimal CodePen example: https://codepen.io/Kinrany/pen/bKGYmP

Webpack project: [vue-p5-example](https://github.com/Kinrany/vue-p5-example/)

A game of Snake: [vue-p5-snake](https://github.com/Kinrany/vue-p5-snake/)

## FAQ

Can I pass component methods as props?

 - Yes, though it's discouraged by Vue community.
   
   `draw` and `setup` will become events in `0.4.x`.

## Versioning

This project adheres to [semver](https://semver.org/). Minor changes are breaking.

## License

LGPL-2.1

(same as p5.js)

## TODO

Actual docs.
