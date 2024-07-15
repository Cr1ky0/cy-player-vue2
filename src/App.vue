<template>
  <div id="app">
    <CyPlayer
      v-if="toggle"
      :v-src="src"
      :auto-play="autoPlay"
      :width="width"
      :height="height"
      @player-mounted="handleMounted"
      @before-player-destroy="handleBeforeDestroy"
      @play="handlePlay"
      @time-change="handleTimeChange"
      @expose="getExposedData"
    ></CyPlayer>
    <button @click="toggle = !toggle">卸载</button>
  </div>
</template>

<script>
import CyPlayer from '@/core/CyPlayer.vue';

export default {
  name: 'App',
  components: {
    CyPlayer,
  },
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
      autoPlay: true,
      themeColor: 'red',
      keepControllerShow: true,
      width: '1000',
      height: '650',
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
  },
};
</script>

<style></style>
