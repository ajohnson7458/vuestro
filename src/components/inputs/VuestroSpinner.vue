<template>
  <div class="vuestro-spinner" :class="{ noMargin }">
    <vuestro-button round no-border no-margin size="lg" @click="increase">
      <vuestro-icon name="chevron-up"></vuestro-icon>
    </vuestro-button>
    <div class="vuestro-spinner-text">
      <div v-if="$scopedSlots.placeholder" class="vuestro-spinner-placeholder">
        <slot name="placeholder"></slot>
      </div>
      <vuestro-editable-text :value="value"
                             :render="render"
                             :validator="validateNumber"
                             @input="setNumber"
                             @focus="">
      </vuestro-editable-text>
    </div>
    <vuestro-button round no-border no-margin size="lg" @click="decrease">
      <vuestro-icon name="chevron-down"></vuestro-icon>
    </vuestro-button>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroSpinner',
  props: {
    value: { type: null, required: true },         // v-model compatible value bind
    step: { type: null, default: 1 },              // step size for spinner buttons
    render: { type: Function, default: (d) => d }, // function called to render value
    noMargin: { type: Boolean, default: false },   // remove margins
  },
  methods: {
    increase() {
      this.$emit('input', _.toNumber(this.value) + _.toNumber(this.step));
    },
    decrease() {
      this.$emit('input', _.toNumber(this.value) - _.toNumber(this.step));
    },
    validateNumber(d) {
      return _.isFinite(_.toNumber(d));
    },
    setNumber(d) {
      this.$emit('input', _.toNumber(d));
    },
  }
};

</script>

<style scoped>

.vuestro-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
}
.vuestro-spinner.noMargin {
  margin: 0;
}

.vuestro-spinner-text {
  text-align: center;
}

.vuestro-spinner-placeholder {
  font-size: 0.5em;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

</style>