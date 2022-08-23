<template>
  <div class="vuestro-markedown" v-html="rendered">
  </div>
</template>

<script>

import { marked } from 'marked';

export default {
  name: 'VuestroMarkdown',
  props: {
    value: { type: String },
  },
  computed: {
    rendered() {
      return marked.parse(this.value);
    }
  },
};

</script>

<style scoped>


</style>