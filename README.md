# vue-p5

Create [p5.js](https://p5js.org/) instance as a [Vue](https://vuejs.org/) component.

```html
<div id="app">
  <vue-p5 v-on="this"></vue-p5>
</div>

<script>
new Vue({
  el: '#app',
  methods: {
    setup(sketch) {
      sketch.background('green');
      sketch.text('Hello p5!', 10, 10);
    }
  }
});
</script>
```


## Usage

There are two ways to use vue-p5.

1. Handle each p5 event separately:
   ```html
   <vue-p5 
       @setup="(sketch) => { sketch.background(0); }"
       @draw="(sketch) => {...}"
       @keypressed="(sketch) => {...}" >
   </vue-p5>
   ```
   You can also use [`v-on` object syntax](https://vuejs.org/v2/api/#v-on):`v-on="{setup, draw}"` to handle all events with Vue instance methods.  
   Or just `v-on="this"` if you feel lazy.

1. Use a [p5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) sketch:  
   ```html
   <vue-p5 @sketch="(sketch) => { sketch.setup = () => {...}; }"></vue-p5>
   ```

The first option is preferred. The second option is mostly for importing old p5 sketches. 

Both can be used at the same time. Functions defined in `@sketch` handler will be called first.

Note that in `@sketch` only arrow functions will be able to use `this`.

## Installation

### NPM

```bash
npm install --save vue vue-p5
```

`grunt-mocha` and `ajv` peer dependencies can be ignored, I think...

### Script tag

```html
<script src="https://unpkg.com/vue-p5@0.5.x"></script>
```

This will expose the component as a global `VueP5` object.

## Examples

### Vue app

This app fill the canvas with red color and also print every key press in console.

```html
<div id="app">
  <vue-p5 @draw="draw" @key-pressed="keypressed"></vue-p5>
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
    keypressed({keyCode}) {
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

Feel free to ask anything in [issues](https://github.com/Kinrany/vue-p5/issues)!

## Versioning

This project adheres to [semver](https://semver.org/). Minor changes are breaking.

## License

LGPL-2.1

(same as p5.js)

## TODO

Actual docs.
