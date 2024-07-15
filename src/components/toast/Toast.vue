<template>
  <div
    id="cy-player-toast"
    :class="`cy-toast-pos-default cy-toast-${position}`"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'left-top',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/var';

#cy-player-toast {
  padding: 0.7rem;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 0.8rem;
  line-height: 1rem;
  color: #fff;
  text-align: center;
  animation: show 0.5s ease;
  border-radius: 0.3rem;
}

.cy-toast-pos-default {
  @include position(absolute, $y-dist-top, auto, auto, $x-dist);
}

.cy-toast-left-top {
  @include position(absolute, $y-dist-top, auto, auto, $x-dist);
}

.cy-toast-left-bottom {
  @include position(absolute, auto, $y-dist-bottom, auto, $x-dist);
}

.cy-toast-right-top {
  @include position(absolute, $y-dist-top, auto, $x-dist, auto);
}

.cy-toast-right-bottom {
  @include position(absolute, auto, $y-dist-bottom, $x-dist, auto);
}

.cy-toast-center {
  @include position(absolute, 50%, auto, auto, 50%);
  transform: translate(-50%, -50%);
}
</style>