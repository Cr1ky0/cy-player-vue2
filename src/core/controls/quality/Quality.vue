<script>
import toastMixin from '@/core/mixin/toast';

export default {
  name: 'Quality',
  inject: ['options', 'videoStates', 'videoController', 'handleQualityChange'],
  mixins: [toastMixin],
  data() {
    return {
      chosenIndex: -1,
      showFunc: false,
    };
  },
  computed: {
    themeColorStyle() {
      return { color: this.options.themeColor };
    },
    qualities() {
      return this.options.quality.map((item) => item.src);
    },
    srcs() {
      return this.options.quality.map((item) => item.src);
    },
    chosenItem() {
      return this.qualities[this.chosenIndex];
    },
  },
  methods: {
    handleChangeQuality(index) {
      const curSrc = this.srcs[index];
      this.videoStates.curSrc = curSrc;
      this.chosenIndex = index;
      localStorage.setItem(
        'curPlayTime',
        String(this.videoStates.currentPlayTime),
      ); // 保证切换进度
      this.showToast(`切换至清晰度:${this.qualities[this.chosenIndex]}`);
      this.videoController.play();
      // 视频质量切换保存
      // if (playerOption.qualitySave) localStorage.setItem('curSrc', curSrc);
      // 视频切换回调
      this.handleQualityChange(this.qualities[index]);
    },
  },
  watch: {
    'videoStates.curSrc'() {
      // 优先选择chosen的
      this.chosenIndex = this.options.quality.findIndex((item) => {
        return item.chosen;
      });
      if (this.chosenIndex === -1) {
        // 根据url来判断选中颜色,quality中的src与curSrc相符的
        this.chosenIndex = this.options.quality.findIndex((item) => {
          return item.src === this.videoStates.curSrc;
        });
      }
    },
  },
};
</script>

<template>
  <div
    v-if="chosenIndex !== -1"
    class="cy-player-quality"
    @click="showFunc = !showFunc"
  >
    <div class="cy-player-quality-icon">
      {{ chosenItem }}
    </div>
    <div v-if="showFunc" class="cy-player-quality-function">
      <div
        v-for="(item, index) in qualities"
        :key="index"
        :style="index === chosenIndex ? themeColorStyle : ''"
        @click="handleChangeQuality(index)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="showFunc" class="cy-player-quality-bottom"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/mixin';
@import '@/assets/css/var';

.cy-player-quality {
  @include childCenter;
  @include selectable(none);
  position: relative;
  padding: 0 0.7rem;
  cursor: pointer;
  z-index: $top-layer;

  .cy-player-quality-icon {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .cy-player-quality-function {
    @include xCenterAlign(-110%);
    background-color: rgba(0, 0, 0, 0.8);
    width: 5rem;
    z-index: $top-layer;
    display: flex;
    flex-direction: column;
    border-radius: 0.2rem;
    overflow: hidden;
    animation: show 0.3s ease;

    > div {
      width: 100%;
      padding: 0.5rem 0;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .cy-player-quality-bottom {
    @include xCenterAlign(-100%);
    width: 100%;
    height: 1.25rem;
    background-color: transparent;
  }
}
</style>
