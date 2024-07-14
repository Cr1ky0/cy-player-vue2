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
    styles: {
      type: Object,
    },
  },
};
