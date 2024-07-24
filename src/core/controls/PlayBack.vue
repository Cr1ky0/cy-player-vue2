<template>
  <div class="cy-player-playback-controls-container">
    <div class="cy-player-playback-controls-btn" @click="handleClick">
      <SvgIcon
        v-if="!videoStates.isPlay"
        icon-name="player"
        fill="#FFF"
        font-size="1.25rem"
      ></SvgIcon>
      <SvgIcon
        v-else
        icon-name="pause"
        fill="#FFF"
        font-size="1.25rem"
      ></SvgIcon>
    </div>
    <div class="cy-player-playback-controls-time">
      <div>{{ curTime }}</div>
      <div>&nbsp;/&nbsp;</div>
      <div>{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/svgicon/SvgIcon.vue';
import { formatTime } from '@/utils';

export default {
  components: { SvgIcon },
  inject: ['videoStates', 'videoController'],
  computed: {
    curTime() {
      return formatTime(Math.floor(this.videoStates.currentPlayTime));
    },
    duration() {
      return !this.videoStates.isError
        ? formatTime(Math.floor(this.videoStates.duration))
        : formatTime(0);
    },
  },
  methods: {
    handleClick() {
      if (this.videoStates.isPlay) this.videoController.pause();
      else this.videoController.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/var';

.cy-player-playback-controls-container {
  @include selectable(none);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .cy-player-playback-controls-btn {
    @include childCenter;
    padding: 0 0.7rem;
    height: 100%;
    cursor: pointer;
  }

  .cy-player-playback-controls-time {
    display: flex;
    justify-content: center;
    color: #fff;
    line-height: $controls-height;
    padding: 0 0.7rem;

    & > div {
      font-size: 0.85rem;
    }
  }
}
</style>
