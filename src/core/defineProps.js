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
    controllerStyles: Object,
    width: [String, Number],
    height: [String, Number],
    videoAutoFix: {
      type: Boolean,
      default: true,
    },
    maskIconPlacement: {
      type: String,
      default: 'center',
    },
    customizedItemPlacement: {
      type: String,
      default: 'center',
    },
    toastPlacement: {
      type: String,
      default: 'left-top',
    },
    showToast: {
      type: Boolean,
      default: true,
    },
  },
};
