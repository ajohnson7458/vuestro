<template>
  <span class="vuestro-icon"
        :class="[`vuestro-icon-${variant}`]">
    <font-awesome-icon :icon="name"
          :size="size"
          :transform="getTransform()"
          :spin="spin"
          :inverse="inverse"
          :pulse="pulse"
          :flip="flip"
          :rotation="rotation"
          :bounce="bounce"
          :beat="beat"
          :fade="fade"
          :shake="shake"
          :label="label"
          :title="title"
          :fixed-width="fixedWidth">
    </font-awesome-icon>
    <div v-if="counter" class="vuestro-icon-counter">{{ value }}</div>
    <div v-if="slash" class="vuestro-icon-slash"
         :style="{ 'background-color': slash }">
    </div>
    <slot></slot>
  </span>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);

export default {
  name: 'VuestroIcon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    name: { type: String, required: true },           // font awesome icon name (use prefix for brands, etc)
    size: { type: String, default: '1x' },            // 2xs to 2xl as well as literal sizing from 1x to 10x
    scale: { type: [String, Number], default: null }, // positive number for grow, negative for shrink, does not increase size/boundaries
    spin: { type: Boolean, default: false },          // flag to enable spin animation
    inverse: { type: Boolean, default: false },       // flag to enable inverse animation
    pulse: { type: Boolean, default: false },         // flag to enable pulse animation
    bounce: { type: Boolean, default: false },        // flag to enable bounce animation
    beat: { type: Boolean, default: false },          // flag to enable beat animation
    fade: { type: Boolean, default: false },          // flag to enable fade animation
    shake: { type: Boolean, default: false },         // flag to enable shake animation
    flip: { type: String, default: null },            // flag to enable flip animation
    rotation: { type: String, default: null },        // flag to enable rotation animation
    label: { type: String },                          // label to add
    title: { type: String },
    variant: { type: String, default: 'none' },
    fixedWidth: { type: Boolean, default: false },
    transform: { type: String, default: '' },
    counter: { type: Boolean, default: false },
    value: { type: Number, default: null },
    slash: { type: String, default: false },          // set to color to render a slash over the icon
  },
  methods: {
    getTransform() {
      let ret = this.transform; // from prop
      // append scale as a transform
      if (this.scale !== null) {
        ret += `grow-${this.scale}`;
      }
      return ret;
    },
  },
};

</script>

<style scoped>

.vuestro-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.vuestro-icon-primary > svg {
  color: var(--vuestro-primary);
}
.vuestro-icon-secondary > svg {
  color: var(--vuestro-secondary);
}
.vuestro-icon-success > svg {
  color: var(--vuestro-success);
}
.vuestro-icon-warning > svg {
  color: var(--vuestro-warning);
}
.vuestro-icon-danger > svg {
  color: var(--vuestro-danger);
}
.vuestro-icon-info > svg {
  color: var(--vuestro-info);
}
.vuestro-icon-counter {
  position: absolute;
  top: -0.7em;
  right: -0.5em;
  background-color: var(--vuestro-icon-count-color, var(--vuestro-info));
  border-radius: 999px;
  padding: 0 0.3em;
  font-size: 0.8em;
  white-space: nowrap;
}
.vuestro-app.mobile .vuestro-icon-counter {
  right: -1em;
}

.vuestro-app.mobile .vuestro-icon > svg {
  width: 0.8em;
  height: 0.8em;
}

.vuestro-icon-slash {
  width: 141%;
  height: 0.3em;
  position: absolute;
  top: 50%;
  /* rotate to diagonal */
  transform: rotate(-45deg);
}

</style>