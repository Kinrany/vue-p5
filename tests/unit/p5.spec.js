import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import p5 from '@/p5.vue'

let wrapper;

describe('p5', () => {
  beforeEach(() => {
    let localVue = createLocalVue()
    wrapper = mount(p5, {
      localVue,
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })


  it('should return exact computed events', () => {
    console.log(wrapper.vm.p5Events)
    expect(wrapper.vm.p5Events).toStrictEqual([
      'preload', 'setup',
      'draw', 'deviceMoved',
      'deviceTurned', 'deviceShaken',
      'keyPressed', 'keyReleased',
      'keyTyped', 'mouseMoved',
      'mouseDragged', 'mousePressed',
      'mouseReleased', 'mouseClicked',
      'doubleClicked', 'mouseWheel',
      'touchStarted', 'touchMoved',
      'touchEnded', 'windowResized'
    ])
  })


  xit('should return P5 constants', () => {
    /**
     * HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS
     */
  })

  xit('should return rest of structure events', () => {
    /**
     *
    preload() setup()
    draw() remove()
    disableFriendlyErrors
    noLoop() loop()
    isLooping() push()
    pop() redraw() p5()
     */
  });
  

  xit('should return all P5 classes', () => {
    /**
     * p5.Graphics
     * p5.MediaElement
     * p5.File
     * p5.Color
     * p5.Geometry
     * p5.Element
     * p5.TypedDict
     * p5.NumberDict
     * p5.Image
     * p5.Table
     * p5.TableRow
     * p5.PrintWriter
     * p5.XML
     * p5.Vector
     * p5.Font
     * p5.Shader
     * p5.Camera
     */
  });
  
})