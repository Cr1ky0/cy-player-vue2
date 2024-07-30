<template>
  <div class="cy-player-progress-bar" ref="progressRef">
    <div
      v-if="mouseEnter"
      class="cy-player-progress-indicator"
      :style="{ left: `${xProp}%` }"
    >
      <div class="cy-player-progress-indicator-time">
        {{ moveVideoTime }}
      </div>
      <div
        class="cy-player-progress-indicator-down"
        :style="{ borderTopColor: themeColor }"
      ></div>
      <div
        class="cy-player-progress-indicator-up"
        :style="{ borderBottomColor: themeColor }"
      ></div>
    </div>
    <Transition>
      <div
        v-if="$slots.slider"
        v-show="showSlider || isDrag"
        class="cy-player-progress-slider-base"
        :style="{
          left: `${completedProportion}%`,
        }"
      >
        <slot name="slider"></slot>
      </div>
      <div
        v-else
        v-show="showSlider || isDrag"
        class="cy-player-progress-slider-base cy-player-progress-slider"
        :style="{
          left: `${completedProportion}%`,
          backgroundColor: themeColor,
        }"
      ></div>
    </Transition>
    <div
      class="cy-player-progress-completed"
      :style="{ width: `${completedProportion}%`, backgroundColor: themeColor }"
    ></div>
    <div
      class="cy-player-progress-buffered"
      :style="{ width: `${bufferedProportion}%` }"
    ></div>
  </div>
</template>

<script>
import mouseHandlerMixin from '@/core/mixin/mouse-handler';
import { formatTime } from '@/utils';

export default {
  inject: {
    videoStates: 'videoStates',
    videoController: 'videoController',
    progressDrag: 'isDrag',
    options: 'options',
  },
  mixins: [mouseHandlerMixin],
  props: {
    changeIsDrag: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showSlider: false,
      timer: null,
    };
  },
  computed: {
    themeColor() {
      return this.options.themeColor;
    },
    completedProportion() {
      if (this.videoStates.duration !== 0)
        return (
          (this.videoStates.currentPlayTime / this.videoStates.duration) * 100
        );
      else return 0;
    },
    bufferedProportion() {
      if (this.videoStates.duration !== 0)
        return (
          (this.videoStates.bufferedTime / this.videoStates.duration) * 100
        );
      else return 0;
    },
    moveVideoTime() {
      return formatTime(
        Math.floor((this.xProp / 100) * this.videoStates.duration),
      );
    },
    moveTime() {
      return (this.xProp / 100) * this.videoStates.duration;
    },
  },
  methods: {
    onMouseDown() {
      // this.videoController.pause();
      this.videoController.setCurTime(this.moveTime);
      // 用户指定回调
      this.$emit('progressMouseDown');
    },
    onMouseMove() {
      if (this.isDrag) {
        // 不让100%进度状态设置以免视频处于播放结束状态拖动时出现bug
        if (this.xProp < 100) this.videoController.setCurTime(this.moveTime);
        // 用户指定回调
        this.$emit('progressMouseMove');
      }
    },
    onMouseUp() {
      if (this.isDrag && !this.videoStates.isPlayEnd) {
        this.videoController.play();
        // 用户指定回调
        this.$emit('progressMouseUp');
      } // 拖动任务中再执行，以免全局执行
    },
  },
  watch: {
    mouseEnter() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showSlider = this.mouseEnter;
      }, 200);
    },
    isDrag() {
      this.changeIsDrag(this.isDrag);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/var';

$progress-base-color: rgba(255, 255, 255, 0.3);
$progress-buffered-color: rgba(255, 255, 255, 0.5);
$progress-indicator-time-color: rgba(0, 0, 0, 0.7);
$progress-slider-diameter: 0.7rem;
$progress-radius: 0.1rem;

.cy-player-progress-bar {
  width: 100%;
  height: $progress-bar-height;
  position: relative;
  background-color: $progress-base-color;
  z-index: $top-layer;
  border-radius: $progress-radius;
  cursor: pointer;

  .cy-player-progress-indicator {
    @include selectable(none);
    height: 100%;
    width: 0;
    position: relative;
    z-index: $second-top-layer;
    cursor: default;

    .cy-player-progress-indicator-time {
      @include position(absolute, 0, auto, auto, 0);
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.15rem;
      font-size: 0.75rem;
      text-align: center;
      background-color: $progress-indicator-time-color;
      color: #fff;
      transform: translate(-50%, -175%);
    }

    .cy-player-progress-indicator-down {
      @include position(absolute, 0, auto, auto, 0);
      transform: translate(-50%, -200%);
      width: 0;
      height: 0;
      border-left: 0.3rem solid transparent;
      border-right: 0.3rem solid transparent;
      border-top: 0.3rem solid $default-theme-color; /* Change the color and size as needed */
    }

    .cy-player-progress-indicator-up {
      @include position(absolute, auto, 0, auto, 0);
      transform: translate(-50%, 200%);
      width: 0;
      height: 0;
      border-left: 0.3rem solid transparent;
      border-right: 0.3rem solid transparent;
      border-bottom: 0.3rem solid $default-theme-color; /* 你可以更改颜色 */
    }
  }

  .cy-player-progress-completed {
    @include position(absolute, 0, auto, auto, 0);
    width: 0;
    height: 100%;
    background-color: $default-theme-color;
    z-index: $second-top-layer;
    border-radius: $progress-radius;
  }

  .cy-player-progress-slider-base {
    @include position(absolute, 50%, auto, auto, 0);
    transform: translate(-50%, -50%);
    z-index: $top-layer;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .cy-player-progress-slider {
    height: $progress-slider-diameter;
    width: $progress-slider-diameter;
    background-color: $default-theme-color;
    border-radius: 100%;
  }

  /* Vue 2 过渡效果 */
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-to,
  .v-leave {
    opacity: 1;
  }

  .cy-player-progress-buffered {
    @include position(absolute, 0, auto, auto, 0);
    width: 0;
    height: 100%;
    background-color: $progress-buffered-color;
    z-index: $middle-layer;
    border-radius: $progress-radius;
  }
}
</style>
