<template>
  <div></div>
</template>

<script>
import toastMixin from '@/core/mixin/toast';

export default {
  inject: ['videoStates', 'videoController', 'options', 'isDrag'],
  mixins: [toastMixin],
  computed: {
    styles() {
      return this.videoStates.isPlayEnd || this.videoStates.isError
        ? { backgroundColor: 'rgba(0,0,0,.3)' }
        : undefined;
    },
    pos() {
      return this.options.maskIconPlacement;
    },
    cusPos() {
      return this.options.customizedItemPlacement;
    },
  },
  methods: {
    handleClick() {
      if (this.videoStates.isPlay) this.videoController.pause();
      else this.videoController.play();
    },
  },
  watch: {
    'videoStates.isError'() {
      if (this.videoStates.isError) {
        // toast
        this.showToast('视频因未知原因加载失败')
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
