'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var p5 = _interopDefault(require('p5'));

//

var script = {
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

const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "p5-container" } })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

const __vue_template__ = typeof __vue_render__ !== 'undefined'
  ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }
  : {};
/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(
  template, style, script$$1,
  scope, functional, moduleIdentifier,
  createInjector, createInjectorSSR
) {
  const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

  {
    component.__file = "D:\\Users\\Ruslan\\Projects\\Web\\vue-p5\\src\\p5.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component
}
/* style inject */
function __vue_create_injector__() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  const isOldIE =
    typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      let code = css.source;
      let index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        const el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts
          .filter(Boolean)
          .join('\n');
      } else {
        const textNode = document.createTextNode(code);
        const nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
        else style.element.appendChild(textNode);
      }
    }
  }
}
/* style inject SSR */


var P5Vue = __vue_normalize__(
  __vue_template__,
  __vue_inject_styles__,
  typeof __vue_script__ === 'undefined' ? {} : __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {},
  typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
)

module.exports = P5Vue;
