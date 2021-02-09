# vue-p5

Create [p5.js](https://p5js.org/) instance as a [Vue](https://vuejs.org/) component.


## Quick start

### Script

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-p5"></script>

<div id="app">
  <vue-p5 v-on="this"></vue-p5>
</div>

<script>
new Vue({
  el: '#app',
  methods: {
    setup(sketch) {
      sketch.background('green');
      sketch.text('Hello p5!', 20, 20);
    }
  }
});
</script>
```

### NPM

```bash
npm install --save vue vue-p5
```

```javascript
import Vue from 'vue';
import VueP5 from 'vue-p5';

export default {
  methods: {
    setup(sketch) {
      sketch.background('green');
      sketch.text('Hello p5!', 20, 20);
    }
  },
  render(h) {
    return h(VueP5, {on: this});
  }
};
```

## Usage

### v-on object syntax

In the examples above `v-on="this"` and `{on: this}` are a short (and hacky) way to avoid handling every p5 event explicitly. You might want to be more explicit:

```html
<vue-p5 v-on="{setup, draw, keypressed}"></vue-p5>
<!-- which is equivalent to: -->
<vue-p5
    @setup="setup"
    @draw="draw"
    @keypressed="keypressed">
</vue-p5>
```

```javascript
on: {
  setup: this.setup,
  draw: this.draw,
  keypressed: this.keypressed
}
```

See also [`v-on` object syntax](https://vuejs.org/v2/api/#v-on).

### Events - p5 and Vue

Every [p5 event](https://p5js.org/reference/#group-Events) is exposed as a [Vue event](https://vuejs.org/v2/guide/events.html). The first argument is the sketch object used for drawing and everything else:

```javascript
methods: {
  draw(sk) {
    // draw a line between the previous
    // and the current mouse position
    sk.line(sk.pmouseX, sk.pmouseY, sk.mouseX, sk.mouseY);
  },
  keypressed(sk) {
    // convert the key code to its string
    // representation and print it
    const key = String.fromCharCode(sk.keyCode);
    sk.print(key);
  }
}
```

Using methods makes it possible to access the component data:

```javascript
// green background
data: {
  color: [0, 255, 0]
},
methods: {
  draw(sketch) {
    sketch.background(...this.color);
  }
}
```

#### Event names

Each event emitted by vue-p5 has the same name as the corresponding p5 event, but lowercase.

`mouseclicked`, not ~~`mouseClicked`~~.

#### Missing events

Currently all p5 events [are supported], but there is an escape hatch. For example, if `windowResized` was missing, its (lowercase) name could be passed to `additional-events` prop to make `vue-p5` aware of it:

```html
<vue-p5
  :additional-events="['windowresized']"
  @windowresized="windowresized"
></vue-p5>
```

Though please [let me know](#feedback) if you ever have to use this.

[are supported]: https://github.com/Kinrany/vue-p5/blob/master/src/p5.vue#L12-L38

### Importing existing sketches

In addition to p5 events, there's `@sketch`: an event for importing an existing p5 sketch written in [instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).

```html
<vue-p5 @sketch="sketch"></vue-p5>

<script>
new Vue({
  methods: {
    sketch(sk) {
      const clicks = [];

      sk.mouseClicked = () => {
        // save clicks to array
        clicks.push({ x: sk.mouseX, y: sk.mouseY });
      }

      sk.draw = () => {
        // draw a circle around each clicked position
        clicks.forEach(({ x, y }) => {
          sk.ellipse(x, y, 10, 10);
        });
      }
    }
  }
});
</script>
```

Remember to use arrow functions if you want `this` to refer to the component.

`@sketch` can be used in parallel with other events. Functions defined in the `@sketch` handler will always be called first.

## Examples

Hello world: [codepen](https://codepen.io/Kinrany/pen/ExaPeNg)

Webpack project: [vue-p5-example](https://github.com/Kinrany/vue-p5-example/)

A game of Snake: [vue-p5-snake](https://github.com/Kinrany/vue-p5-snake/)

## Feedback

Feedback is very welcome! Free to [open a new issue](https://github.com/Kinrany/vue-p5/issues/new) for any reason.

You can also [ping me on twitter](https://twitter.com/kinrany) or [write me an email](mailto:kinrany@yandex.com).

## Versioning

This project adheres to [semver](https://semver.org/). Major changes are breaking.

Use `vue-p5@next` to get a version with future updates.

## License

LGPL-2.1
