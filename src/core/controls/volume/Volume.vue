<script>
import SvgIcon from '@/components/svgicon/SvgIcon.vue';
import VolumeSlider from '@/core/controls/volume/VolumeSlider.vue';
import toastMixin from '@/core/mixin/toast';
import mouseCheckMixin from '@/utils/mousecheck';

export default {
  name: 'Volume',
  components: { VolumeSlider, SvgIcon },
  mixins: [toastMixin, mouseCheckMixin],
  inject: ['videoStates', 'videoController', 'options'],
  data() {
    return {
      isDrag: false,
    };
  },
  computed: {
    isMuted() {
      return this.videoStates.volume === 0;
    },
  },
  methods: {
    handleIconClick() {
      if (!this.isMuted) {
        this.videoController.setVolume(0);
        this.showToast('已开启静音');
      } else {
        const lastVolume = localStorage.getItem('lastVolume');
        if (lastVolume) this.videoController.setVolume(parseInt(lastVolume));
        else this.videoController.setVolume(50);
        this.showToast('已关闭静音');
      }
    },
    changeIsDrag(value) {
      this.isDrag = value;
    },
  },
};
</script>

<template>
  <div
    v-if="!isMobile"
    class="cy-player-volume-controller-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="cy-player-volume-icon" @click="handleIconClick">
      <SvgIcon
        v-if="!isMuted"
        icon-name="volume"
        fill="rgba(255,255,255,.9)"
        font-size="1.25rem"
      ></SvgIcon>
      <SvgIcon
        v-else
        icon-name="mute"
        fill="rgba(255,255,255,.9)"
        font-size="1.25rem"
      ></SvgIcon>
    </div>
    <VolumeSlider
      v-if="mouseEnter || isDrag"
      :changeIsDrag="changeIsDrag"
    ></VolumeSlider>
    <div v-if="mouseEnter || isDrag" class="cy-player-volume-bottom"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/mixin';
@import '@/assets/css/var';

.cy-player-volume-controller-container {
  @include selectable(none);
  height: 100%;
  position: relative;
  cursor: pointer;
  padding: 0 0.7rem;

  .cy-player-volume-icon {
    @include childCenter();
    width: 100%;
    height: 100%;
  }

  .cy-player-volume-bottom {
    @include xCenterAlign(-100%);
    width: 2.5rem;
    height: 0.9rem;
    background-color: transparent;
    z-index: $top-layer;
  }
}
</style>
