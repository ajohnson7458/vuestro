<template>
  <div class="vuestro-pill-chart" @mouseleave="onMouseleave">
    <slot></slot>
    <div class="vuestro-pill-chart-inner">
      <svg :width="width"
           :height="height"
           @mousemove="onMouseover">
        <!--GRADIENT DEFS-->
        <defs>
          <linearGradient v-for="s in processedSeries" :key="s.field"
                          :id="`${s.id}-gradient`" x1="0%" y1="0%" x2="0%" y2="100%">
            <!--start the fade half-way down-->
            <stop offset="50%" :stop-color="s.color" stop-opacity="0.9"></stop>
            <stop offset="100%" :stop-color="s.color" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <!--PILL BARS-->
        <g v-for="d in localData">
          <rect v-for="s in processedSeries" :key="s.field"
                class="vuestro-pill-chart-pill"
                :x="d[`${s.field}_x`]"
                v-animate:y="d[`${s.field}_y`]"
                :width="d.width"
                v-animate:height="d[`${s.field}_height`]"
                :fill="gradientFill ? `url(#${s.id}-gradient) ${s.color}`:s.color"
                :fill-opacity="fillOpacity"
                :rx="d.width / 2">
          </rect>
        </g>

        <!--TOOLTIP-->
        <template v-if="!hideTooltip && cursorLine.length > 0">
          <path class="vuestro-pill-chart-cursor" :d="cursorLine" />
          <vuestro-svg-tooltip :x="lastHoverPoint.x"
                               :x-max="width"
                               :categoryField="categoryField"
                               :utc="utc"
                               :series="processedSeries"
                               :values="localData[lastHoverPoint.index]">
          </vuestro-svg-tooltip>
        </template>
      </svg>
      <!--ONLY SHOW IF TOOLTIP NOT SHOWN-->
      <vuestro-title v-if="cursorLine.length === 0">
        <slot name="title"></slot>
      </vuestro-title>
    </div>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroPillChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0,
      height: 0,
      localData: [],
      lastHoverPoint: {},
      cursorLine: '',
      colors: d3.schemeCategory10,
      valueAxis: {
        // render() {}
      },
      categoryField: 'key',
      series: [{
        field: 'value'
      }],
      stacked: false,
      padding: 0.1,
      axisXPadding: 20, // padding for X axes labels
      axisYPadding: 20, // padding for Y axes labels
      gradientFill: false, // use gradient fill
      hideTooltip: false,
      utc: false,
      transition: 800, // animation transition period
      fillOpacity: 0.7, // opacity for filled bars
      gridDashArray: 1, // svg grid dash array
      scale: {}, // d3 axes renderers
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    // process series prop by adding default colors
    processedSeries() {
      return this.series.map((s) => {
        if (s.field && !s.color) {
          s.color = this.color(s.field);
        }
        return s;
      });
    },
    getCursor() {
      return d3.area().x(d => d.center).y0(this.height - this.axisXPadding).y1(0);
    },
  },
  watch: {
    data(newVal) {
      this.redraw();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          this.width = this.$el.clientWidth;
          this.height = this.$el.clientHeight;
          this.redraw();
        }
      });
    },
    redraw() {
      this.localData = _.cloneDeep(this.data);

      let scaleX = d3.scaleBand()
                     .domain(this.data.map((d) => { return d[this.categoryField]; }))
                     .padding(this.padding)
                     .range([0, this.width]);

      let scaleY = d3.scaleLinear().range([this.height, 0]);

      this.scale = {
        x: d3.axisBottom(scaleX).tickSize(this.height),
        y: d3.axisLeft(scaleY).tickSize(-this.width),
      };

      // use value axis render function if provided
      if (this.valueAxis.render && typeof(this.valueAxis.render) === 'function') {
        this.scale.y.tickFormat((d) => {
          if (d) {
            return this.valueAxis.render(d);
          }
          return '';
        });
      }

      let stackedData;
      let extents;
      if (this.stacked) {
        let keys = _.flatMap(this.series, 'field');
        stackedData = d3.stack().keys(keys)(this.localData);
        extents = this.series.map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });
      }
      // leave some vertical space on top
      scaleY.domain([0, d3.max(extents, function(d) { return d[1] * 1.1; })]);

      // calculate dimensions
      for (let [di, d] of this.localData.entries()) {
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d.width = scaleX.bandwidth();
            d[`${s.field}_x`] = scaleX(d[this.categoryField]);
            d[`${s.field}_y`] = scaleY(stackedData[si][di][1]);
            d[`${s.field}_height`] = scaleY(stackedData[si][di][0]) - d[`${s.field}_y`];
            d.center = scaleX(d[this.categoryField]) + scaleX.bandwidth() / 2;
          } else {
            d.width = scaleX.bandwidth();
            d[`${s.field}_x`] = scaleX(d[this.categoryField]) + si*(d.width);
            d[`${s.field}_y`] = scaleY(d[s.field]) - 1;
            d[`${s.field}_height`] = scaleY(0) - scaleY(d[s.field]);
            d.center = scaleX(d[this.categoryField]) + scaleX.bandwidth() / 2;
          }
        }
      }
      this.$forceUpdate();
    },
    onMouseover({ offsetX }) {
      if (this.localData.length > 0) {
        const x = offsetX;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.localData[closestPoint.index];
          this.cursorLine = this.getCursor([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.localData
        .map((point, index) => ({
          x: point[`${this.series[this.series.length-1].field}_x`],
          diff: Math.abs(point[`${this.series[this.series.length-1].field}_x`] - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      this.cursorLine = '';
    },
  },
  directives: {
    axis: {
      update(el, binding, vnode) {
        d3.select(el).transition().duration(vnode.context.transition).ease(d3.easeLinear).call(binding.value[binding.arg]);
      }
    },
    animate: {
      bind(el, binding, vnode) {
        let initialValue = 0;
        if (binding.arg === 'y') {
          let scale = vnode.context.scale.y.scale();
          initialValue = scale(0);
        }
        d3.select(el)
          .attr(binding.arg, initialValue)
          .transition(binding.arg).duration(vnode.context.transition)
          .attr(binding.arg, binding.value);
      },
      update(el, binding, vnode) {
        d3.select(el).attr(binding.arg, binding.value);
      },
    },
  },
  filters: {
    valueFilterProxy(value, valueAxis) {
      if (valueAxis && valueAxis.render) {
        return valueAxis.render(value);
      } else {
        return value;
      }
    }
  },
};

</script>

<style scoped>

.vuestro-pill-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-pill-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vuestro-pill-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 2px;
  fill: none;
}

.vuestro-pill-chart-tooltip rect {
	fill: var(--vuestro-light);
}

/* toggle x grid */

.vuestro-title {
  margin: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
}

</style>