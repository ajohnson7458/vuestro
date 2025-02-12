// panel component for grouping together UI elements
//
//
// CSS Vars:
//  --vuestro-panel-bg
//  --vuestro-panel-fg
//  --vuestro-panel-toolbar-bg
//  --vuestro-panel-toolbar-fg
//  --vuestro-panel-toolbar-border - bottom border spec for titlebar only
//  --vuestro-panel-border - border spec
//  --vuestro-panel-box-shadow
//  --vuestro-panel-border-radius - global border-radius for panel
//  --vuestro-panel-titlebar-min-height
//  --vuestro-panel-title-padding - padding inside title slot
//  --vuestro-panel-titlebar-padding - padding inside titlebar
//
//
<template>
  <div class="vuestro-panel"
       :class="[ `vuestro-panel-${variant}`, gutter,
                 { isCollapsed, collapsible, scroll, noStretch, noBorder, hasTitlebar, hasContent }]"
       :style="style">
    <!--TOOLBAR-->
    <div v-if="hasTitlebar" class="vuestro-panel-title-toolbar">
      <!--CARET FOR COLLAPSE-->
      <vuestro-caret v-if="collapsible"
                     :collapsed="isCollapsed"
                     @click="toggleCollapse">
      </vuestro-caret>
      <!--TITLE (LEFT-JUSTIFIED)-->
      <vuestro-title class="vuestro-panel-title"
                     :spinner="spinner"
                     :clickable="collapsible"
                     :draggable="draggable"
                     @click="toggleCollapse">
        <!--TITLE ICON-->
        <template v-if="$slots.icon" #icon>
          <slot name="icon"></slot>
        </template>
        <!--TITLE SLOT-->
        <slot name="title"></slot>
      </vuestro-title>
      <!--TOOLBAR SLOT-->
      <div v-if="$scopedSlots.toolbar" class="vuestro-panel-toolbar">
        <!--EXPOSE COLLAPSE STATE TO TOOLBAR TO ENABLE A 'CANCEL' BUTTON-->
        <slot name="toolbar"
              :isCollapsed="isCollapsed"
              :toggleCollapse="toggleCollapse">
        </slot>
      </div>
    </div>
    <!--CONTENTS-->
    <div class="vuestro-panel-contents-wrapper" :class="[ contentPadding, { isCollapsed, scroll, frame, overflowHidden, row }]">
      <!--LIVE CONTENTS (ALWAYS IN DOM)-->
      <template v-if="!deferContent">
        <div ref="contents" v-show="!isCollapsed" class="vuestro-panel-contents" @scroll="updateScroll">
          <slot :isCollapsed="isCollapsed" :toggleCollapse="toggleCollapse"></slot>
        </div>
      </template>
      <!--DEFERRED CONTENTS, USES v-if TO INSERT/REMOVE FROM DOM ON COLLAPSE TOGGLE-->
      <template v-else>
        <div ref="contents" v-if="!isCollapsed" class="vuestro-panel-contents" @scroll="updateScroll">
          <slot :isCollapsed="isCollapsed" :toggleCollapse="toggleCollapse"></slot>
        </div>
      </template>
      <!--SCROLL ARROW-->
      <div v-if="canScroll" class="vuestro-panel-scroll-arrow">
        <vuestro-icon name="arrow-down"></vuestro-icon>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroPanel',
  props: {
    variant: { type: String, default: 'outline' },   // outline/shaded/transparent
    gutter: { type: String, default: 'md' },         // gutter size override, usually inherited
    spinner: { type: Boolean, default: false },      // true if spinner should be shown next to title to show loading status
    collapsible: { type: Boolean, default: false },  // true if collapsible, automatically adds caret
    collapsed: { type: Boolean, default: false },    // true if set collapsed mode
    deferContent: { type: Boolean, default: false }, // defer loading/rendering of content until expanded (v-show/v-if)
    contentPadding: { type: String, default: '' },   // content padding size, default is no padding, options are sm,md,lg
    scroll: { type: Boolean, default: false },       // true for scrolling content
    frame: { type: Boolean, default: false },        // true for absolutely positioned content div ("frame-mode")
    noBorder: { type: Boolean, default: false },     // true for no border
    noStretch: { type: Boolean, default: false },     // true for disable flexbox-stretch
    overflowHidden: { type: Boolean, default: false }, // true for overflow hidden on content
    draggable: { type: Boolean, default: false },    // true for .drag class and move cursor on title
    row: { type: Boolean, default: false },          // true for flexbox row mode instead of column in content
    resize: { type: String, default: null },         // enable browser resize control, set to 'both', 'horizontal', or 'vertical'
  },
  computed: {
    hasTitlebar() {
      return !!(this.$scopedSlots.title || this.$scopedSlots.toolbar || this.collapsible);
    },
    hasContent() {
      return this.$slots.default;
    },
    style() {
      if (this.resize) {
        return {
          resize: this.resize,
          overflow: 'auto',
        };
      }
    },
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      canScroll: false,
    };
  },
  watch: {
    collapsed(newVal) {
      this.isCollapsed = newVal;
    },
  },
  updated() {
    this.updateScroll();
  },
  created() {
    window.addEventListener('resize', this.updateScroll);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.canScroll = this.scroll && this.$refs.contents && (this.$refs.contents.scrollHeight - this.$refs.contents.scrollTop > this.$refs.contents.clientHeight);
    },
    toggleCollapse() {
      if (this.collapsible) {
        this.isCollapsed = !this.isCollapsed;
        this.$emit('toggle');
      }
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-panel-bg: #fff;
  --vuestro-panel-fg: inherit;
  --vuestro-panel-border: none;
  --vuestro-panel-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.15);
  --vuestro-panel-border-radius: var(--vuestro-control-border-radius);
  --vuestro-panel-titlebar-min-height: 1.8em;
}

