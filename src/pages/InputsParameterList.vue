<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Parameter List</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading>Example</template>
      <vuestro-parameter-list v-model="liveObject"
                              :parameters="parameters">
      </vuestro-parameter-list>

      <vuestro-panel>
        <template #title>Values</template>
        <vuestro-object-browser :data="liveObject">
        </vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading><span>
        <vuestro-code>parameters</vuestro-code> prop
      </span></template>
      <vuestro-editor :options="editorOptions"
                      lang="json"
                      :value="JSON.stringify(parameters,null,2)">
      </vuestro-editor>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsParameterList',
  data() {
    return {
      liveObject: {},
      parameters: [
        {
          title: 'Hostname',
          description: 'The hostname of the server',
          field: 'host',
          type: 'string',
          icon: 'server',
          default: 'default-host',
          autocomplete: { key: 'test', getter: 'testAutocomplete' },
        },
        {
          title: 'Port',
          description: 'The port of the server',
          field: 'port',
          type: 'number',
          default: 80,
          autocomplete: { key: 'test', getter: 'testAutocomplete' },
        },
        {
          title: 'Protocol',
          description: 'Example of option select',
          field: 'proto',
          type: 'option',
          options: ['tcp', 'http', 'https', 0],
          // default: 'tcp',
        },
        {
          title: 'Token',
          description: 'Example of password type field',
          field: 'token',
          type: 'string',
          inputType: 'password',
        },
        {
          title: 'Enabled',
          description: 'Example of boolean',
          field: 'enabled',
          type: 'boolean',
          icon: 'check',
          default: true,
        },
        {
          title: 'Names',
          description: 'Example of array of strings',
          field: 'names',
          type: 'array',
          items: 'string',
          collapsible: true,
          collapsed: true,
          default: ['one', 'two', 'three'],
        },
        {
          title: 'Privileges',
          description: 'Example of array of strings, with dropdown of options for addition',
          field: 'privileges',
          type: 'array',
          items: 'option',
          collapsible: true,
          options: ['read', 'write', 'delete', 'export'],
          default: ['read'],
        },
        {
          title: 'Variables',
          description: 'Example of key value pair variables',
          field: 'kvps',
          type: 'variables',
          collapsible: true,
          collapsed: true,
          default: [
            {
              key: 'one',
              value: '1',
            },
            {
              key: 'two',
              value: '2',
            },
            {
              key: 'three',
              value: '3',
            },
          ],
        },
        {
          title: 'Start Date',
          description: 'Example of single date selection',
          field: 'date',
          type: 'date',
          icon: 'calendar',
          default: '2021-03-04T12:00:00Z',
        },
        {
          title: 'Sub-Object',
          description: 'Example of sub-object, groups fully-specified sub-parameter lists',
          field: 'subObject1',
          type: 'object',
          icon: 'cubes',
          collapsible: true,
          items: [
            {
              title: 'Hosts',
              description: 'All the hosts',
              field: 'hosts',
              type: 'array',
              items: 'string',
            },
            {
              title: 'TLS',
              description: 'Use TLS for connections',
              field: 'tls',
              type: 'boolean',
              icon: 'certificate',
            }
          ],
        },
        {
          title: 'Notes',
          description: 'Example of free-form text',
          field: 'notes',
          type: 'text',
          icon: 'file-alt',
          default: 'I can have a default value too!\n\n\nIsn\'t that cool?'
        },
      ],
      editorOptions: {
        autoScrollEditorIntoView: true,
        minLines: 4,
        maxLines: 1000,
      },
    };
  },
};

</script>

<style scoped>

.vuestro-parameter-list {
}

</style>