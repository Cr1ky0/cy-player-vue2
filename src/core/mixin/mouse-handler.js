/**
 * @desc 导入onMouseDown onMouseUp onMouseMove
 * 导出 isDrag mouseEnter mouseX mouseY xProp yProp
 */
export default {
  data() {
    return {
      // 内部变量
      mouseHandlerCRef: null,
      mouseHandlerWidth: null,
      mouseHandlerHeight: null,
      mouseHandlerIsMobile: false,
      // 外部变量
      isDrag: false,
      mouseEnter: false,
      mouseX: 0,
      mouseY: 0,
      xProp: 0,
      yProp: 0,
    };
  },
  methods: {
    // 内部方法
    mouseHandlerHandleMouseMove(e) {
      // 元素处于内部或者拖拽时进行计算，节省资源
      if (this.mouseEnter || this.isDrag) {
        const rect = this.mouseHandlerCRef.getBoundingClientRect();
        this.mouseHandlerWidth = rect.width;
        this.mouseHandlerHeight = rect.height;

        // 判断事件类型并提取坐标
        let clientX, clientY;
        if (e instanceof MouseEvent) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else if (e instanceof TouchEvent && e.touches[0]) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return; // 如果事件不是MouseEvent或TouchEvent中的一个，直接返回
        }

        let x = clientX - rect.left;
        let y = clientY - rect.top;

        // 确保x, y坐标不超出元素的边界
        x = x <= 0 ? 0 : x >= this.mouseHandlerWidth ? this.mouseHandlerWidth : x;
        y = y <= 0 ? 0 : y >= this.mouseHandlerHeight ? this.mouseHandlerHeight : y;

        this.mouseX = x;
        this.mouseY = y;
        this.xProp = (x / this.mouseHandlerWidth) * 100;
        this.yProp = (y / this.mouseHandlerHeight) * 100;

        // 如果存在鼠标事件回调，则调用onMouseMove
        if (this.onMouseMove) {
          this.onMouseMove();
        }
      }
    },
    mouseHandlerHandleMouseUp() {
      if (this.onMouseUp) this.onMouseUp();
      this.isDrag = false;
    },
    mouseHandlerHandleMouseEnter() {
      this.mouseEnter = true;
    },
    mouseHandlerHandleMouseLeave() {
      this.mouseEnter = false;
    },
    mouseHandlerHandleMouseDown(e) {
      e.preventDefault();
      this.isDrag = true;
      if (this.onMouseDown) {
        this.onMouseDown();
      }
    },
  },
  mounted() {
    const userAgent = navigator.userAgent;
    this.mouseHandlerIsMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    if (this.$refs.progressRef) {
      this.mouseHandlerCRef = this.$refs.progressRef;
      const dom = this.mouseHandlerCRef;
      if (this.mouseHandlerIsMobile) {
        // touch事件里的touchend可以同时表示mousedown和mouseleave
        dom.addEventListener('touchstart', this.mouseHandlerHandleMouseDown);
        window.addEventListener('touchmove', this.mouseHandlerHandleMouseMove);
        window.addEventListener('touchend', this.mouseHandlerHandleMouseUp);
      } else {
        dom.addEventListener('mouseenter', this.mouseHandlerHandleMouseEnter);
        dom.addEventListener('mouseleave', this.mouseHandlerHandleMouseLeave);
        window.addEventListener('mouseup', this.mouseHandlerHandleMouseUp);
        dom.addEventListener('mousedown', this.mouseHandlerHandleMouseDown);
        window.addEventListener('mousemove', this.mouseHandlerHandleMouseMove);
      }
    }
  },
  beforeDestroy() {
    const dom = this.mouseHandlerCRef;
    if (this.mouseHandlerIsMobile) {
      dom.removeEventListener('touchstart', this.mouseHandlerHandleMouseDown);
      window.removeEventListener('touchmove', this.mouseHandlerHandleMouseMove);
      window.removeEventListener('touchend', this.mouseHandlerHandleMouseUp);
    } else {
      dom.removeEventListener('mouseenter', this.mouseHandlerHandleMouseEnter);
      dom.removeEventListener('mouseleave', this.mouseHandlerHandleMouseLeave);
      window.removeEventListener('mouseup', this.mouseHandlerHandleMouseUp);
      dom.removeEventListener('mousedown', this.mouseHandlerHandleMouseDown);
      window.removeEventListener('mousemove', this.mouseHandlerHandleMouseMove);
    }
  },
};
