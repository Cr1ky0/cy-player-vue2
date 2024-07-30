import toastMixin from '@/core/mixin/toast';

/**
 * @desc 导入containerRef 导出 isScreenFull toggleScreenFull
 */
export default {
  inject: ['options'],
  mixins: [toastMixin],
  mounted() {
    const element = this.containerRef.value;
    if (element) {
      this.screenFullMixinERef = element;
      element.addEventListener(
        'fullscreenchange',
        this.screenFullMixinChangeScreenFull,
      );
    }
  },
  beforeDestroy() {
    const element = this.containerRef.value;
    if (element)
      element.removeEventListener(
        'fullscreenchange',
        this.screenFullMixinChangeScreenFull,
      );
  },
  data() {
    return {
      // 内部变量
      screenFullMixinERef: null,
      screenFullMixinMessage: null,
      // 外部变量
      isScreenFull: false,
    };
  },
  methods: {
    screenFullMixinIsFullScreenSupported() {
      return (
        document.fullscreenEnabled ||
        // @ts-expect-error
        document.webkitFullscreenEnabled ||
        // @ts-expect-error
        document.mozFullScreenEnabled ||
        // @ts-expect-error
        document.msFullscreenEnabled
      );
    },
    async toggleScreenFull() {
      const element = this.screenFullMixinERef;
      try {
        if (this.screenFullMixinIsFullScreenSupported()) {
          if (!this.isScreenFull) {
            if (element.requestFullscreen) {
              await element.requestFullscreen();
              // @ts-expect-error
            } else if (element.mozRequestFullScreen) {
              // Firefox
              // @ts-expect-error
              await element.mozRequestFullScreen();
              // @ts-expect-error
            } else if (element.webkitRequestFullscreen) {
              // Chrome, Safari and Opera
              // @ts-expect-error
              await element.webkitRequestFullscreen();
              // @ts-expect-error
            } else if (element.msRequestFullscreen) {
              // IE/Edge
              // @ts-expect-error
              await element.msRequestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              await document.exitFullscreen();
              // @ts-expect-error
            } else if (document.webkitExitFullscreen) {
              /* Safari */
              // @ts-expect-error
              await document.webkitExitFullscreen();
              // @ts-expect-error
            } else if (document.mozCancelFullScreen) {
              /* Firefox */
              // @ts-expect-error
              await document.mozCancelFullScreen();
              // @ts-expect-error
            } else if (document.msExitFullscreen) {
              /* IE11 */
              // @ts-expect-error
              await document.msExitFullscreen();
            }
          }
        } else {
          this.screenFullMixinMessage = '当前浏览器不支持全屏！';
          this.showToast(this.screenFullMixinMessage);
        }
      } catch (err) {
        this.screenFullMixinMessage = '全屏操作失败:' + err.message;
        this.showToast(this.screenFullMixinMessage);
      }
    },
    screenFullMixinChangeScreenFull() {
      this.isScreenFull = !this.isScreenFull;
    },
  },
};
