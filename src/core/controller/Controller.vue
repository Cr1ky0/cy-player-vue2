<template>
  <div>
    <ControllerMask>
      <template v-for="(_, key) in filteredSlots" v-slot:[key]>
        <slot :name="key" />
      </template>
    </ControllerMask>
    <div
      :class="`cy-player-controller-container ${(mouseEnter || keepShow) && !videoStates.isPlayEnd ? 'cy-player-controller-active' : ''}`"
      :style="style"
      v-if="!videoStates.isError"
    >
      <!--    <ProgressBar>-->
      <!--      <template v-if="slots.slider" #slider>-->
      <!--        <slot name="slider"></slot>-->
      <!--      </template>-->
      <!--    </ProgressBar>-->
      <!--    <div class="cy-player-controller-controls-container">-->
      <!--      <Playback />-->
      <!--      <Controls />-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import ControllerMask from '@/core/controller/ControllerMask.vue';

export default {
  components: { ControllerMask },
  props: {
    mouseEnter: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDrag: false,
    };
  },
  inject: ['videoStates', 'options'],
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
