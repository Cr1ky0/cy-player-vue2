/**
 * @desc 引入变量 videoStates options 导出 getElementSize setTotalSize adaptiveVideoSize
 */
export default {
  data() {
    return {
      // 内部变量
      sizeMixinVRef: null,
      sizeMixinCRef: null,
      // 外部变量
    };
  },
  methods: {
    // 外部方法
    getElementSize(elem) {
      const width = parseFloat(getComputedStyle(elem).width);
      const height = parseFloat(getComputedStyle(elem).height);
      return { width, height };
    },
    /**
     * video自适应宽高
     * @param cWidth video父容器宽度
     * @param cHeight video父容器高度
     */
    adaptiveVideoSize(cWidth, cHeight) {
      const vElem = this.sizeMixinVRef;
      const containerSizeProp = cWidth / cHeight; // 父元素宽长比
      const videoSizeProp =
        this.videoStates.videoWidth / this.videoStates.videoHeight; // video元素宽长比
      // container比例 > video比例：说明video应该按宽度缩放，即height占满父元素，width按视频本身比例缩放（想象一个宽屏里放一个窄视频）
      if (containerSizeProp > videoSizeProp) {
        vElem.style.height = '100%'; // 不要用cHeight，不然全屏比例不对
        vElem.style.width = `${cHeight * videoSizeProp}px`; // vW / vH = (vW_ / vH_ )
      }
      // 否则按长度缩放，即width占满父元素，height按视频本身比例缩放（想象一个窄屏里放一个款视频）
      else {
        vElem.style.width = '100%';
        vElem.style.height = `${cWidth / videoSizeProp}px`; // vW / vH =  (vH_ / vW_)
      }
    },
    /**
     * @description 设置容器以及video宽高
     */
    setTotalSize(adaptVideo) {
      const videoElement = this.sizeMixinVRef;
      const videoContainer = this.sizeMixinCRef;
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;
      // container size
      if (!this.options.width && !this.options.styles?.width)
        videoContainer.style.width = `${videoWidth}px`;
      if (!this.options.height && !this.options.styles?.height)
        videoContainer.style.height = `${videoHeight}px`;
      if (this.options.height) {
        if (typeof this.options.height === 'number')
          videoContainer.style.height = `${this.options.height}px`;
        else videoContainer.style.height = this.options.height;
      }
      if (this.options.width) {
        if (typeof this.options.width === 'number')
          videoContainer.style.width = `${this.options.width}px`;
        else videoContainer.style.width = this.options.width;
      }
      // adapt video size
      if (typeof adaptVideo !== 'boolean' || adaptVideo) {
        const { width, height } = this.getElementSize(videoContainer);
        this.adaptiveVideoSize(width, height);
      }
    },
  },
  mounted() {
    if (this.$refs.videoRef) this.sizeMixinVRef = this.$refs.videoRef;
    if (this.$refs.containerRef) this.sizeMixinCRef = this.$refs.containerRef;
  },
};
