<template>
  <div class="vuestro-auto-text" :class="{ noWrap }">
    <span ref="inner">
      <slot></slot>
    </span>
  </div>
</template>

<script>

/* global ResizeObserver */

export default {
  name: 'VuestroAutoText',
  props: {
    minSize: { type: Number, default: 12 },     // minimum font size, will set threshold for wrapping
    maxSize: { type: Number, default: 200 },    // maximum font size, so we don't grow infinitely
    fontStep: { type: Number, default: 0.25 },  // should be fractional, integer font sizes are not granular enough
    marginError: { type: Number, default: 10 }, // distance in px from parent size to call it good
    noWrap: { type: Boolean, default: false },  // disable wrapping
    middle: { type: Boolean, default: false },  // center text vertically, only makes sense in combination with noWrap
  },
  mounted() {
    new ResizeObserver(this.resize).observe(this.$el);
    this.resize();
  },
  methods: {
    resize() {
      let outer = this.$el.getBoundingClientRect();
      // center the text vertically using line-height, would be nice to
      // use flexbox to center but the code below doesn't work as well with flexbox
      if (this.middle) {
        this.$el.style.lineHeight = `${outer.height}px`;
      }
      let inner;
      // loop between min and max until height OR width of parent
      // is exceeded
      for (let i=this.minSize; i<this.maxSize; i+=this.fontStep) {
        // set font size directly so we don't rely on Vue loop
        this.$refs.inner.style.fontSize = `${i}px`;
        inner = this.$refs.inner.getBoundingClientRect();
        if (inner.width >= outer.width - this.marginError ||
            inner.height >= outer.height - this.marginError) {
          break;
        }
      }
    },
  },
};

</script>

<style scoped>

.vuestro-auto-text {
  height: 100%;
  width: 100%;
}

.vuestro-auto-text.noWrap {
  white-space: nowrap;
}

</style>