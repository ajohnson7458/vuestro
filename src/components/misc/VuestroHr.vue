<template>
  <div class="vuestro-hr"
       :style="style">
  </div>
</template>

<script>

export default {
  name: 'VuestroHr',
  props: {
    margin: { type: String, default: '0' },                     // top/bottom margin
    width: { type: Number, default: 100 },                      // the perc width of the parent, default 100%
    line: { type: String, default: 'solid' },                   // dotted, dashed, solid, double, groove, ridge, inset, outset
    color: { type: String, default: 'var(--vuestro-outline)' }, // the line color
  },
  computed: {
    style() {
      return {
        'margin-top': this.margin,
        'margin-bottom': this.margin,
        'width': `${this.width}%`,
        'border-bottom': `1px ${this.line} ${this.color}`,
      };
    },
  },
};

</script>

<style scoped>

.vuestro-hr {
  align-self: center;
}

</style>