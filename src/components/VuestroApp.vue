//
// This is the main entry point to Vuestro, your app should have an instance of this component at the outermost layer
//
<template>
  <div class="vuestro-app" :class="{ mobile: $root.mobile, 'vuestro-dark': isDark }">
    <transition name="vuestro-app-modes" mode="out-in">
      <!--MAIN TEMPLATE-->
      <div v-if="authenticated && !loading" class="vuestro-app-main" key="main">

        <!--NAVBAR SLOT-->
        <slot name="navbar"></slot>

        <div class="vuestro-content">
          <!--SIDEBAR SLOT-->
          <template v-if="!$root.mobile">
            <slot name="sidebar"></slot>
          </template>

          <!--MAIN PAGE VIEW-->
          <div ref="routerView" class="vuestro-router-view" @scroll="onScroll">
            <!--PRE-CONTENT SLOT (FOR STUFF LIKE A NOTIFICATION BAR)-->
            <slot name="pre-content"></slot>
            <transition name="vuestro-app-pages" mode="out-in" @after-leave="onRouterTransitionDone">
              <keep-alive> <!-- vue router option for persistent state -->
                <router-view :key="$route.path"/> <!-- key off of path for uniqueness -->
              </keep-alive>
            </transition>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

      <!--SLOT FOR CUSTOM LOADING PAGE-->
      <div v-else-if="authenticated && loading" key="loading">
        <slot name="loading"></slot>
      </div>

      <!--SLOT FOR CUSTOM LOGIN PAGE-->
      <div v-else key="login">
        <slot name="login"></slot>
      </div>
    </transition>
  </div>
</template>

<script>

/* global Event, navigator */

export default {
  name: 'VuestroApp',
  props: {
    authenticated: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    title: { type: String, default: '' },     // app title
    dark: { type: Boolean, default: false },  // dark mode
  },
  computed: {
    isDark() {
      // if store is setup to provide isDarkUI, use it
      if (this.$store && this.$store.getters.isDarkUI) {
        return this.$store.getters.isDarkUI;
      }
      // default to prop
      return this.dark;
    },
  },
  data() {
    return {
      toRoute: null,
    };
  },
  watch: {
    '$route'(to, from) {
      this.toRoute = to;
      this.setTitle();
    }
  },
  beforeMount() {
    // console.log('vuestro-app beforeMount');
    // console.log('window width', window.innerWidth);
    // console.log('ua', navigator.userAgent);
    if (navigator.userAgent.match(/Mobile/)) {
      console.log('vuestro-app going into MOBILE mode');
      this.$root.mobile = true;
    }
    this.setTitle();
  },
  methods: {
    setTitle() {
      document.title = `${this.title} - ${this.$route.meta.title}`;
    },
    onScroll(e) {
      // save content-container scroll position to this route's meta
      this.$route.meta.scrollTop = this.$refs.routerView.scrollTop;
      window.dispatchEvent(new Event('scroll'));
    },
    onRouterTransitionDone() {
      // only works if we delay 2 ticks
      this.$nextTick(() => {
        this.$nextTick(() => {
          if (this.toRoute && this.toRoute.meta) {
            this.$refs.routerView.scrollTop = this.toRoute.meta.scrollTop;
          }
        });
      });
      // emit a global resize event so widgets/charts can resize
      window.dispatchEvent(new Event('resize'));
    },
  }
};

</script>

<style>

