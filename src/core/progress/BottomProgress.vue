<template>
  <div
    v-if="(!mouseEnter && !keepShow) || videoStates.isPlayEnd"
    class="cy-player-bottom-progress"
  >
    <div
      class="cy-player-bottom-progress-completed"
      :style="{
        width: `${completedProportion}%`,
        backgroundColor: themeColorStyle,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    mouseEnter: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  inject: ['videoStates', 'options'],
  computed: {
    themeColorStyle() {
      return this.options.themeColor;
    },
    keepShow() {
      return this.options.keepControllerShow;
    },
    completedProportion() {
      if (this.videoStates.duration !== 0)
        return (
          (this.videoStates.currentPlayTime / this.videoStates.duration) * 100
        );
      else return 0;
    },
  },
  mounted() {
    console.log(this.options.themeColor);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/css/mixin';
@import '@/assets/css/var';

$progress-base-color: rgba(255, 255, 255, 0.2);
$progress-buffered-color: rgba(255, 255, 255, 0.5);
$progress-indicator-time-color: rgba(0, 0, 0, 0.7);
$progress-slider-diameter: .7rem;
$progress-radius: .1rem;

.cy-player-bottom-progress {
  @include position(absolute, auto, 0, auto, 0);
  width: 100%;
  height: .2rem;
  background-color: transparent;
  z-index: $top-layer;
  cursor: default;
  animation: show 0.3s ease;

  .cy-player-bottom-progress-completed {
    @include position(absolute, 0, auto, auto, 0);
    width: 0;
    height: 100%;
    background-color: $default-theme-color;
    z-index: $second-top-layer;
  }
}
</style>
