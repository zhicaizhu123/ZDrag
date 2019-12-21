import Drag from './src/ZDrag'

export const ZDrag = Drag

const ZDragInstall = {}

ZDragInstall.install = function(Vue) {
  Vue.component('ZDrag', Drag)
}

export default ZDragInstall