/* GLOBAL STYLE VARIABLES */
.vuestro-app {
  /* global dimensions */
  --vuestro-base-font-size: 14px;
  --vuestro-selection-border-radius: 8px;
  --vuestro-control-border-width: 1px;
  --vuestro-control-border-radius: 5px;
  --vuestro-control-sm-height: 18px;
  --vuestro-control-md-height: 24px;
  --vuestro-control-lg-height: 30px;
  --vuestro-control-xl-height: 36px;
  --vuestro-control-margin-v: 2px;
  --vuestro-control-margin-h: 2px;
  --vuestro-primary-transition-time: 0.4s;
  --vuestro-secondary-transition-time: 0.2s;

  /* palette */
  --vuestro-indigo: #682fa1;
  --vuestro-purple: #551A8B;
  --vuestro-plum: #601A3E;
  --vuestro-lavender: #b481e0;

  --vuestro-magenta: #d831a0;
  --vuestro-pink: #f13c6e;
  --vuestro-watermelon: #fe7f9c;
  --vuestro-salmon: #f13c6e;

  --vuestro-prussian: #3b4161;
  --vuestro-navy: #004475;
  --vuestro-royal: #1a2c88;
  --vuestro-blue: #217ada;
  --vuestro-cobalt: #2163C9;
  --vuestro-cyan: #42b9cc;
  --vuestro-teal: #87e6ca;

  --vuestro-green: #4bbc79;
  --vuestro-emerald: #229649;
  --vuestro-yellow: #fff700;
  --vuestro-gold: #fce228;

  --vuestro-orange: #f47633;

  --vuestro-brick: #8a270c;
  --vuestro-red: #ea4958;
  --vuestro-crimson: #ba110c;
  --vuestro-scarlet: #ff2400;

  --vuestro-white: #fff;
  --vuestro-light: #f5f5f5;
  --vuestro-light-med: #ececec;
  --vuestro-gray: #c8c8c8;
  --vuestro-gray-med: #b3b3b3;
  --vuestro-gray-dark: #676a6f;
  --vuestro-dark: #1b1c21;
  --vuestro-darker: #131313;
  --vuestro-black: #000;

  /* semantic colors */
  --vuestro-primary: var(--vuestro-cobalt);
  --vuestro-secondary: #757575;
  --vuestro-success: var(--vuestro-green);
  --vuestro-info: var(--vuestro-cyan);
  --vuestro-warning: var(--vuestro-yellow);
  --vuestro-danger: var(--vuestro-red);

  --vuestro-muted-primary: #21529e;
  --vuestro-muted-secondary: #696767;
  --vuestro-muted-success: #3c8a5b;
  --vuestro-muted-info: #558fa5;
  --vuestro-muted-warning: #dabe5e;
  --vuestro-muted-danger: #981521;

  /* colors responsible for change to dark */
  --vuestro-content-bg: #ededed;

  --vuestro-widget-light-bg: #e0e0e0;
  --vuestro-widget-med-bg: #e0e0e0;
  --vuestro-widget-dark-bg: #2f353f;

  --vuestro-field-bg: #d1d1d1;

  --vuestro-popup-bg: #323334;
  --vuestro-popup-fg: #ddd;

  --vuestro-tooltip-opacity: 0.8;

  --vuestro-selection: #aab9d0;
  --vuestro-outline: #aaa;
  --vuestro-outline-dark: #777;
  --vuestro-active: #cfdaee;
  --vuestro-hover: #c4c7c9;

  /* text colors */
  --vuestro-text-color: #323334;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #777;
  --vuestro-text-color-inverse: #eee; /* inverse text, changes with theme */
  --vuestro-text-color-light: #fff; /* meant for always light text */
  --vuestro-text-color-dark: #323334; /* meant for always dark text */
}

/* DARK UI OVERRIDES */
.vuestro-dark {
  --vuestro-content-bg: #1b1c21;
  --vuestro-content-bg-alt: #2e2f34;

  --vuestro-widget-dark-bg: #383b3f;
  --vuestro-widget-light-bg: var(--vuestro-widget-dark-bg);

  --vuestro-field-bg: var(--vuestro-darker);
  --vuestro-outline: #7d7d7d;
  --vuestro-outline-dark: #444;
  --vuestro-active: #37383a;
  --vuestro-hover: #535456;
  --vuestro-popup-bg: #323334;

  --vuestro-indigo: #441473;
  --vuestro-purple: #8747c1;
  --vuestro-plum: #7c1f4e;
  --vuestro-lavender: #b481e0;

  --vuestro-magenta: #bd2c70;
  --vuestro-pink: #e04aad;
  --vuestro-watermelon: #de5676;
  --vuestro-salmon: #ff7965;

  --vuestro-prussian: #1f2233;
  --vuestro-navy: #002540;
  --vuestro-royal: #101c5a;
  --vuestro-blue: #27538a;
  --vuestro-cobalt: #2163C9;
  --vuestro-cyan: #1787b0;
  --vuestro-teal: #136f6a;

  --vuestro-green: #137139;
  --vuestro-emerald: #229649;
  --vuestro-yellow: #c1a529;
  --vuestro-gold: #b38c05;

  --vuestro-orange: #ed6b26;
  --vuestro-brick: #8a270c;
  --vuestro-red: #de1f31;
  --vuestro-crimson: #ba110c;
  --vuestro-scarlet: #dd0000;

  --vuestro-light: #9e9999;
  --vuestro-light-med: #878585;

  --vuestro-gray: #656565;
  --vuestro-gray-med: #424141;
  --vuestro-gray-dark: #3a3a3a;

  --vuestro-primary: var(--vuestro-cobalt);
  --vuestro-secondary: var(--vuestro-light-med);
  --vuestro-success: var(--vuestro-green);
  --vuestro-info: var(--vuestro-cyan);
  --vuestro-warning: var(--vuestro-yellow);
  --vuestro-danger: var(--vuestro-red);

  --vuestro-muted-primary: #21529e;
  --vuestro-muted-secondary: #696767;
  --vuestro-muted-success: #106532;
  --vuestro-muted-info: #106686;
  --vuestro-muted-warning: #826500;
  --vuestro-muted-danger: #981521;

  --vuestro-selection: var(--vuestro-cobalt);

  --vuestro-text-color: #ddd;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
  --vuestro-text-color-inverse: #323334; /* inverse text, changes with theme */
  --vuestro-text-color-light: #ddd; /* meant for always light text */
  --vuestro-text-color-dark: #323334; /* meant for always dark text */
}

