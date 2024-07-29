<template>
  <svg
    :style="{
      ...styles,
      fontSize: fontSize || '1.125rem',
      width: fontSize,
      height: fontSize,
    }"
    @click="handleClick"
    aria-hidden="true"
  >
    <use :href="`#icon-${iconName}`" :fill="fill"></use>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    fill: String,
    fontSize: String,
    styles: Object,
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';

svg {
  @include selectable(none);
  cursor: pointer;
  overflow: hidden;
}
</style>
