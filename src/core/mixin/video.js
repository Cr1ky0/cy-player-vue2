export default {
  data() {
    return {
      vRef: null,
      /**
       * @description 轮询状态刷新计时器，类似curTime这类属性需要监控到连续的变化，不用原生实现
       */
      interval: null,
      /**
       * @description waiting计时器，playing后一段时间再置为false
       */
      timer: null,
      /**
       * @description 全局hls对象
       */
      curHls: null,
      /**
       * @description video本身的相关状态
       */
      videoStates: {
        curSrc: '', // 当前的src
        isPlay: this.autoPlay || false, // 是否播放
        isPlayEnd: false, // 是否播放结束
        isWaiting: false, // 视频播放过程中的暂停
        isLoop: false, // 视频是否循环播放
        currentPlayTime: 0, // 当前时间/s
        duration: 0, // 总时长
        bufferedTime: 0, // 缓存时长/s
        volume: 50, // 音量
        isError: false, // 是否出错
        videoWidth: 0, // 当前video自己的宽度
        videoHeight: 0, // 当前video自己的高度
      },
      /**
       * @description video本身的控制方法
       */
      videoController: {
        load: () => this.vRef?.load(),
        play: () => this.vRef?.play(),
        pause: () => this.vRef?.pause(),
        setVolume: (volume) => {
          if (this.vRef) {
            // 记录上一次音量值
            if (volume >= 1) localStorage.setItem('lastVolume', String(volume));
            // muted状态下始终为0
            const v = volume <= 0 ? 0 : volume >= 100 ? 100 : volume;
            this.vRef.volume =
              volume <= 0 ? 0 : volume >= 100 ? 1 : volume / 100;
            this.setVideoStates('volume', v);
            // 存储音量值
            localStorage.setItem('volume', String(v));
          }
        },
        setCurTime: (curTime) => {
          if (this.vRef) this.vRef.currentTime = curTime;
        },
        setVideoSrc: (src) => {
          this.setVideoStates('curSrc', src);
        },
      },
    };
  },
  methods: {
    /**
     * @description 视频是否播放
     */
    setIsPlay() {
      if (this.vRef) {
        this.setVideoStates('isPlay', !this.vRef.paused);
        if (this.videoStates.isPlay) this.setVideoStates('isPlayEnd', false); // 播放时重置
      }
    },
    /**
     * @description 视频结束
     */
    setIsPlayEnd() {
      if (this.vRef) {
        if (this.videoStates.isLoop) this.videoController.play(); // 播放结束循环播放
        this.setVideoStates('isPlayEnd', this.vRef.ended);
      }
    },
    /**
     * @description 缓冲时间
     */
    setBufferedTime() {
      if (this.vRef && this.vRef.buffered.length >= 1) {
        let max = 0;
        for (let i = 0; i < this.vRef.buffered.length; i++) {
          const curBuffer = this.vRef.buffered.end(i);
          if (curBuffer > max) max = curBuffer;
        }
        this.setVideoStates('bufferedTime', max); // 浏览器已经缓冲的媒体数据的最远时间点
      }
    },
    /**
     *
     * @description loadedmetadata事件
     */
    handleLoadedMetaData() {
      if (this.vRef) {
        this.setVideoStates('isError', false);
        this.setVideoStates('duration', this.vRef.duration || 0);
        this.setVideoStates('videoWidth', this.vRef.videoWidth);
        this.setVideoStates('videoHeight', this.vRef.videoHeight);
      }
    },
    /**
     * @description loadeddata事件
     */
    handleLoadedData() {
      if (this.vRef) {
        // 切换quality时逻辑
        const curPlayTime = localStorage.getItem('curPlayTime');
        const curTime = parseFloat(curPlayTime || '0');
        this.videoController.setCurTime(curTime);
        localStorage.removeItem('curPlayTime'); // 切换完毕后删除，避免初始化时快进
        this.setBufferedTime(); // 重置一下buffer
      }
    },
    /**
     * @description 视频播放中的waiting
     */
    onWaiting() {
      this.setVideoStates('isWaiting', true);
    },
    /**
     * @description 从waiting恢复播放
     */
    onIsPlaying() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setVideoStates('isWaiting', false); // waiting结束
      }, 100);
    },
    /**
     * @description error处理
     */
    handleError() {
      this.setVideoStates('isError', true);
    },
    addEvents(videoElement) {
      videoElement.addEventListener(
        'loadedmetadata',
        this.handleLoadedMetaData,
      );
      videoElement.addEventListener('loadeddata', this.handleLoadedData);
      videoElement.addEventListener('progress', this.setBufferedTime);
      videoElement.addEventListener('pause', this.setIsPlay);
      videoElement.addEventListener('play', this.setIsPlay);
      videoElement.addEventListener('ended', this.setIsPlayEnd);
      videoElement.addEventListener('waiting', this.onWaiting);
      videoElement.addEventListener('playing', this.onIsPlaying);
      videoElement.addEventListener('error', this.handleError);
    },
    removeEvents(videoElement) {
      videoElement.removeEventListener(
        'loadedmetadata',
        this.handleLoadedMetaData,
      );
      videoElement.removeEventListener('loadeddata', this.handleLoadedData);
      videoElement.removeEventListener('progress', this.setBufferedTime);
      videoElement.removeEventListener('pause', this.setIsPlay);
      videoElement.removeEventListener('play', this.setIsPlay);
      videoElement.removeEventListener('ended', this.setIsPlayEnd);
      videoElement.removeEventListener('waiting', this.onWaiting);
      videoElement.removeEventListener('playing', this.onIsPlaying);
      videoElement.removeEventListener('error', this.handleError);
    },
    initStates() {
      this.setVideoStates('isPlay', this.autoPlay || false);
      this.setVideoStates('isPlayEnd', false);
      this.setVideoStates('isWaiting', false);
      this.setVideoStates('duration', 0);
      this.setVideoStates('currentPlayTime', 0);
      this.setVideoStates('bufferedTime', 0);
    },
    setVideoStates(property, value) {
      this.$set(this.videoStates, property, value);
    },
  },
  mounted() {
    // 绑定element
    this.vRef = this.$refs.videoRef;
    if (this.vRef) {
      const videoElement = this.vRef;
      videoElement.volume = this.videoStates.volume / 100; // 设置音量
      this.addEvents(videoElement);
      // update计时器
      this.interval = setInterval(() => {
        this.setVideoStates('currentPlayTime', videoElement.currentTime);
      }, 20);
    }
  },
  beforeDestroy() {
    if (this.vRef) {
      const videoElement = this.vRef;
      this.removeEvents(videoElement);
      clearInterval(this.interval);
    }
  },
};