.vuestro-app.mobile {
  --vuestro-base-font-size: 32px;
  --vuestro-control-border-radius: 10px;
  --vuestro-control-border-width: 2px;
  --vuestro-control-sm-height: 42px;
  --vuestro-control-md-height: 50px;
  --vuestro-control-lg-height: 64px;
  --vuestro-control-xl-height: 74px;
  --vuestro-control-margin-v: 7px;
  --vuestro-control-margin-h: 5px;
}

/*MISC STYLES FOR USE IN TABLES, ETC*/
.vuestro-mla {
  margin-left: auto;
}
.vuestro-mra {
  margin-right: auto;
}
.vuestro-clickable {
  cursor: pointer;
}
.vuestro-text-center {
  text-align: center;
}
.vuestro-text-monospace {
  font-family: Monaco, monospace;
}
.vuestro-text-larger {
  font-size: 1.15em;
}
.vuestro-text-smaller {
  font-size: 0.85em;
}
.vuestro-text-bold {
  font-weight: 500;
}
.vuestro-text-light {
  font-weight: 300;
}
.vuestro-text-uppercase {
  text-transform: uppercase;
}
.vuestro-text-lowercase {
  text-transform: lowercase;
}
.vuestro-text-underline {
  text-decoration: underline;
}
.vuestro-text-italic {
  font-style: italic;
}
.vuestro-text-muted {
  color: var(--vuestro-text-color-muted);
}
.vuestro-text-primary {
  color: var(--vuestro-primary);
}
.vuestro-text-secondary {
  color: var(--vuestro-secondary);
}
.vuestro-text-success {
  color: var(--vuestro-success);
}
.vuestro-text-info {
  color: var(--vuestro-info);
}
.vuestro-text-warning {
  color: var(--vuestro-warning);
}
.vuestro-text-danger {
  color: var(--vuestro-danger);
}

</style>

<style scoped>

@font-face {
  font-family: 'Vuestro';
  src: url('../assets/Quicksand-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Vuestro';
  src: url('../assets/Quicksand-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Vuestro';
  src: url('../assets/Quicksand-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Vuestro';
  src: url('../assets/Quicksand-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.vuestro-app >>> *, :after, :before {
  box-sizing: border-box;
}

.vuestro-app {
  color: var(--vuestro-text-color);
  font-size: var(--vuestro-base-font-size);
  font-family: 'Vuestro', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeLegibility;
  min-height: 100%; /* stretches app down to bottom edge of body */
  background-color: var(--vuestro-content-bg);
  transition: background-color 0.4s;
}
/* wrapper div to allow transitions to work between login, loading, main states */
.vuestro-app > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.vuestro-app-modes-enter-active, .vuestro-app-modes-leave-active {
  transition: opacity var(--vuestro-primary-transition-time);
}
.vuestro-app-modes-enter, .vuestro-app-modes-leave-to {
  opacity: 0;
}

.vuestro-app-pages-enter-active, .vuestro-app-pages-leave-active {
  transition: opacity var(--vuestro-secondary-transition-time);
}
.vuestro-app-pages-enter, .vuestro-app-pages-leave-to {
  opacity: 0;
}

.vuestro-content {
  flex: 1 1 auto; /* make the content stretch to bottom of .vuestro-app */
  display: flex;
  overflow: hidden; /* lets .vuestro-router-view do the scrolling */
  transition: all var(--vuestro-primary-transition-time);
}

.vuestro-router-view {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  position: relative;
  overflow: auto;
}

/* global override of input font */
.vuestro-app >>> input {
  font-family: 'Vuestro';
}

/* global override of link colors */
.vuestro-app >>> a {
  color: var(--vuestro-primary);
}
.vuestro-app >>> a:visited {
  color: var(--vuestro-purple);
}

.vuestro-app >>> p {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}

</style>