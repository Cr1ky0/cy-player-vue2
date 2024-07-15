<template>
  <div class="cy-player-volume-slider-container" :style="styles">
    <div class="cy-player-volume-number">
      {{ Math.floor(videoStates.volume) }}
    </div>
    <div
      class="cy-player-volume-progress"
      ref="progressRef"
      @click="handleProgressClick"
    >
      <div class="cy-player-volume-base">
        <div
          class="cy-player-volume-slider"
          :style="{
            bottom: `${volumeProportion}%`,
            backgroundColor: `${themColorStyle}`,
          }"
        ></div>
        <div
          class="cy-player-volume-proportion"
          :style="{
            height: `${volumeProportion}%`,
            backgroundColor: `${themColorStyle}`,
          }"
        ></div>
      </div>
    </div>
    <SvgIcon
      v-if="showIcon"
      :styles="{ marginTop: '0.2rem' }"
      icon-name="volume"
      fill="#FFF"
      font-size="1.25rem"
    ></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '@/components/svgicon/SvgIcon.vue';
import mouseHandler from '@/core/mixin/mouse-handler';

export default {
  components: { SvgIcon },
  mixins: [mouseHandler],
  inject: ['videoController', 'videoStates', 'options'],
  props: {
    changeIsDrag: Function,
    styles: Object,
    showIcon: Boolean,
  },
  computed: {
    volumeProportion() {
      return this.videoStates.volume;
    },
    themColorStyle() {
      return this.options.themeColor;
    },
  },
  methods: {
    onMouseMove() {
      if (this.isDrag) this.videoController.setVolume(100 - this.yProp);
    },
    handleProgressClick() {
      this.videoController.setVolume(100 - this.yProp);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/var';

.cy-player-volume-slider-container {
  @include xCenterAlign(-110%);
  z-index: $top-layer;
  background-color: rgba(0, 0, 0, 0.8);
  height: 7.5rem;
  width: 2.5rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: show 0.3s ease;

  .cy-player-volume-number {
    color: #fff;
    font-size: 0.85rem;
    padding: 0.3rem 0;
  }

  .cy-player-volume-progress {
    @include childCenter;
    position: relative;
    height: 60%;
    width: 100%;
    cursor: pointer;

    .cy-player-volume-base {
      position: relative;
      width: 0.125rem;
      height: 100%;
      background-color: #fff;

      .cy-player-volume-slider {
        @include position(absolute, auto, 0, auto, 0);
        transform: translate(-40%, 50%);
        width: 0.5rem;
        height: 0.5rem;
        background-color: $default-theme-color;
        border-radius: 100%;
        cursor: pointer;
      }

      .cy-player-volume-proportion {
        @include position(absolute, auto, 0, auto, 0);
        width: 0.125rem;
        height: 0;
        background-color: $default-theme-color;
      }
    }
  }
}
</style>
