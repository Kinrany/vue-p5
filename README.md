# vue-p5
Vue component for p5.js

## Usage

### Installation

#### NPM

```bash
npm install --save vue vue-p5
```

See [vue-p5-example](https://github.com/Kinrany/vue-p5-example/) for a webpack project.

#### Script Tag

```html
<script src="https://unpkg.com/vue-p5@latest"></script>
```

This will expose a global `VueP5` object.

See [this CodePen example](https://codepen.io/Kinrany/pen/bKGYmP).

### Vue App

```html
<div id="app">
  <p5 :draw="(sketch) => sketch.background(255, 0, 0)"
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

See [Example.vue](https://github.com/Kinrany/vue-p5-example/blob/master/src/components/Example.vue) 
from [vue-p5-example](https://github.com/Kinrany/vue-p5-example/).

## License

LGPL-2.1

(same as p5.js)

## TODO

Actual docs.
