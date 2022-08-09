// An inline component to denote code, keywords, key-strokes
//
// CSS Vars:
// --vuestro-code-border - border style (default is 1px dashed)
//
<template>
  <span class="vuestro-code" :class="{ clipboard }">
    <slot></slot><span v-if="clipboard">
      <vuestro-button round no-border no-margin size="sm" @click="onCopy">
        <vuestro-icon v-if="!copiedToClipboard" name="clipboard"></vuestro-icon>
        <vuestro-icon v-else name="check" variant="success"></vuestro-icon>
      </vuestro-button>
    </span>
  </span>
</template>

<script>

/* global navigator */

export default {
  name: 'VuestroCode',
  props: {
    clipboard: { type: Boolean, default: false }, // enable the copy to clipboard button
  },
  data() {
    return {
      copiedToClipboard: false,
    };
  },
  methods: {
    onCopy() {
      navigator.clipboard.writeText(this.$slots.default[0].text);
      this.copiedToClipboard = true;
      setTimeout(() => {
        this.copiedToClipboard = false;
      }, 2000);
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-code-font-family: monospace;
}

</style>

<style scoped>

.vuestro-code {
  font-family: var(--vuestro-code-font-family);
  border: var(--vuestro-code-border, 1px dashed var(--vuestro-outline));
  padding: 0 0.3em;
  border-radius: var(--vuestro-selection-border-radius);
  background-color: var(--vuestro-field-bg);
  box-shadow: inset 0 0 0.2em var(--vuestro-gray-dark);
}

.vuestro-code.clipboard {
  padding-right: 0;
}

.vuestro-button {
  display: inline-block;
}

</style>