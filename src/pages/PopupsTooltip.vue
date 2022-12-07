<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-green)">
      <template #heading>Tooltips</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        VuestroTooltip provides a fully template-able Vue tooltip.
      </template>

      <vuestro-container justify="space-between">
        <vuestro-tooltip min-width="200">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>top</vuestro-button>
        </vuestro-tooltip>

        <vuestro-tooltip position="left">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>left</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="right">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>right</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="bottom">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>bottom</vuestro-button>
        </vuestro-tooltip>
      </vuestro-container>

      <vuestro-container justify="space-between">
        <vuestro-tooltip position="left">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>left</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip>
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>top</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="bottom">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>bottom</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="right">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button>right</vuestro-button>
        </vuestro-tooltip>
      </vuestro-container>

    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip>
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip position="bottom">
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>Tooltip on icon</template>
      <div class="example-container">
        <vuestro-tooltip position="bottom" no-wrap>
          <template #content>Download entire log as JSON</template>
          <vuestro-button round no-border>
            <vuestro-icon name="download"></vuestro-icon>
          </vuestro-button>
        </vuestro-tooltip>
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>Disabled Tooltip</template>
      <template #description><span>Tooltip can be manually opened and closed in response to method call. Methods provided are <em>open()</em>, <em>close()</em>, and <em>openForMs(milliseconds)</em></span></template>
      <vuestro-container justify="space-between">
        <vuestro-tooltip position="right" no-wrap disabled ref="disabledTooltip">
          <template #content>Download entire log as JSON</template>
          <vuestro-button round no-border>
            <vuestro-icon name="download"></vuestro-icon>
          </vuestro-button>
        </vuestro-tooltip>
        <vuestro-container grow="0">
          <vuestro-button variant="success" @click="$refs.disabledTooltip.open()">Open Tooltip</vuestro-button>
          <vuestro-button variant="danger" @click="$refs.disabledTooltip.close()">Close Tooltip</vuestro-button>
          <vuestro-button variant="info" @click="$refs.disabledTooltip.openForMs(1000)">Open For 1000ms</vuestro-button>
        </vuestro-container>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>Open on click</template>
      <div class="example-container">
        <vuestro-tooltip position="bottom" no-wrap click-to-open>
          <template #content>I was clicked to open</template>
          <vuestro-button round no-border>
            <vuestro-icon name="download"></vuestro-icon>
          </vuestro-button>
        </vuestro-tooltip>
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>Built-in 2-click Confirm popup</template>
      <div class="example-container">
        <vuestro-confirm position="right" @confirm="onClick"></vuestro-confirm>
        <vuestro-confirm position="bottom" @confirm="onClick"></vuestro-confirm>
        <vuestro-confirm position="top" @confirm="onClick"></vuestro-confirm>
        <vuestro-confirm position="left" @confirm="onClick"></vuestro-confirm>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'Popups',
  data() {
    return {
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
    };
  },
	methods: {
		onClick() {
			console.log('click');
		},
		onAfterOpen() {
		  console.log('opened');
		},
	}
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container-center {
  display: flex;
  justify-content: center;
}
.example-container.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
.example-container.dark {
  padding: 30px 20px 80px 10px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
  justify-content: space-between;
}

.example-vertical-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>