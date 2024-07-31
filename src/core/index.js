import CyPlayer from './CyPlayer.vue'

// 一定要先给name赋值，这样后面的局部install和全局install方法才能读到同一个name
CyPlayer.name = 'cy-player'

// 为组件添加 install 方法，用于按需引入
// 如果想通过CDN方式引入，需要编写install函数
CyPlayer.install = function(Vue) {
  // 注册组件
  Vue.component('cy-player', CyPlayer)
}
export default CyPlayer;
