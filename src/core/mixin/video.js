/**
 * @desc 引入 auoPlay
 * 导出 videoStates videoController setVideoStates
 */
export default {
  data() {
    return {
      // 内部变量
      videoMixinVRef: null,
      /**
       * @description 轮询状态刷新计时器，类似curTime这类属性需要监控到连续的变化，不用原生实现
       */
      videoMixinInterval: null,
      /**
       * @description waiting计时器，playing后一段时间再置为false
       */
      videoMixinTimer: null,
      /**
       * @description 全局hls对象
       */
      videoMixinCurHls: null,

      // 外部变量
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
        load: () => this.videoMixinVRef?.load(),
        play: () => this.videoMixinVRef?.play(),
        pause: () => this.videoMixinVRef?.pause(),
        setVolume: (volume) => {
          if (this.videoMixinVRef) {
            // 记录上一次音量值
            if (volume >= 1) localStorage.setItem('lastVolume', String(volume));
            // muted状态下始终为0
            const v = volume <= 0 ? 0 : volume >= 100 ? 100 : volume;
            this.videoMixinVRef.volume =
              volume <= 0 ? 0 : volume >= 100 ? 1 : volume / 100;
            this.setVideoStates('volume', v);
            // 存储音量值
            localStorage.setItem('volume', String(v));
          }
        },
        setCurTime: (curTime) => {
          if (this.videoMixinVRef) this.videoMixinVRef.currentTime = curTime;
        },
        setVideoSrc: (src) => {
          this.setVideoStates('curSrc', src);
        },
      },
    };
  },
  methods: {
    // 内部method
    /**
     * @description 视频是否播放
     */
    videoMixinSetIsPlay() {
      if (this.videoMixinVRef) {
        this.setVideoStates('isPlay', !this.videoMixinVRef.paused);
        if (this.videoStates.isPlay) this.setVideoStates('isPlayEnd', false); // 播放时重置
      }
    },
    /**
     * @description 视频结束
     */
    videoMixinSetIsPlayEnd() {
      if (this.videoMixinVRef) {
        if (this.videoStates.isLoop) this.videoController.play(); // 播放结束循环播放
        this.setVideoStates('isPlayEnd', this.videoMixinVRef.ended);
      }
    },
    /**
     * @description 缓冲时间
     */
    videoMixinSetBufferedTime() {
      if (this.videoMixinVRef && this.videoMixinVRef.buffered.length >= 1) {
        let max = 0;
        for (let i = 0; i < this.videoMixinVRef.buffered.length; i++) {
          const curBuffer = this.videoMixinVRef.buffered.end(i);
          if (curBuffer > max) max = curBuffer;
        }
        this.setVideoStates('bufferedTime', max); // 浏览器已经缓冲的媒体数据的最远时间点
      }
    },
    /**
     *
     * @description loadedmetadata事件
     */
    videoMixinHandleLoadedMetaData() {
      if (this.videoMixinVRef) {
        this.setVideoStates('isError', false);
        this.setVideoStates('duration', this.videoMixinVRef.duration || 0);
        this.setVideoStates('videoWidth', this.videoMixinVRef.videoWidth);
        this.setVideoStates('videoHeight', this.videoMixinVRef.videoHeight);
      }
    },
    /**
     * @description loadeddata事件
     */
    videoMixinHandleLoadedData() {
      if (this.videoMixinVRef) {
        // 切换quality时逻辑
        const curPlayTime = localStorage.getItem('curPlayTime');
        const curTime = parseFloat(curPlayTime || '0');
        this.videoController.setCurTime(curTime);
        localStorage.removeItem('curPlayTime'); // 切换完毕后删除，避免初始化时快进
        this.videoMixinSetBufferedTime(); // 重置一下buffer
      }
    },
    /**
     * @description 视频播放中的waiting
     */
    videoMixinOnWaiting() {
      this.setVideoStates('isWaiting', true);
    },
    /**
     * @description 从waiting恢复播放
     */
    videoMixinOnIsPlaying() {
      if (this.videoMixinTimer) clearTimeout(this.videoMixinTimer);
      this.videoMixinTimer = setTimeout(() => {
        this.setVideoStates('isWaiting', false); // waiting结束
      }, 100);
    },
    /**
     * @description error处理
     */
    videoMixinHandleError() {
      this.setVideoStates('isError', true);
    },
    videoMixinAddEvents(videoElement) {
      videoElement.addEventListener(
        'loadedmetadata',
        this.videoMixinHandleLoadedMetaData,
      );
      videoElement.addEventListener(
        'loadeddata',
        this.videoMixinHandleLoadedData,
      );
      videoElement.addEventListener('progress', this.videoMixinSetBufferedTime);
      videoElement.addEventListener('pause', this.videoMixinSetIsPlay);
      videoElement.addEventListener('play', this.videoMixinSetIsPlay);
      videoElement.addEventListener('ended', this.videoMixinSetIsPlayEnd);
      videoElement.addEventListener('waiting', this.videoMixinOnWaiting);
      videoElement.addEventListener('playing', this.videoMixinOnIsPlaying);
      videoElement.addEventListener('error', this.videoMixinHandleError);
    },
    videoMixinRemoveEvents(videoElement) {
      videoElement.removeEventListener(
        'loadedmetadata',
        this.videoMixinHandleLoadedMetaData,
      );
      videoElement.removeEventListener(
        'loadeddata',
        this.videoMixinHandleLoadedData,
      );
      videoElement.removeEventListener(
        'progress',
        this.videoMixinSetBufferedTime,
      );
      videoElement.removeEventListener('pause', this.videoMixinSetIsPlay);
      videoElement.removeEventListener('play', this.videoMixinSetIsPlay);
      videoElement.removeEventListener('ended', this.videoMixinSetIsPlayEnd);
      videoElement.removeEventListener('waiting', this.videoMixinOnWaiting);
      videoElement.removeEventListener('playing', this.videoMixinOnIsPlaying);
      videoElement.removeEventListener('error', this.videoMixinHandleError);
    },
    videoMixinInitStates() {
      this.setVideoStates('isPlay', this.autoPlay || false);
      this.setVideoStates('isPlayEnd', false);
      this.setVideoStates('isWaiting', false);
      this.setVideoStates('duration', 0);
      this.setVideoStates('currentPlayTime', 0);
      this.setVideoStates('bufferedTime', 0);
    },
    // 外部method
    setVideoStates(property, value) {
      this.$set(this.videoStates, property, value);
    },
  },
  mounted() {
    // 绑定element
    this.videoMixinVRef = this.$refs.videoRef;
    if (this.videoMixinVRef) {
      const videoElement = this.videoMixinVRef;
      videoElement.volume = this.videoStates.volume / 100; // 设置音量
      this.videoMixinAddEvents(videoElement);
      // update计时器
      this.videoMixinInterval = setInterval(() => {
        this.setVideoStates('currentPlayTime', videoElement.currentTime);
      }, 20);
    }
  },
  beforeDestroy() {
    if (this.videoMixinVRef) {
      const videoElement = this.videoMixinVRef;
      this.videoMixinRemoveEvents(videoElement);
      clearInterval(this.videoMixinInterval);
    }
  },
};
