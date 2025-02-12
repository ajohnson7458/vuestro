<template>
  <div class="vuestro-mini-sidebar-item"
       :class="{ bottom: route.meta && route.meta.sidebarBottom }"
       @mouseleave="onLeave">
    <!--ICON-->
    <div class="vuestro-mini-sidebar-icon"
         :class="{ 'vuestro-router-link-active': isParentRoute }"
         :style="{ 'background-color': route.meta.bgColor, color: route.meta.fgColor }"
         @mouseover="onHover"
         @click="tryPush">
      <vuestro-icon v-if="route.meta.icon" :name="route.meta.icon"></vuestro-icon>
      <span v-if="route.meta.svg" v-html="route.meta.svg"></span>
    </div>
    <!--POPUP-->
    <div ref="popup"
         class="vuestro-mini-sidebar-popup"
         :style="popupStyle">
      <div class="vuestro-mini-sidebar-popup-title">
        <span class="no-select">{{ route.meta.title }}</span>
        <template v-if="route.meta.badgeComponent">
          <component :is="route.meta.badgeComponent"></component>
        </template>
      </div>
      <vuestro-sub-routes v-if="route.children && route.children.length > 0"
                          :role="role" :route="route">
      </vuestro-sub-routes>
      <!--VUEX CHILDREN-->
      <template v-if="route.meta.vuex">
        <vuestro-sub-routes :route="vuexRoute" to-path></vuestro-sub-routes>
        <div v-if="route.meta.vuexMessage && vuexSubRoutes"
             class="vuestro-mini-sidebar-vuex-message">
          {{ route.meta.vuexMessage }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroMiniSidebarItem',
  props: {
    role: { type: [String, Array, Object], default: () => [] }, // user role
    route: { type: Object, required: true },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    basePath() {
      return this.route.path.split('/:')[0]; // remove any params
    },
    isParentRoute() {
      return this.$route.fullPath.startsWith(this.basePath);
    },
    vuexRoute() {
      return {
        path: this.basePath,
        children: this.$store.getters[this.route.meta.vuex],
      };
    },
    vuexSubRoutes() {
      if (this.vuexRoute)
      return _.filter(this.vuexRoute.children, function(o) { return o.meta.sidebar; }).length === 0;
    },
    popupStyle() {
      let style = {
        visibility: this.active ? 'visible':'hidden',
        opacity: this.active ? '1':'0',
      };
      if (this.$el && this.$refs.popup) {
        let buttonBcr = this.$el.getBoundingClientRect();
        let popupBcr = this.$refs.popup.getBoundingClientRect();
        style.left = `${buttonBcr.width}px`;
        // auto flip the menu up when it's too close to the bottom
        if (buttonBcr.top + popupBcr.height > window.innerHeight) {
          style.bottom = `${window.innerHeight - buttonBcr.bottom}px`;
        } else {
          style.top = `${buttonBcr.top}px`;
        }
      }
      return style;
    },
  },
  methods: {
    onHover() {
      this.active = true;
      // set position for popup

    },
    onLeave() {
      this.active = false;
    },
    tryPush() {
      if (this.route.children && this.route.children.length > 0) {
        // go to first child
        this.$router.push(this.route.children[0]).catch(() => {});
      } else {
        // go to self if no children
        this.$router.push(this.route).catch(() => {});
      }
    },
  },
};

</script>

<style scoped>

.vuestro-mini-sidebar-item {
  height: var(--vuestro-sidebar-item-height);
  flex: none; /* don't let flex squash us */
}

.vuestro-mini-sidebar-item.bottom {
  margin-top: auto;
}

.vuestro-mini-sidebar-icon {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
}

.vuestro-mini-sidebar-icon.vuestro-router-link-exact-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-item-active-fg);
}
.vuestro-mini-sidebar-icon.vuestro-router-link-active {
  background-color: var(--vuestro-sidebar-item-hover) !important;
  border-left: var(--vuestro-sidebar-active-border);
}
.vuestro-mini-sidebar-item:hover,
.vuestro-mini-sidebar-icon.vuestro-router-link-active:hover {
  background-color: var(--vuestro-sidebar-item-hover);
  border-radius: 0;
}

/* popup sub-menu */
.vuestro-mini-sidebar-popup {
  width: var(--vuestro-sidebar-normal-width);
  background-color: var(--vuestro-sidebar-item-hover);
  color: var(--vuestro-sidebar-fg);
  position: fixed;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
  padding-right: var(--vuestro-sidebar-radius);
  z-index: 3000;
}

.vuestro-mini-sidebar-popup > .vuestro-mini-sidebar-popup-title {
  background-color: var(--vuestro-sidebar-item-hover);
  line-height: var(--vuestro-sidebar-item-height);
  padding-left: 5px;
  padding-right: 15px;
  font-size: 15px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vuestro-mini-sidebar-popup > .sidebar-subnav {
  margin-bottom: 10px;
}

.vuestro-mini-sidebar-vuex-message {
  padding: 0.4em;
  font-size: 0.8em;
  width: 100%;
  text-align: center;
}

</style>