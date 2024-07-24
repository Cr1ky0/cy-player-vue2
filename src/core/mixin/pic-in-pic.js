import toastMixin from '@/core/mixin/toast';

/**
 * @desc 传入 videoRef 传出 togglePictureInPicture
 */
export default {
  inject: ['options'],
  mixins: [toastMixin],
  watch: {
    videoRef() {
      const element = this.videoRef;
      if (element) {
        this.picInPicMixinERef = element;
        element.addEventListener(
          'enterpictureinpicture',
          this.picInPicMixinChangeIsPictureInPicture,
        );
        element.addEventListener(
          'leavepictureinpicture',
          this.picInPicMixinChangeIsPictureInPicture,
        );
      }
    },
  },
  beforeDestroy() {
    const element = this.picInPicMixinERef;
    if (element) {
      element.removeEventListener(
        'enterpictureinpicture',
        this.picInPicMixinChangeIsPictureInPicture,
      );
      element.removeEventListener(
        'leavepictureinpicture',
        this.picInPicMixinChangeIsPictureInPicture,
      );
    }
  },
  data() {
    return {
      picInPicMixinERef: null,
      picInPicMixinIsPictureInPicture: false,
      picInPicMixinMessage: '',
    };
  },
  methods: {
    async togglePictureInPicture() {
      const element = this.picInPicMixinERef;
      try {
        if (document.pictureInPictureEnabled) {
          if (!this.picInPicMixinIsPictureInPicture)
            await element.requestPictureInPicture();
          else await document.exitPictureInPicture();
        } else {
          this.picInPicMixinMessage = '当前浏览器不支持画中画模式！';
          this.showToast(this.picInPicMixinMessage);
        }
      } catch (err) {
        this.picInPicMixinMessage = '进入画中画失败:' + err.message;
        this.showToast(this.picInPicMixinMessage);
      }
    },
    picInPicMixinChangeIsPictureInPicture() {
      this.picInPicMixinIsPictureInPicture =
        !this.picInPicMixinIsPictureInPicture;
    },
  },
};
