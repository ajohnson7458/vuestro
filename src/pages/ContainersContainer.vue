<template>
  <div>
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }">
      <vuestro-card>
        <template #heading>VuestroContainer</template>
        <template #description>Use as a generic flexbox-based container to hold any other Vuestro component (or any HTML in general.)
        The default flexbox options are:</template>
        <pre>
flex: 1 1 auto;
flex-wrap: wrap;
flex-direction: row;
align-items: stretch;
align-content: flex-start;
justify-content: flex-start;
        </pre>
        <p>VuestroContainer also defines a "gutter" which is implemented as padding, and assigned as a CSS var named <em>--vuestro-gutter</em> that is picked up by child VuestroCards. The values for the <em>gutter</em> property are <em>{ none, sm, md, lg, xl }</em>. The default is <em>md</em>.</p>


        <vuestro-container gutter="none" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container gutter="sm" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container gutter="md" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container gutter="lg" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container gutter="xl" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #heading>Flexbox behavior may be changed by setting properties:</template>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><span><em>column</em> - sets flex-direction to column (default is row)</span></template>
        <vuestro-container column :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><span><em>no-wrap</em> - sets flex-wrap to nowrap (default is wrap)</span></template>
        <template #description>Use to have single-row/column of stretched divs</template>
        <vuestro-container no-wrap :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container no-wrap column :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><span><em>justify="space-between"</em> - justify can take any value flexbox supports</span></template>
        <vuestro-container justify="space-between" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>justify="space-evenly"</em></template>
        <vuestro-container justify="space-evenly" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>justify="center"</em></template>
        <vuestro-container justify="center" :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><span><em>align="center"</em> - align can take any value flexbox supports</span></template>
        <vuestro-container align="center" :class="{ outlines }" style="height: 100px">
          <div>div inside fixed height container</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><span><em>justify="center" align="center"</em> - combine for advanced layouts</span></template>
        <vuestro-container justify="center" align="center" :class="{ outlines }" style="height: 100px">
          <div>div inside fixed height container</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading>Resiziable container</template>
        <vuestro-container resize="both">
          <div>set the <vuestro-code>resize="both/horizontal/vertical"</vuestro-code></div>
        </vuestro-container>
      </vuestro-card>


    </vuestro-container>
  </div>
</template>

<script>

export default {
  name: 'ContainersContainer',
  data() {
    return {
      outlines: true,
    };
  },
};

</script>

<style scoped>

.vuestro-container {
  flex-basis: 60px;
}

.vuestro-container.outlines {
  border: 1px dashed var(--vuestro-outline);
  position: relative;
  margin-top: 10px;
}
.vuestro-container.outlines > div {
  border: 1px dashed var(--vuestro-outline);
  position: relative;
}

</style>