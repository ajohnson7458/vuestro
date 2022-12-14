<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-cyan)">
      <template #heading>Typography</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroCleanKvp</template>
      <template #description>A simple and clean way to display key value pairs; placing more emphasis on the important part, the value.</template>
      <vuestro-container column>
        <vuestro-clean-kvp>
          <template #key>name</template>
          <template #value>Vuestro Library</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>version</template>
          <template #value>v1.0.0</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>date</template>
          <template #value>{{ (new Date).toISOString() }}</template>
        </vuestro-clean-kvp>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>VuestroLabel</template>
      <template #description><span>A component to use for spacing against adjacent components (e.g. icons). Use <vuestro-code>flush-left</vuestro-code> and <vuestro-code>flush-right</vuestro-code> props as needed.</span></template>
      <vuestro-container>
        <vuestro-label flush-left>Label</vuestro-label><vuestro-icon name="spinner" pulse></vuestro-icon>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>VuestroCode</template>
      <template #description><span>A component to use for displaying code or code-like snippets using monospace font, add the <vuestro-code>clipboard</vuestro-code> property to add a copy button</span></template>
      <p>
        <vuestro-code>x = 1;</vuestro-code> or copyable: <vuestro-code clipboard>y = 2;</vuestro-code>
      </p>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>Async Text</template>
      <template #description>
        <span>Simple spinner that shows for a text field that evaluates to null or undefined.</span>
      </template>
      <vuestro-container>
        <vuestro-async-text :value="asyncText"></vuestro-async-text>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>Markdown</template>
      <template #description>
        <span>Render markdown provided as a property</span>
      </template>
      <vuestro-container>
        <vuestro-markdown :value="markdownText"></vuestro-markdown>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>Search Term Highlighting</template>
      <template #description>
        <span>VuestroSearchHighlight handles rendering a string with a search term highlight</span>
      </template>
      <vuestro-container>
        <vuestro-search-highlight searchTerm="consect">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, laborum fuga nihil eligendi exercitationem suscipit aliquid deleniti eveniet aspernatur accusantium quasi ullam et iusto quis sunt odit voluptas! Maxime, recusandae? Lorem ipsum dolor sit amet, Consectetur adipisicing elit.
        </vuestro-search-highlight>
      </vuestro-container>
    </vuestro-card>
    <vuestro-card>
      <vuestro-container>
        <vuestro-search-highlight searchTerm="wontfindthis">String with no matches!</vuestro-search-highlight>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>Icons</template>
      <template #description>
        Vuestro currently contains all the free FontAwesome icons. They are abstracted through the VuestroIcon component, but the names and some useful props are passed through.
      </template>
      <vuestro-container>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x"></vuestro-icon>
          <div>normal</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" flip="horizontal"></vuestro-icon>
          <div>flip="horizontal"</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" flip="vertical"></vuestro-icon>
          <div>flip="vertical"</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" flip="both"></vuestro-icon>
          <div>flip="both"</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" rotation="90"></vuestro-icon>
          <div>rotation="90"</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" rotation="270"></vuestro-icon>
          <div>rotation="270"</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" spin></vuestro-icon>
          <div>spin</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" bounce></vuestro-icon>
          <div>bounce</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" beat></vuestro-icon>
          <div>beat</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" fade></vuestro-icon>
          <div>fade</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" shake></vuestro-icon>
          <div>shake</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" inverse></vuestro-icon>
          <div>inverse</div>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile">
          <vuestro-icon name="tractor" size="3x" variant="success"></vuestro-icon>
          <div>variant="success"</div>
        </vuestro-card>
        <vuestro-card>
          <vuestro-hr></vuestro-hr>
        </vuestro-card>
        <vuestro-card cols="1" class="icon-tile" v-for="i in icons" :key="i">
          <vuestro-icon :name="i" size="3x"></vuestro-icon>
          <div>{{ i }}</div>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>
    <vuestro-hr></vuestro-hr>

    <vuestro-card>
      <template #subheading>CSS Styles</template>
      <template #description>
        <span>Misc classes for use on text, e.g. in table column definitions</span>
      </template>
      <vuestro-container>
        <vuestro-card v-for="t in textClasses" :key="t">
          <div :class="t">{{ t }}</div>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Typography',
  data() {
    return {
      asyncText: null,
      markdownText: `
# Title
## SubTitle

Body Text
`,
      icons: [
        'adjust',
        'fa-brands fa-android',
        'fa-brands fa-app-store-ios',
        'fa-brands fa-apple',
        'archive',
        'archway',
        'at',
        'asterisk',
        'atlas',
        'fa-brands fa-aws',
        'balance-scale',
        'ban',
        'band-aid',
        'barcode',
        'bars',
        'battery-full',
        'bell',
        'bell-slash',
        'binoculars',
        'fa-brands fa-bitcoin',
        'fa-brands fa-bluetooth',
        'bolt',
        'bomb',
        'book',
        'book-open',
        'bookmark',
        'border-all',
        'box',
        'box-open',
        'boxes',
        'brain',
        'briefcase',
        'broadcast-tower',
        'bug',
        'building',
        'bullhorn',
        'bullseye',
        'burn',
        'calculator',
        'calendar',
        'calendar-alt',
        'calendar-week',
        'camera',
        'certificate',
        'chart-area',
        'chart-bar',
        'chart-pie',
        'check',
        'check-square',
        'chess-board',
        'fa-brands fa-chrome',
        'circle',
        'city',
        'clipboard',
        'clipboard-list',
        'clock',
        'clone',
        'cloud',
        'cloud-download-alt',
        'code',
        'cog',
        'cogs',
        'coins',
        'columns',
        'comment',
        'comment-alt',
        'comments',
        'compass',
        'cookie',
        'copy',
        'cube',
        'cubes',
        'cut',
        'database',
        'desktop',
        'digital-tachograph',
        'fa-brands fa-docker',
        'dot-circle',
        'download',
        'edit',
        'envelope',
        'eraser',
        'ethernet',
        'exchange-alt',
        'exclamation',
        'exclamation-triangle',
        'expand',
        'external-link-square-alt',
        'eye',
        'eye-slash',
        'fa-brands fa-facebook-square',
        'file',
        'filter',
        'flag',
        'folder',
        'folder-open',
        'fa-brands fa-gitlab',
        'globe-americas',
        'fa-brands fa-google',
        'hammer',
        'hashtag',
        'hdd',
        'heart',
        'home',
        'id-badge',
        'image',
        'images',
        'inbox',
        'info',
        'key',
        'landmark',
        'laptop',
        'layer-group',
        'leaf',
        'lightbulb',
        'link',
        'list-alt',
        'location-arrow',
        'lock',
        'magic',
        'map-marked',
        'mobile-alt',
        'network-wired',
        'paper-plane',
        'paperclip',
        'pencil-ruler',
        'photo-video',
        'poll',
        'power-off',
        'question-circle',
        'robot',
        'rocket',
        'fa-brands fa-safari',
        'save',
        'scroll',
        'search',
        'server',
        'shield-alt',
        'signal',
        'sitemap',
        'sliders-h',
        'star',
        'sticky-note',
        'store-alt',
        'stream',
        'suitcase',
        'sync-alt',
        'table',
        'tag',
        'tags',
        'th',
        'th-list',
        'thumbs-down',
        'thumbs-up',
        'toolbox',
        'tools',
        'tractor',
        'truck',
        'tv',
        'university',
        'unlock',
        'upload',
        'user',
        'users',
        'users-cog',
        'wallet',
        'warehouse',
        'wave-square',
        'wifi',
        'window-maximize',
        'wrench',
      ],
      textClasses: [
        'vuestro-text-center',
        'vuestro-text-monospace',
        'vuestro-text-larger',
        'vuestro-text-smaller',
        'vuestro-text-bold',
        'vuestro-text-light',
        'vuestro-text-uppercase',
        'vuestro-text-lowercase',
        'vuestro-text-underline',
        'vuestro-text-italic',
        'vuestro-text-muted',
        'vuestro-text-primary',
        'vuestro-text-secondary',
        'vuestro-text-success',
        'vuestro-text-info',
        'vuestro-text-warning',
        'vuestro-text-danger',
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncText = 'I was loaded asynchronously!';
    }, 2000);
  }
};

</script>

<style scoped>

.icon-tile {
  margin: 0.5em;
  justify-content: space-between;
  font-size: 0.8em;
  align-items: center;
}

</style>