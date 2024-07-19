<template>
  <div id="app">
    <CyPlayer
      v-if="toggle"
      :v-src="src"
      :width="width"
      :height="height"
      @player-mounted="handleMounted"
      @before-player-destroy="handleBeforeDestroy"
      @play="handlePlay"
      @time-change="handleTimeChange"
      @expose="getExposedData"
    >
      <!--      <template #playend>-->
      <!--        <div>playend</div>-->
      <!--      </template>-->
      <!--      <template #waiting>-->
      <!--        <div>waiting</div>-->
      <!--      </template>-->
      <!--    <template #paused>-->
      <!--      <div>paused</div>-->
      <!--    </template>-->
      <!--    <template #error>-->
      <!--      <div>error</div>-->
      <!--    </template>-->
      <!--    <template #slider>-->
      <!--      <div>123</div>-->
      <!--    </template>-->
      <!--    <template #customized>-->
      <!--      <div style="color:#FFF">123123</div>-->
      <!--    </template>-->
    </CyPlayer>
    <button @click="toggle = !toggle">卸载</button>
    <button @click="handleToast">Toast测试</button>
  </div>
</template>

<script>
import CyPlayer from '@/core/CyPlayer.vue';
import toastMixin from '@/core/mixin/toast';

export default {
  name: 'App',
  components: {
    CyPlayer,
  },
  mixins: [toastMixin],
  data() {
    return {
      exposedData: {
        videoElement: null,
        states: null,
        controller: null,
      },
      toggle: true,
      // src: 'https://cdn.pixabay.com/video/2024/03/31/206294_small.mp4?download',
      src: 'https://cdn.pixabay.com/video/2024/02/21/201308-915375262_small.mp4?download',
      themeColor: 'red',
      keepControllerShow: true,
      width: '1000',
      height: '650',

      // 测试选项
      options: {
        showToast: true,
        toastPlacement: 'center',
      },
    };
  },
  methods: {
    getExposedData(expose) {
      this.exposedData = expose;
    },
    handleMounted(v, c) {
      // console.log(v, c);
    },
    handleBeforeDestroy(v, c) {
      // console.log(v, c);
    },
    handlePlay(e) {
      // console.log(e);
    },
    handleTimeChange(e) {
      // console.log(e.currentPlayTime);
    },
    handleToast() {
      this.showToast('test');
    },
    handleProgressMouseDown(e) {
      console.log(e);
    },
  },
};
</script>

<style></style>
