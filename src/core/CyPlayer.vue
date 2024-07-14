<template>
  <div id="cy-player-container" class="cy-player-container" ref="containerRef">
    <video :src="vSrc" class="cy-player" id="cy-player" ref="videoRef" controls>
      <source :src="vSrc" type="video/mp4" />
      <source :src="vSrc" type="video/webm" />
      <source :src="vSrc" type="video/ogg" />
      <source :src="vSrc" type="application/x-mpegURL" />
      <source :src="vSrc" type="application/vnd.apple.mpegURL" />
    </video>
  </div>
</template>

<script>
import videoMixin from '@/core/mixin/video';
import defineProps from '@/core/defineProps';

export default {
  name: 'CyPlayer',
  components: {},
  mixins: [defineProps, videoMixin],
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/var';
@import '@/assets/css/mixin';

.cy-player-container-web-fullscreen-active {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: $top-layer !important;
}

.cy-player-container {
  width: 1000px;
  height: 600px;
  position: relative;
  //overflow: hidden;
  background-color: #000;
  z-index: $top-layer;
}

.cy-player {
  @include position(absolute, 50%, auto, auto, 50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
