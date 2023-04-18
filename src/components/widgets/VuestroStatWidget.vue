<template>
  <vuestro-panel class="vuestro-stat-widget" :style="style" no-border frame>
    <vuestro-area-chart v-if="data.length > 1"
                        class="vuestro-stat-widget-chart"
                        :data="data"
                        :options="chartOptions">
    </vuestro-area-chart>
    <vuestro-container gutter="none" no-wrap align="center" justify="flex-end">
      <div class="vuestro-stat-widget-title drag">{{ title }}</div>
      <div class="vuestro-stat-widget-trend" v-if="showTrend && latestTrend">
        {{ latestTrend < 0 ? '-':'+' }}{{ Math.abs(latestTrend) | filterProxy(render) }}
        <vuestro-icon v-if="latestTrend < 0" name="circle-chevron-down"
                      variant="danger"></vuestro-icon>
        <vuestro-icon v-else name="circle-chevron-up"
                      style="color: var(--vuestro-emerald)">
        </vuestro-icon>
      </div>
      <div class="vuestro-stat-widget-buttons">
        <slot name="buttons"></slot>
      </div>
    </vuestro-container>
    <vuestro-container content="flex-end"
                       no-wrap
                       :class="{ 'vuestro-stat-widget-clickable': options.clickRoute }"
                       @click="onClick">
      <vuestro-icon class="vuestro-stat-widget-icon" v-if="icon" :name="icon"></vuestro-icon>
      <div class="vuestro-stat-widget-value">
        <template v-if="data.length > 0">
          <!--SHOW LAST VALUE-->
          {{ latestValue | filterProxy(render) }}
        </template>
        <vuestro-icon v-else name="spinner" pulse></vuestro-icon>
      </div>
    </vuestro-container>
  </vuestro-panel>
</template>

<script>

/* globals _, Vue */

export default {
  name: 'VuestroStatWidget',
  props: {
    // needs to contain object(s) with at least fields named by
    // the values of categoryField and valueField
    data: { type: Array, required: true },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      title: 'Default Title',
      color: 'var(--vuestro-primary)',
      icon: null,
      render: Vue.filter('vuestroCommas'),
      showLoading: true,
      categoryField: 'key',
      valueField: 'value',
      showTrend: false,
    };
  },
  computed: {
    style() {
      return {
        '--vuestro-panel-bg': this.color,
      };
    },
    latestValue() {
      return this.data[this.data.length-1][this.valueField];
    },
    latestTrend() {
      if (this.data.length > 1) {
        return this.latestValue - this.data[this.data.length-2][this.valueField];
      }
    },
    chartOptions() {
      return {
        strokeWidth: 1,
        smooth: false,
        series: [
          {
            title: 'Series',
            field: this.valueField,
            color: 'rgba(255,255,255,0.3)',
          },
        ],
      };
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  methods: {
    onClick() {
      if (this.options.clickRoute) {
        this.$router.push({ name: this.options.clickRoute });
      }
    },
  },
  filters: {
    filterProxy(value, renderer) {
      if (renderer) {
        return renderer(value);
      } else {
        return value;
      }
    }
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-stat-widget-fg: white;
  --vuestro-stat-widget-font-size: 24px;
  --vuestro-stat-widget-font-weight: 300;
  --vuestro-stat-widget-value-font-size: 36px;
}
.vuestro-app.mobile {
  --vuestro-stat-widget-font-size: 32px;
}

</style>
<style scoped>

.vuestro-stat-widget-title {
  color: var(--vuestro-stat-widget-fg);
  font-size: var(--vuestro-stat-widget-font-size);
  padding-top: 0.3em;
  padding-left: 0.4em;
  font-weight: var(--vuestro-stat-widget-font-weight);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
  cursor: default;
  margin-right: auto;
}
.vuestro-stat-widget-value {
  color: var(--vuestro-stat-widget-fg);
  margin-left: auto;
  font-size: var(--vuestro-stat-widget-value-font-size);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
}
.vuestro-stat-widget-clickable {
  cursor: pointer;
}

.vuestro-stat-widget-icon {
  color: var(--vuestro-stat-widget-fg);
  margin-left: 0.4em;
}
.vuestro-stat-widget-icon >>> svg {
  width: 2em;
  height: 2em;
}

.vuestro-stat-widget-trend {
  margin: 0 0.5em 0 0.5em;
  font-size: 1.1em;
  font-weight: 300;
  display: flex;
  gap: 0.1em;
}

.vuestro-stat-widget-buttons {
  display: flex;
  align-items: flex-start;
}

/*CHART*/
.vuestro-stat-widget-chart {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>