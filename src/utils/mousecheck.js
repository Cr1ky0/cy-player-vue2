/**
 * @desc 引入 null
 * 导出 mouseEnter isMobile handleMouseEnter handleMouseLeave
 * handleTouchStart handleTouchEnd
 */
export default {
  data() {
    return {
      // 内部变量
      mouseCheckMixinERef: null,
      mouseCheckMixinTimer: null,
      // 外部变量
      mouseEnter: false,
      isMobile: false,
    };
  },
  methods: {
    handleMouseEnter() {
      this.mouseEnter = true;
    },

    handleMouseLeave() {
      this.mouseEnter = false;
    },

    handleTouchStart() {
      if (this.mouseCheckMixinTimer.value) clearTimeout(this.mouseCheckMixinTimer);
      this.mouseEnter = true;
    },

    handleTouchEnd() {
      this.mouseCheckMixinTimer = setTimeout(() => {
        this.mouseEnter = false;
      }, 2000);
    },
  },
  mounted() {
    const userAgent = navigator.userAgent;
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    if (this.$refs.containerRef) {
      this.mouseCheckMixinERef = this.$refs.containerRef;
      const elem = this.mouseCheckMixinERef;
      if (this.isMobile) {
        elem.addEventListener('touchstart', this.handleTouchStart);
        elem.addEventListener('touchend', this.handleTouchEnd);
      } else {
        elem.addEventListener('mouseenter', this.handleMouseEnter);
        elem.addEventListener('mouseleave', this.handleMouseLeave);
      }
    }
  },
  beforeDestroy() {
    if (this.mouseCheckMixinERef) {
      const elem = this.mouseCheckMixinERef;
      if (this.isMobile) {
        elem.removeEventListener('touchstart', this.handleTouchStart);
        elem.removeEventListener('touchend', this.handleTouchEnd);
      } else {
        elem.removeEventListener('mouseenter', this.handleMouseEnter);
        elem.removeEventListener('mouseleave', this.handleMouseLeave);
      }
    }
  },
};
