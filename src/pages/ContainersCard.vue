<template>
  <div class="example-wrapper">
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }">

      <vuestro-card>
        <template #heading>VuestroCard - heading slot</template>
        <template #subheading>VuestroCard - subheading slot</template>
        <template #description>VuestroCard - description slot</template>
        <div>Default slot used for content. If any of the heading slots are not used, they will not appear and will not take up space.</div>
      </vuestro-card>
      <vuestro-card cols="6">
        <template #heading>VuestroCard - cols="6"</template>
        <template #description>Use the cols property with values from 1 to 12 to create Bootstrap-like columns</template>
      </vuestro-card>
      <vuestro-card cols="6" color="var(--vuestro-green)">
        <template #heading>VuestroCard with color cue</template>
        <template #description>Set the color property on the VuestroCard to add a nice touch of color.</template>
      </vuestro-card>

      <vuestro-card stretch>
        <vuestro-panel>
          <vuestro-container>
            <vuestro-card cols="8">
              <template #heading>VuestroCard in VuestroPanel</template>
              <template #subheading>Nest them together</template>
              <template #description>...to subdivide a panel</template>
            </vuestro-card>
            <vuestro-card cols="4">
              <template #description>...into columns</template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card resize="both">
        <template #description>Resizable Card</template>
        <span>
          Add the <vuestro-code>resize="both/horizontal/vertical"</vuestro-code> prop to allow resizing. Note that VuestroCards will be subject to flexbox constraints when resizing. i.e. even if you set "both" they may only be allowed to resize in one direction
        </span>
      </vuestro-card>
      <!--<vuestro-container column no-wrap gutter="none">-->
      <!--  <vuestro-card cols="3">-->
      <!--    <template #heading>Column mode container with cols="3"</template>-->
      <!--  </vuestro-card>-->
      <!--  <vuestro-card cols="9">-->
      <!--    <template #heading>Column mode container with cols="9"</template>-->
      <!--  </vuestro-card>-->
      <!--</vuestro-container>-->

    </vuestro-container>
  </div>
</template>

<script>

export default {
  name: 'ContainersCard',
  data() {
    return {
      outlines: true,
    };
  },
};

</script>

<style scoped>

.example-wrapper {
  flex-grow: 1;
}

.vuestro-container.outlines {
  border: 1px dashed var(--vuestro-outline);
  position: relative;
}

.vuestro-container.outlines .vuestro-card {
  border: 1px dashed var(--vuestro-outline);
  position: relative;
}

</style>