<template>
  <div class="cy-player-controller-controls">
    <Quality v-if="hasQuality"/>
    <MultiplePlay v-if="showMultiplePlay" :video-ref="videoRef" />
    <Volume />
    <Setting v-if="showSetting" />
    <ControlTool
      v-if="showPicInPic"
      active-icon-name="inPicture"
      :flag="true"
      tip="画中画"
      @click="togglePictureInPicture"
    />
    <ControlTool
      v-if="showWebScreenFull"
      active-icon-name="closeWebFullScreen"
      inactive-icon-name="webFullScreen"
      :flag="isWebScreenFull"
      tip="网页全屏"
      @click="toggleWebScreenFull"
    />
    <ControlTool
      v-if="showScreenFull"
      active-icon-name="closeFullScreen"
      inactive-icon-name="fullScreen"
      :flag="isScreenFull"
      tip="全屏"
      @click="toggleScreenFull"
    />
  </div>
</template>

<script>
import webScreenFullMixin from '@/core/mixin/web-screen-full';
import picInPicMixin from '@/core/mixin/pic-in-pic';
import sizeMixin from '@/core/mixin/size';
import screenFullMixin from '@/core/mixin/screen-full';
import ControlTool from '@/components/controltool/ControlTool.vue';
import Setting from '@/core/controls/setting/Setting.vue';
import Volume from '@/core/controls/volume/Volume.vue';
import MultiplePlay from '@/core/controls/multiple/MultiplePlay.vue';
import Quality from '@/core/controls/quality/Quality.vue';

export default {
  components: { Quality, MultiplePlay, Volume, Setting, ControlTool },
  inject: ['options', 'videoStates'],
  props: {
    containerRef: HTMLDivElement,
    videoRef: HTMLVideoElement,
  },
  mixins: [webScreenFullMixin, picInPicMixin, sizeMixin, screenFullMixin],
  computed: {
    hasQuality() {
      return this.options.quality && this.options.quality.length > 0;
    },
    showSetting() {
      return this.options.isSettingShow;
    },
    showPicInPic() {
      return this.options.isPicInPicShow;
    },
    showWebScreenFull() {
      return this.options.isWebScreenFullShow;
    },
    showScreenFull() {
      return this.options.isScreenFullShow;
    },
    showMultiplePlay() {
      return this.options.isMultiplePlayShow;
    },
  },
  watch: {
    isScreenFull() {
      if (this.options.videoAutoFix) {
        if (this.isScreenFull) {
          // 注意用屏幕宽高
          this.adaptiveVideoSize(screen.width, screen.height);
        }
        // 退出全屏时
        else {
          // 避免和webscreenfull产生冲突，退出时基于容器宽高来设置
          const { width, height } = this.getElementSize(this.containerRef);
          this.adaptiveVideoSize(width, height);
        }
      }
    },
    isWebScreenFull() {
      if (this.options.videoAutoFix) {
        // 没有全屏再自适应
        if (!this.isScreenFull) {
          if (this.isWebScreenFull)
            // 注意用视口宽高
            this.adaptiveVideoSize(window.innerWidth, window.innerHeight);
          else {
            const { width, height } = this.getElementSize(this.containerRef);
            this.adaptiveVideoSize(width, height);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cy-player-controller-controls {
  height: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
