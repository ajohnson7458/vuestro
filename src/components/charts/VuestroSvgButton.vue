<template>
  <g class="vuestro-svg-button">
  <!-- BACKGROUND -->
    <rect :x="x" :y="y" :width="buttonWidth" :height="buttonHeight" :rx="rx" :ry="ry"/>
    <!-- TEXT -->
    <text :x="x+buttonWidth/2" :y="y+buttonHeight-padding" text-anchor="middle" ref="text">{{buttonText}}</text>
  </g>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'VuestroSvgButton',
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    buttonText: { type: String, default: "button"},
    padding: { type: Number, default: 4 },
    rx: { type: Number, default: 2 },
    ry: { type: Number, default: 2 },
  },
  data() {
    return {
      buttonWidth: 0,
      buttonHeight: 0,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      // size it
      let size = this.$refs.text.getBBox();
      this.buttonHeight = size.height + this.padding;
      this.buttonWidth = size.width + this.padding;
    }
  },
};

</script>

<style scoped>

.vuestro-svg-button > text {
  fill: white;
  opacity: 0.8;
  font-size: 10px;
  font-family: sans-serif;
}

.vuestro-svg-button > rect {
  fill: goldenrod;
  opacity: var(--vuestro-tooltip-opacity);
}


</style>