<template>
  <vuestro-panel class="vuestro-chart-panel" frame draggable>
    <template #title>{{ options.title }}</template>
    <component :is="options.component" :data="data" :options="options"></component>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'VuestroChartWidget',
  props: {
    data: { required: true },
    options: { type: Object, required: true },
  },
};

</script>

<style scoped>

</style>