export default {
  props: {
    vSrc: {
      type: String,
      required: true,
      default: '',
    },
    sourceType: {
      type: String,
      default: 'h264',
    },
    poster: {
      type: String,
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
    quality: {
      type: Array,
      default() {
        return new Array(0);
      },
      validator(values) {
        return values.every((value) => {
          const hasVQ =
            value.hasOwnProperty('vQ') && typeof value.vQ === 'string'; // 假设 vQ 是一个对象
          const hasSrc =
            value.hasOwnProperty('src') && typeof value.src === 'string';
          const hasChosen = value.hasOwnProperty('chosen')
            ? typeof value.chosen === 'boolean'
            : true;
          return hasVQ && hasSrc && hasChosen;
        });
      },
    },
    isSettingShow: {
      type: Boolean,
      default: true,
    },
    isPicInPicShow: {
      type: Boolean,
      default: true,
    },
    isWebScreenFullShow: {
      type: Boolean,
      default: true,
    },
    isScreenFullShow: {
      type: Boolean,
      default: true,
    },
    isMultiplePlayShow: {
      type: Boolean,
      default: true,
    },
  },
};
