<template>
  <vuestro-container>
    <vuestro-card cols="6">
      <vuestro-panel>VuestroPanel - a versatile container which provides a background and border for dimension</vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel :stretch="false" content-padding="sm">Set the content-padding to "sm"...</vuestro-panel>
    </vuestro-card>
    <vuestro-card cols="6">
      <vuestro-panel :stretch="false" content-padding="md">..."md"...</vuestro-panel>
    </vuestro-card>
    <vuestro-card cols="6">
      <vuestro-panel content-padding="lg">..."lg" to add padding to VuestroPanel contents.</vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel content-padding="lg">
        <template #title>Vuestro Panel</template>
        <template #toolbar>
          <vuestro-button size="sm" no-border pill>
            <template #icon>
              <vuestro-icon name="sync-alt"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
          <vuestro-dropdown click-open>
            <template #button>
              <vuestro-button size="sm" no-border pill>Options</vuestro-button>
            </template>
            <vuestro-list-button>Menu Item 1</vuestro-list-button>
            <vuestro-list-button>Menu Item 2</vuestro-list-button>
          </vuestro-dropdown>
          <vuestro-button size="sm" no-border round>
            <vuestro-icon name="times"></vuestro-icon>
          </vuestro-button>
        </template>
        <div>VuestroPanel has a title slot for a nice title, and a toolbar slot for adding controls such as VuestroButton</div>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel content-padding="lg" style="--vuestro-panel-bg: var(--vuestro-purple)">
        <template #title>Colorized Vuestro Panel Titlebar</template>
        <template #toolbar>
          <vuestro-button size="sm" no-border pill variant="white">
            <template #icon>
              <vuestro-icon name="sync-alt"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
          <vuestro-button size="sm" no-border round>
            <vuestro-icon name="at"></vuestro-icon>
          </vuestro-button>
          <vuestro-button size="sm" no-border round variant="danger">
            <vuestro-icon name="times"></vuestro-icon>
          </vuestro-button>
        </template>
        <p>Colorize the panel background by setting CSS vars</p>
        <p>Set the stretch property to false to prevent the panel from stretching to available vertical space.</p>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel collapsible content-padding="lg">
        <template #title>Collapsible Panel</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
              <br><br>
              Even if the content is tall, the Vuestro containers will all adjust so that the content is shown and the footer is pushed down.
              <br><br>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
      <vuestro-panel collapsible collapsed>
        <template #title>Collapsed by default</template>
        <template #toolbar="{ isCollapsed, toggleCollapse }">
          <vuestro-button v-if="!isCollapsed"
                          pill size="sm"
                          @click="toggleCollapse">
            Let me close that for you
          </vuestro-button>
        </template>
        <vuestro-container>
          <vuestro-card>
            <template #description>Set the collapsed property to have the panel be collapsed by default.
              <br><br>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
      <vuestro-panel collapsible defer-content>
        <template #icon>
          <vuestro-icon name="drafting-compass"></vuestro-icon>
        </template>
        <template #title>Collapsible Panel with deferred content rendering</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
            </template>
            <span>
              VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
              <br><br>
              Defer the rendering of the contents until the panel is expanded by setting the <em>defer-content</em> property.
              <br><br>
            </span>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel spinner>
        <template #title>Vuestro Panel</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>Set the spinner property to show a loading indicator if panel contents is async.</template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel class="dark-toolbar">
        <template #title>Vuestro Panel</template>
        <template #toolbar>
          <vuestro-button size="sm" pill variant="white" no-border>
            <template #icon>
              <vuestro-icon name="sync-alt"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
        </template>
        <vuestro-container>
          <vuestro-card>
            <template #description>CSS themed panel title bar (--vuestro-panel-toolbar-bg and --vuestro-panel-toolbar-fg)</template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel no-border>
        <template #title>Vuestro Panel with no border</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <em>no-border</em> property to remove the default shadow/border.</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel>
        <template #icon>
          <vuestro-icon name="drafting-compass"></vuestro-icon>
        </template>
        <template #title><span>Vuestro Panel with <vuestro-code>icon</vuestro-code> set</span></template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Add a VuestroIcon to the <vuestro-code>icon</vuestro-code> slot to render an icon on the titlebar</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel draggable>
        <template #title>Vuestro Panel with draggable title</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <vuestro-code>draggable</vuestro-code> property</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel variant="shaded">
        <template #title>Vuestro Panel Shaded Variant</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <vuestro-code>variant="shaded"</vuestro-code> property</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel variant="transparent">
        <template #title>Vuestro Panel Transparent Variant</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <vuestro-code>variant="transparent"</vuestro-code> property</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel class="colorized-toolbar" collapsible collapsed>
        <template #title>Collapsible with colorized toolbar</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <vuestro-code>--vuestro-panel-toolbar-bg</vuestro-code> CSS var</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
      <vuestro-panel no-stretch style="--vuestro-panel-toolbar-bg: var(--vuestro-blue)">
        <template #title>Colorized title-only</template>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel resize="both">
        <template #title>Resizable Vuestro Panel</template>
        <vuestro-container>
          <vuestro-card>
            <template #description>
              <span>Set the <vuestro-code>resize="both"</vuestro-code> property</span>
            </template>
          </vuestro-card>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'ContainersPanel',
};

</script>

<style scoped>

.dark-toolbar {
  --vuestro-panel-toolbar-bg: var(--vuestro-dark);
  --vuestro-panel-toolbar-fg: white;
}

.colorized-toolbar {
  --vuestro-panel-toolbar-bg: var(--vuestro-green);
}

</style>