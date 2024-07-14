export default {
  props: {
    vSrc: {
      type: String,
      required: true,
      default: '',
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    styles: Object,
    themeColor: {
      type: String,
      default: '#00aeec',
    },
    showProgressFloat: {
      type: Boolean,
      default: true,
    },
    keepControllerShow: {
      type: Boolean,
      default: false,
    },
  },
};
