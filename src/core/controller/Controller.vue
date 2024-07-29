<template>
  <div>
    <ControllerMask :change-is-drag="changeIsDrag">
      <template v-for="(_, key) in filteredSlots" v-slot:[key]>
        <slot :name="key" />
      </template>
    </ControllerMask>
    <div
      :class="`cy-player-controller-container ${(mouseEnter || keepShow) && !videoStates.isPlayEnd ? 'cy-player-controller-active' : ''}`"
      :style="style"
      v-if="!videoStates.isError"
    >
      <ProgressBar
        :change-is-drag="changeIsDrag"
        @progress-mouse-down="handleProgressMouseDown"
        @progress-mouse-up="handleProgressMouseUp"
        @progress-mouse-move="handleProgressMouseMove"
      >
        <template v-if="$slots.slider" #slider>
          <slot name="slider"></slot>
        </template>
      </ProgressBar>
      <div class="cy-player-controller-controls-container">
        <PlayBack />
        <Controls
          :container-ref="containerRef"
          :video-ref="videoRef"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ControllerMask from '@/core/controller/ControllerMask.vue';
import ProgressBar from '@/core/progress/ProgressBar.vue';
import PlayBack from '@/core/controls/PlayBack.vue';
import Controls from '@/core/controls/Controls.vue';

export default {
  components: { Controls, PlayBack, ProgressBar, ControllerMask },
  inject: ['videoStates', 'options'],
  props: {
    mouseEnter: {
      type: Boolean,
      required: true,
    },
    containerRef: HTMLDivElement,
    videoRef: HTMLVideoElement,
  },
  data() {
    return {
      isDrag: { value: false },
    };
  },
  methods: {
    handleProgressMouseDown() {
      this.$emit('progressMouseDown');
    },
    handleProgressMouseMove() {
      this.$emit('progressMouseMove');
    },
    handleProgressMouseUp() {
      this.$emit('progressMouseUp');
    },
    changeIsDrag(flag) {
      this.isDrag.value = flag;
    },
  },
  computed: {
    style() {
      return this.options.controllerStyles;
    },
    keepShow() {
      return this.options.keepControllerShow;
    },
    filteredSlots() {
      return Object.keys(this.$slots).reduce((acc, key) => {
        if (key !== 'slider') {
          acc[key] = this.$slots[key];
        }
        return acc;
      }, {});
    },
  },
  provide() {
    return {
      isDrag: this.isDrag,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/var';

.cy-player-controller-active {
  opacity: 1 !important;
}

.cy-player-controller-container {
  padding: 0 0.75rem;
  height: $controller-container-height;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: $top-layer;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.cy-player-controller-controls-container {
  width: 100%;
  height: $controls-height;
  display: flex;
  justify-content: space-between;
}
</style>
