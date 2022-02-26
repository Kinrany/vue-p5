<template>
  <div ref="sketchRef"></div>
</template>
<script>
import P5 from "p5/lib/p5.min.js";
import { defineComponent, onMounted, computed, ref } from 'vue'

const initialEvents = [
  'preload',
  'setup',
  'draw',

  'deviceMoved',
  'deviceTurned',
  'deviceShaken',

  'keyPressed',
  'keyReleased',
  'keyTyped',

  'mouseMoved',
  'mouseDragged',
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'doubleClicked',
  'mouseWheel',

  'touchStarted',
  'touchMoved',
  'touchEnded',

  'windowResized'
]

export default defineComponent({
  name: 'VueP5',
  emits: ['sketch', ...initialEvents.map(e => e.toLowerCase())],
  props: ['additionalEvents'],
  setup (props, { emit }) {
    const p5Events = computed(() => {
      if (Array.isArray(props.additionalEvents)) {
        return Array.from(new Set(props.additionalEvents))
      }
      return initialEvents
    })

    const sketchRef = ref()

    onMounted(() => {
      return new P5(sketch => {
        emit('sketch', sketch)
        for (const p5EventName of p5Events.value) {
          const vueEventName = p5EventName.toLowerCase()
          const savedCallback = sketch[p5EventName]

          sketch[p5EventName] = (...args) => {
            if (savedCallback) {
              savedCallback(sketch, ...args)
            }
            emit(vueEventName, sketch, ...args)
          }
        }
      }, sketchRef.value)
    })
    return {
      sketchRef,
      p5Events
    }
  }
})
</script>
