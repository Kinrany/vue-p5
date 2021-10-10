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
    // console.log(wrapper.vm.p5Events)
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


  it('should return P5 constants', () => {
    /**
     * HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS
     */
    const mockComponent = {
      template: `
        <p5 @sketch="sketch"></p5>
      `,
      data() {
        return {
          skObj: null
        }
      },
      methods: {
        sketch(sk) {
          this.skObj = sk
        }
      }
    }

    const mockWrapper = mount(mockComponent, {
      components: {p5}
    })

    const data = mockWrapper.vm.skObj

    expect(data.HALF_PI).toStrictEqual(1.5707963267948966)
    expect(data.PI).toStrictEqual(3.141592653589793)
    expect(data.QUARTER_PI).toStrictEqual(0.7853981633974483)
    expect(data.TAU).toStrictEqual(6.283185307179586)
    expect(data.TWO_PI).toStrictEqual(6.283185307179586)
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