//! 自定义指令
function touch (el,type,handler) {
  const hammer = new Hammer(el)
  hammer.on(type,handler)
}


export default function directiveHandler (Vue) {
  //! 移动端事件库
  Vue.directive('tap',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('press',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('pan',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('rotate',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('pinch',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('swipeleft',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('swiperight',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('swipeup',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
  Vue.directive('swipedown',{
    bind (el,binding) {
      touch(el,binding.name,binding.value)
    }
  })
}