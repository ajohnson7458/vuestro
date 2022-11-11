<template>
  <span class="vuestro-async-text">
    <span class="vuestro-async-text-spinner" v-if="value === null || value === undefined">
       <!-- use invisible chars to make vertical size close to correct-->
      &#8203;<vuestro-icon name="spinner" pulse></vuestro-icon>
    </span>
    <template v-else>{{ value }}</template>
  </span>
</template>

<script>

export default {
  name: 'VuestroAsyncText',
  props: ['value'],
};

</script>

<style scoped>

.vuestro-async-text-spinner {
  display: flex;
}

</style>