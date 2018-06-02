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
<script src="https://unpkg.com/vue-p5"></script>
```

This will expose a global `VueP5` object.

## Examples

### Vue app

```html
<div id="app">
  <vue-p5 @draw="draw" @key-pressed="keyPressed"></vue-p5>
</div>
```

```javascript
import Vue from 'vue';
import VueP5 from 'vue-p5';

new Vue({
  el: '#app',
  components: {
    'vue-p5': VueP5
  },
  methods: {
    draw(sketch) {
      sketch.background(255, 0, 0);
    },
    keyPressed({keyCode}) {
      let key = String.fromCharCode(keyCode);
      console.log(`key pressed: ${key}`);
    }
  }
});
```

### Other examples

Minimal CodePen example: https://codepen.io/Kinrany/pen/bKGYmP

Webpack project: [vue-p5-example](https://github.com/Kinrany/vue-p5-example/)

A game of Snake: [vue-p5-snake](https://github.com/Kinrany/vue-p5-snake/)

## FAQ

Feel free to ask questions in issues.

## Versioning

This project adheres to [semver](https://semver.org/). Minor changes are breaking.

## License

LGPL-2.1

(same as p5.js)

## TODO

Actual docs.
