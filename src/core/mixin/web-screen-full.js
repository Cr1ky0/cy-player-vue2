/**
 * @desc 传入containerRef 传出isWebScreenFull,toggleWebScreenFull
 */
export default {
  data() {
    return {
      isWebScreenFull: false,
    };
  },
  methods: {
    toggleWebScreenFull() {
      const element = this.containerRef;
      if (!this.isWebScreenFull)
        element.classList.add('cy-player-container-web-fullscreen-active');
      else
        element.classList.remove('cy-player-container-web-fullscreen-active');
      this.isWebScreenFull = !this.isWebScreenFull;
    },
  },
};
