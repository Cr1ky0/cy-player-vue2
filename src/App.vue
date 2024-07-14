<template>
  <div id="app">
    <CyPlayer :v-src="src" :auto-play="autoPlay"></CyPlayer>
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
      // src: 'https://cdn.pixabay.com/video/2024/03/31/206294_small.mp4?download',
      src: 'https://cdn.pixabay.com/video/2024/02/21/201308-915375262_small.mp4?download',
      autoPlay: true,
      themeColor: 'red',
      keepControllerShow: true,
    };
  },
};
</script>

<style></style>
