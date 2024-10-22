<template>
  <div
    id="cy-player-container"
    class="cy-player-container"
    ref="containerRef"
    :style="{ ...styles }"
  >
    <video class="cy-player" id="cy-player" ref="videoRef" :src="vSrc">
      <source :src="vSrc" type="video/mp4" />
      <source :src="vSrc" type="video/webm" />
      <source :src="vSrc" type="video/ogg" />
      <source :src="vSrc" type="application/x-mpegURL" />
      <source :src="vSrc" type="application/vnd.apple.mpegURL" />
    </video>
    <Controller
      v-if="showController"
      :mouse-enter="mouseEnter"
      :show-controller="showController"
      @quality-change="handleQualityChange"
      @progress-mouse-down="handleProgressMouseDown"
      @progress-mouse-up="handleProgressMouseUp"
      @progress-mouse-move="handleProgressMouseMove"
    >
      <template v-for="(_, key) in $slots" v-slot:[key]>
        <slot :name="key" />
      </template>
    </Controller>
    <BottomProgress
      v-if="showProgressFloat"
      :mouse-enter="mouseEnter"
    ></BottomProgress>
  </div>
</template>

<script>
import videoMixin from '@/core/mixin/video';
import sizeMixin from '@/core/mixin/size';
import callbackMixin from '@/core/mixin/callback';
import mouseCheckMixin from '@/utils/mousecheck';
import defineProps from '@/core/defineProps';
import BottomProgress from '@/core/progress/BottomProgress.vue';
import Controller from '@/core/controller/Controller.vue';
import '@/assets/icons';

export default {
  name: 'CyPlayer',
  components: { Controller, BottomProgress },
  mixins: [defineProps, videoMixin, mouseCheckMixin, sizeMixin, callbackMixin],
  data() {
    return {
      containerRef: { value: null },
      videoRef: { value: null },
      options: {
        themeColor: this.themeColor,
        keepControllerShow: this.keepControllerShow,
        controllerStyles: this.controllerStyles,
        maskIconPlacement: this.maskIconPlacement,
        customizedItemPlacement: this.customizedItemPlacement,
        toastPlacement: this.toastPlacement,
        showToast: this.showToast,
        quality: this.quality,
        isSettingShow: this.isSettingShow,
        isPicInPicShow: this.isPicInPicShow,
        isWebScreenFullShow: this.isWebScreenFullShow,
        isScreenFullShow: this.isScreenFullShow,
        isMultiplePlayShow: this.isMultiplePlayShow,
      },
    };
  },
  methods: {
    handleQualityChange(quality) {
      this.$emit('qualityChange', quality);
    },
    handleSize() {
      this.setTotalSize(this.videoAutoFix);
    },
    handleProgressMouseDown() {
      this.$emit('progressMouseDown', this.videoStates);
    },
    handleProgressMouseMove() {
      this.$emit('progressMouseMove', this.videoStates);
    },
    handleProgressMouseUp() {
      this.$emit('progressMouseUp', this.videoStates);
    },
  },
  mounted() {
    // 初始化Ref
    this.containerRef.value = this.$refs.containerRef;
    this.videoRef.value = this.$refs.videoRef;
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
    // mounted事件
    this.$emit('player-mounted', this.$refs.videoRef, this.$refs.containerRef);
    // expose
    this.$emit('expose', {
      videoElement: this.$refs.videoRef,
      states: this.videoStates,
      controller: this.videoController,
    });
  },
  beforeDestroy() {
    const vElement = this.$refs.videoRef;
    vElement.removeEventListener('loadedmetadata', this.handleSize);
    // before destroy
    this.$emit(
      'before-player-destroy',
      this.$refs.videoRef,
      this.$refs.containerRef,
    );
  },
  watch: {
    width() {
      this.setTotalSize();
    },
    height() {
      this.setTotalSize();
    },
  },
  provide() {
    return {
      videoStates: this.videoStates,
      videoController: this.videoController,
      setVideoStates: this.setVideoStates,
      options: this.options,
      handleQualityChange: this.handleQualityChange,
      containerRef: this.containerRef,
      videoRef: this.videoRef,
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
