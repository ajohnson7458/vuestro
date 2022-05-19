<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-green)">
      <template #heading>Dropdowns</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Drop Down Menu</template>
      <template #description>VuestroDropdown provides a dropdown menu suitable for use both in a menu-bar (i.e. text only) or as a button-style dropdown menu using VuestroButton, with all the associated style options. The drop down will be left-justified unless it would go off screen.</template>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #description>
        Menubar style
      </template>
      <vuestro-container justify="space-between">
        <vuestro-dropdown>
          <template #title>
            <vuestro-icon name="hand-pointer"></vuestro-icon>
            <span>Click-to-Open</span>
          </template>
          <vuestro-list-button>
            <template #icon>
              <vuestro-icon name="tractor"></vuestro-icon>
            </template>
            <template #default>Menu Item 1</template>
          </vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown>
          <template #title>
            <vuestro-icon name="tractor"></vuestro-icon>
            <span>Auto-flip</span>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Set the "right" property to force right-justification
      </template>
      <div class="example-container-center">
        <vuestro-dropdown right>
          <template #title>Right-justified</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>stretch</em> property to fill container</span>
      </template>
      <div class="example-stretchy-container">
        <vuestro-dropdown stretch>
          <template #title>Stretchy</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        Or make it look like a button by using a VuestroButton in the "button" slot. VuestroDropdown will automatically wire it up!
      </template>
      <div class="example-vertical-container">
        <vuestro-dropdown>
          <template #button>
            <vuestro-button pill variant="info" size="lg">
              <template #icon>
                <vuestro-icon name="bullhorn"></vuestro-icon>
              </template>
              I'm a button!
            </vuestro-button>
          </template>
          <template #default>
            <vuestro-text-field placeholder="Name" variant="outline" size="lg" value="test"></vuestro-text-field>
            <vuestro-list-button>Menu Item 1</vuestro-list-button>
            <vuestro-list-button>Menu Item 2</vuestro-list-button>
            <vuestro-pill>
              <template #title>Pill 1</template>
            </vuestro-pill>
            <vuestro-pill color="var(--vuestro-purple)">
              <template #title>Pill 2</template>
            </vuestro-pill>
          </template>
        </vuestro-dropdown>
        <vuestro-dropdown close-on-content-click>
          <template #button>
            <vuestro-button variant="info" size="lg">
              <template #icon>
                <vuestro-icon name="bullhorn"></vuestro-icon>
              </template>
              {{ selectedString }}
            </vuestro-button>
          </template>
          <template #default>
            <vuestro-pill @click="selectedString = 'Xylophone'">
              <template #value>Xylophone</template>
            </vuestro-pill>
            <vuestro-list-button @click="selectedString = 'Menu Item 1'">Menu Item 1</vuestro-list-button>
            <vuestro-list-button @click="selectedString = 'Menu Item 2'">Menu Item 2</vuestro-list-button>
          </template>
        </vuestro-dropdown>
        <vuestro-dropdown close-on-content-click right>
          <template #button>
            <vuestro-button variant="info" size="lg">
              <template #placeholder>PLACEHOLDER</template>
              {{ vuestroGetValueById({
                  data: exampleDatasetWithIds,
                  idField: 'id',
                  idValue: selectedId,
                  field: 'val',
                  backupText: 'Click to Select'
                })
              }}
            </vuestro-button>
          </template>
          <vuestro-list-button v-for="d in exampleDatasetWithIds" :key="d.id" @click="selectedId = d.id">{{ d.val }}</vuestro-list-button>
          <template #buttons>
            <vuestro-button variant="success">
              <template #icon>
                <vuestro-icon name="save"></vuestro-icon>
              </template>
              Save
            </vuestro-button>
          </template>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Speaking of buttons...add buttons to the bottom of a dropdown by adding spans to the <em>buttons</em> slot</span>
      </template>
      <div class="example-container">
        <vuestro-dropdown>
          <template #title>w/ buttons!</template>
          Add span elements to the #buttons template
          <template #buttons>
            <vuestro-button variant="success">
              <template #icon>
                <vuestro-icon name="save"></vuestro-icon>
              </template>
              Save
            </vuestro-button>
            <vuestro-button variant="danger">
              <template #icon>
                <vuestro-icon name="trash"></vuestro-icon>
              </template>
              Delete
            </vuestro-button>
          </template>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Close automatically on leave by setting the <em>closeOnLeave</em> property</span>
      </template>
      <div class="example-container">
        <vuestro-dropdown close-on-leave>
          <template #title>Close on Leave</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Disable the dropdown function by setting the <em>disabled</em> property</span>
      </template>
      <div class="example-container">
        <vuestro-dropdown disabled>
          <template #title>Disabled Dropdown</template>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Adding the <vuestro-code>up</vuestro-code> property switches to a drop-up</span>
      </template>
      <vuestro-container justify="space-between">
        <vuestro-dropdown top>
          <template #title>DropUp</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
          <vuestro-list-button>Menu Item 3</vuestro-list-button>
          <vuestro-list-button>Menu Item 4</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown top right>
          <template #title>DropUp</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
          <vuestro-list-button>Menu Item 3</vuestro-list-button>
          <vuestro-list-button>Menu Item 4</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'PopupsDropdown',
  data() {
    return {
      selectedString: 'Click Me to open and select another string',
      selectedId: null,
      exampleDatasetWithIds: [
        {
          id: 'id0',
          val: 'Value for id0',
        },
        {
          id: 'id1',
          val: 'Value for id1',
        },
        {
          id: 'id2',
          val: 'Value for id2',
        },
        {
          id: 'id3',
          val: 'Value for id3',
        },
        {
          id: 'id4',
          val: 'Value for id4',
        },
        {
          id: 'id5',
          val: 'Value for id5',
        },
        {
          id: 'id6',
          val: 'Value for id6',
        },
        {
          id: 'id7',
          val: 'Value for id7',
        },
        {
          id: 'id8',
          val: 'Value for id8',
        },
      ],
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