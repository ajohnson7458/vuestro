<template>
  <g class="vuestro-svg-legend">
    <text :x="x" :y="y" ref="text">
      <template>
        <tspan :x="x"
               dy="1.2em"
               :fill="pieSection.color"
               :stroke="pieSection.color"
               stroke-width="2">
        |</tspan>
        <tspan fill="white">{{ pieSection.key + " - " + pieSection.valuePercentage}}</tspan>
      </template>
    </text>
  </g>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'VuestroSvgLegend',
  props: {
      pieSection: { type: Object, required: true },
      x: { type: Number, default: 5},
      y: { type: Number, default: 10 },
      radius: { type: Number, default: 2 },
  },
  data() {
      return {
      };
  },
  mounted() {
      this.update();
  },
  methods: {
      update() {
      },
  },
};

</script>

<style scoped>

.vuestro-svg-legend > rect {
  fill: var(--vuestro-popup-bg);
  opacity: var(--vuestro-tooltip-opacity);
}

.vuestro-svg-legend > text {
  fill: var(--vuestro-popup-fg);
}

</style>