<template>
  <div
    id="cy-player-container"
    class="cy-player-container"
    ref="containerRef"
    :style="{ ...styles }"
  >
    <video
      class="cy-player"
      id="cy-player"
      ref="videoRef"
      :src="vSrc"
      :autoplay="autoPlay"
      muted
    >
      <source :src="vSrc" type="video/mp4" />
      <source :src="vSrc" type="video/webm" />
      <source :src="vSrc" type="video/ogg" />
      <source :src="vSrc" type="application/x-mpegURL" />
      <source :src="vSrc" type="application/vnd.apple.mpegURL" />
    </video>
    <BottomProgress
      v-if="showProgressFloat"
      :mouse-enter="mouseEnter"
    ></BottomProgress>
  </div>
</template>

<script>
import videoMixin from '@/core/mixin/video';
import sizeMixin from '@/core/mixin/size';
import mouseCheckMixin from '@/utils/mousecheck';
import defineProps from '@/core/defineProps';
import BottomProgress from '@/core/progress/BottomProgress.vue';

export default {
  name: 'CyPlayer',
  components: { BottomProgress },
  mixins: [defineProps, videoMixin, mouseCheckMixin, sizeMixin],
  methods: {
    handleSize() {
      this.setTotalSize(this.videoAutoFix);
    },
  },
  mounted() {
    // 初始化时没有宽高自动设定一个值，避免初始化加载error元素尺寸消失
    if (
      !this.width &&
      !this.height &&
      !this.styles?.height &&
      !this.styles?.width
    ) {
      const cElem = this.$refs.containerRef;
      cElem.style.width = `800px`;
      cElem.style.height = `450px`;
    }
    // video size auto fix
    if (this.videoAutoFix) {
      const vElement = this.$refs.videoRef;
      vElement.addEventListener('loadedmetadata', this.handleSize);
    }
  },
  beforeDestroy() {
    const vElement = this.$refs.videoRef;
    vElement.removeEventListener('loadedmetadata', this.handleSize);
  },
  provide() {
    return {
      videoStates: this.videoStates,
      videoController: this.videoController,
      setVideoStates: this.setVideoStates,
      options: {
        themeColor: this.themeColor,
        keepControllerShow: this.keepControllerShow,
      },
    };
  },
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
  position: relative;
  //overflow: hidden;
  background-color: #000;
  z-index: $top-layer;

  // TODO:Test Properties
  width: 1000px;
  height: 600px;
}

.cy-player {
  @include position(absolute, 50%, auto, auto, 50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
