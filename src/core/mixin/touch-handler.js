/**
 * @desc 导入maskContainer callback 导出 showVolume
 */
export default {
  data() {
    return {
      // 内部变量
      touchHandlerMixinInnerRef: null,
      touchHandlerMixinOperator: null,
      touchHandlerMixinLastX: 0,
      touchHandlerMixinLastY: 0,
      // 外部变量
      showVolume: false,
    };
  },
  methods: {
    // 内部方法
    touchHandlerMixinGetTouchPosition(e) {
      const rect = this.touchHandlerMixinInnerRef.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 判断事件类型并提取坐标
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      let x = clientX - rect.left;
      let y = clientY - rect.top;

      // 确保x, y坐标不超出元素的边界
      x = x <= 0 ? 0 : x >= width ? width : x;
      y = y <= 0 ? 0 : y >= height ? height : y;

      // x,y和上次移动的差距百分比
      const xChangeProp = ((x - this.touchHandlerMixinLastX) / width) * 100;
      const yChangeProp = ((y - this.touchHandlerMixinLastY) / height) * 100;
      return [x, y, xChangeProp, yChangeProp];
    },
    touchHandlerMixinHandleTouchStart(e) {
      // 按下时接收一下初始touch位置
      const [x, y] = this.touchHandlerMixinGetTouchPosition(e);
      this.touchHandlerMixinLastX = x;
      this.touchHandlerMixinLastY = y;
    },
    touchHandlerMixinHandleTouchMove(e) {
      const [x, y, xChangeProp, yChangeProp] = this.touchHandlerMixinGetTouchPosition(e);
      // 判断操作类型
      if (!this.touchHandlerMixinOperator) {
        this.touchHandlerMixinOperator =
          Math.abs(x - this.touchHandlerMixinLastX) > Math.abs(y - this.touchHandlerMixinLastY)
            ? 'Progress'
            : 'Volume';
        // touch start回调放到这执行，因为operator在这才能获取
        this.touchStartEffect &&
          this.touchStartEffect(this.operator);
      }

      // 根据操作类型操作
      if (this.touchHandlerMixinOperator === 'Progress') {
        this.handleChangeProgress(xChangeProp);
      } else {
        this.showVolume = true;
        this.handleChangeVolume(yChangeProp);
      }

      // 重置last
      this.touchHandlerMixinLastX = x;
      this.touchHandlerMixinLastY = y;
    },
    touchHandlerMixinHandleTouchEnd() {
      // touch end 回调
      this.touchEndEffect && this.touchEndEffect(this.operator);
      this.touchHandlerMixinLastX = 0;
      this.touchHandlerMixinLastY = 0;
      this.touchHandlerMixinOperator = null;
      this.showVolume = false;
    },
  },
  mounted() {
    if (this.$refs.maskContainer) {
      this.touchHandlerMixinInnerRef = this.$refs.maskContainer;
      const elem = this.touchHandlerMixinInnerRef;
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        );
      if (isMobile) {
        elem.addEventListener('touchstart', this.touchHandlerMixinHandleTouchStart);
        elem.addEventListener('touchmove', this.touchHandlerMixinHandleTouchMove);
        elem.addEventListener('touchend', this.touchHandlerMixinHandleTouchEnd);
      }
    }
  },
  beforeDestroy() {
    if (this.$refs.maskContainer) {
      const elem = this.$refs.maskContainer;
      elem.removeEventListener('touchstart', this.touchHandlerMixinHandleTouchStart);
      elem.removeEventListener('touchmove', this.touchHandlerMixinHandleTouchMove);
      elem.removeEventListener('touchend', this.touchHandlerMixinHandleTouchEnd);
    }
  }
};
