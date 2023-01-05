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
    minSize: { type: Number, default: 12 },
    maxSize: { type: Number, default: 200 },
    fontStep: { type: Number, default: 0.25 },
    marginError: { type: Number, default: 10 },
    noWrap: { type: Boolean, default: false },
  },
  mounted() {
    new ResizeObserver(this.resize).observe(this.$el);
    this.resize();
  },
  methods: {
    resize() {
      let outer = this.$el.getBoundingClientRect();
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