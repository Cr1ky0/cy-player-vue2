export default {
  data() {
    return {
      lightOn: false,
    };
  },
  methods: {
    lightOffMixinHandleLightOn() {
      const element = document.createElement('div');
      element.classList.add('cy-player-light-off-mask');
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '100vw';
      element.style.height = '100vh';
      element.style.zIndex = '1000';
      element.style.backgroundColor = 'rgba(0,0,0,.6)';
      if (!document.querySelector('.cy-player-light-off-mask')) {
        document.body.appendChild(element);
        this.lightOn = true;
      }
    },
    lightOffMixinHandleLightOff() {
      const element = document.querySelector('.cy-player-light-off-mask');
      if (element) {
        document.body.removeChild(element);
        this.lightOn = false;
      }
    },
    handleLightOffModel() {
      if (this.lightOn) {
        this.lightOffMixinHandleLightOff();
      } else {
        this.lightOffMixinHandleLightOn();
      }
      localStorage.setItem('lightOn', String(this.lightOn));
    },
  },
  mounted() {
    const localLightOn = localStorage.getItem('lightOn');
    this.lightOn = localLightOn === 'true'; // 直接用Boolean()会把任意非空串转为true
    if (this.lightOn) {
      this.lightOffMixinHandleLightOn();
    }
  },
};