.vuestro-dark.vuestro-app {
  --vuestro-panel-bg: var(--vuestro-content-bg-alt);
  --vuestro-panel-fg: var(--vuestro-text-color);
  --vuestro-panel-border: var(--vuestro-control-border-width) solid var(--vuestro-outline);
}

</style>

<style scoped>

.vuestro-panel.lg {
  --gutter-size: 30px;
}
.vuestro-panel.md {
  --gutter-size: 16px;
}
.vuestro-panel.sm {
  --gutter-size: 8px;
}
.vuestro-panel.none {
  --gutter-size: 0px;
}

.vuestro-panel {
  background-color: var(--vuestro-panel-bg);
  color: var(--vuestro-panel-fg);
  transition: background-color 0.4s;
  box-shadow: var(--vuestro-panel-box-shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  flex-grow: 1;
}
.vuestro-panel.noStretch,
.vuestro-panel.collapsible {
  flex-grow: 0;
}
.vuestro-panel:not(:first-child) {
  margin-top: var(--gutter-size);
}
.vuestro-panel.noBorder {
  box-shadow: none;
  border: none;
}
/*VARIANTS*/
.vuestro-panel-outline {
  border: var(--vuestro-panel-border);
  border-radius: var(--vuestro-panel-border-radius);
}
.vuestro-panel-shaded {
  background-color: var(--vuestro-field-bg);
  border-radius: var(--vuestro-panel-border-radius);
}
.vuestro-panel-transparent {
  background-color: transparent;
  box-shadow: none;
}

/*TOOLBAR*/
.vuestro-panel-title-toolbar {
  min-height: var(--vuestro-panel-titlebar-min-height);
  display: flex;
  align-items: center;
  border-bottom: var(--vuestro-panel-toolbar-border);
  background-color: var(--vuestro-panel-toolbar-bg);
  border-top-left-radius: calc(var(--vuestro-panel-border-radius) - 1px);
  border-top-right-radius: calc(var(--vuestro-panel-border-radius) - 1px);
  padding: var(--vuestro-panel-titlebar-padding, 0 0.2em);
}
.vuestro-panel.isCollapsed .vuestro-panel-title-toolbar,
.vuestro-panel:not(.hasContent) .vuestro-panel-title-toolbar {
  border-bottom-left-radius: calc(var(--vuestro-panel-border-radius) - 1px);
  border-bottom-right-radius: calc(var(--vuestro-panel-border-radius) - 1px);
}
.vuestro-panel-title {
  flex-grow: 1;
  padding: var(--vuestro-panel-title-padding, 0.2em 0.4em);
  color: var(--vuestro-panel-toolbar-fg);
}
.vuestro-panel-toolbar {
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
  color: var(--vuestro-panel-toolbar-fg);
}

/*CONTENTS*/
.vuestro-panel-contents-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
}
.vuestro-panel-contents {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 100%;
}
.vuestro-panel-contents-wrapper.row > .vuestro-panel-contents {
  flex-direction: row;
}
.vuestro-panel-contents-wrapper.sm {
  margin: 0.1em;
}
.vuestro-panel-contents-wrapper.md {
  margin: 0.4em;
}
.vuestro-panel-contents-wrapper.lg {
  margin: 0.7em;
}
.vuestro-panel.hasTitlebar .vuestro-panel-contents-wrapper {
  margin-top: 0px;
}
.vuestro-panel-contents-wrapper.isCollapsed {
  margin: 0;
}
.vuestro-panel-contents-wrapper.scroll > .vuestro-panel-contents,
.vuestro-panel-contents-wrapper.frame > .vuestro-panel-contents {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vuestro-panel-contents-wrapper.scroll > .vuestro-panel-contents {
  overflow: auto;
}
.vuestro-panel-contents-wrapper.overflowHidden > .vuestro-panel-contents {
  overflow: hidden;
}

/* reset top padding when toolbar is present */
.vuestro-panel-contents:not(:only-child) {
  padding-top: 0;
}

.vuestro-panel-scroll-arrow {
  color: var(--vuestro-text-color-muted);
  position: absolute;
  right: 0.4em;
  bottom: 0.4em;
}

</style>