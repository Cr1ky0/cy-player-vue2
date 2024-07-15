/**
 * @desc 导入videoStates
 */
export default {
  watch: {
    'videoStates.isPlay'() {
      if (this.videoStates.isPlay) {
        this.$emit('play', this.videoStates);
      } else {
        this.$emit('pause', this.videoStates);
      }
    },
    'videoStates.isPlayEnd'() {
      if (this.videoStates.isPlayEnd) {
        this.$emit('playEnd', this.videoStates);
      }
    },
    'videoStates.volume'() {
      this.$emit('volumeChange', this.videoStates);
    },
    'videoStates.currentPlayTime'() {
      this.$emit('timeChange', this.videoStates);
    },
    'videoStates.isWaiting'() {
      this.$emit('waiting', this.videoStates);
    },
    'videoStates.isError'() {
      this.$emit('error');
    },
  },
};
