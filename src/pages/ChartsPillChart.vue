<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Pill Chart</span></template>
      <template #description>The VuestroPillChart component is a modern alternative to the area chart for showing time-series data in a more discrete way</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-pill-chart :data="data" :options="options"></vuestro-pill-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #description>Gradient fill</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-pill-chart :data="data" :options="{ gradientFill: true, ...options }"></vuestro-pill-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #description>Stacked series</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-pill-chart :data="data" :options="stackedOptions"></vuestro-pill-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #description>Live updating</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-pill-chart :data="dynamicData" :options="options"></vuestro-pill-chart>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'ChartPillChart',
  data() {
    return {
      data: [
        {"key":"2021-12-16T03:37:37Z","value":75,"value2":4},
        {"key":"2022-03-04T05:07:30Z","value":77,"value2":14},
        {"key":"2022-07-22T03:36:09Z","value":64,"value2":5},
        {"key":"2022-10-17T11:23:28Z","value":45,"value2":43},
        {"key":"2022-01-10T06:17:15Z","value":59,"value2":85},
        {"key":"2022-02-03T18:08:26Z","value":41,"value2":43},
        {"key":"2022-09-30T22:19:53Z","value":76,"value2":12},
        {"key":"2022-06-24T06:48:45Z","value":40,"value2":37},
        {"key":"2022-02-25T18:15:35Z","value":22,"value2":3},
        {"key":"2022-10-27T23:18:40Z","value":71,"value2":9},
        {"key":"2022-01-31T07:06:31Z","value":88,"value2":37},
        {"key":"2022-03-17T05:32:16Z","value":46,"value2":12},
        {"key":"2022-05-15T10:38:28Z","value":74,"value2":0},
        {"key":"2022-05-24T09:07:44Z","value":72,"value2":34},
        {"key":"2021-12-20T14:26:19Z","value":14,"value2":65},
        {"key":"2021-11-19T04:59:55Z","value":44,"value2":42},
        {"key":"2022-04-24T20:13:15Z","value":94,"value2":18},
        {"key":"2021-12-18T19:06:19Z","value":75,"value2":60},
        {"key":"2022-02-05T09:53:05Z","value":32,"value2":92},
        {"key":"2022-09-13T01:39:23Z","value":34,"value2":12},
        {"key":"2022-05-07T03:19:22Z","value":18,"value2":23},
        {"key":"2022-04-25T06:08:06Z","value":72,"value2":9},
        {"key":"2022-03-05T05:29:44Z","value":89,"value2":45},
        {"key":"2022-08-23T07:51:06Z","value":62,"value2":14},
        {"key":"2022-07-12T07:46:18Z","value":62,"value2":44},
        {"key":"2022-01-24T18:14:36Z","value":73,"value2":94},
        {"key":"2022-03-03T08:00:23Z","value":26,"value2":42},
        {"key":"2021-11-18T15:22:30Z","value":22,"value2":68},
        {"key":"2022-01-14T21:37:35Z","value":18,"value2":12},
        {"key":"2022-05-18T14:49:11Z","value":61,"value2":42},
        {"key":"2022-08-27T06:31:15Z","value":14,"value2":0},
        {"key":"2022-08-26T03:56:30Z","value":98,"value2":1},
        {"key":"2022-05-27T04:18:18Z","value":15,"value2":4},
        {"key":"2021-11-18T05:33:13Z","value":8,"value2":6},
        {"key":"2022-08-05T09:56:56Z","value":2,"value2":8},
        {"key":"2022-09-16T15:35:34Z","value":42,"value2":1},
        {"key":"2022-09-26T10:35:33Z","value":46,"value2":13},
        {"key":"2022-07-02T17:11:42Z","value":99,"value2":93},
        {"key":"2022-04-05T10:21:13Z","value":71,"value2":8},
        {"key":"2022-06-29T06:54:42Z","value":11,"value2":42},
        {"key":"2022-10-02T03:52:04Z","value":18,"value2":90},
        {"key":"2022-02-09T08:36:29Z","value":70,"value2":3},
        {"key":"2022-10-13T16:24:43Z","value":43,"value2":44},
        {"key":"2021-11-27T21:28:44Z","value":2,"value2":40},
        {"key":"2022-09-15T04:50:40Z","value":24,"value2":24},
        {"key":"2022-05-19T05:13:45Z","value":91,"value2":84},
        {"key":"2021-12-02T15:11:39Z","value":5,"value2":43},
        {"key":"2022-08-02T12:36:59Z","value":43,"value2":13},
        {"key":"2022-01-11T20:08:25Z","value":51,"value2":64},
        {"key":"2022-08-21T23:44:49Z","value":28,"value2":23},
        {"key":"2022-08-05T21:38:06Z","value":38,"value2":13},
        {"key":"2021-12-05T10:42:46Z","value":27,"value2":78},
        {"key":"2022-03-14T15:16:38Z","value":97,"value2":3},
        {"key":"2022-09-29T22:05:32Z","value":13,"value2":18},
        {"key":"2022-07-07T10:28:17Z","value":22,"value2":60},
        {"key":"2022-02-17T11:46:54Z","value":72,"value2":92},
        {"key":"2022-02-26T12:12:59Z","value":77,"value2":12},
        {"key":"2022-05-01T12:51:36Z","value":52,"value2":23},
        {"key":"2022-08-17T06:43:04Z","value":71,"value2":9},
        {"key":"2022-11-02T09:28:11Z","value":47,"value2":45},
        {"key":"2021-11-19T19:12:43Z","value":94,"value2":14},
        {"key":"2021-11-20T01:30:14Z","value":70,"value2":44},
        {"key":"2022-09-04T23:22:49Z","value":9,"value2":94},
        {"key":"2022-06-26T18:57:39Z","value":36,"value2":42},
        {"key":"2022-03-04T08:28:04Z","value":81,"value2":68},
        {"key":"2022-03-31T20:17:12Z","value":9,"value2":12},
        {"key":"2022-03-16T23:03:02Z","value":27,"value2":42},
        {"key":"2021-12-07T10:34:52Z","value":15,"value2":0},
        {"key":"2022-05-14T02:54:55Z","value":37,"value2":1},
        {"key":"2022-05-05T10:23:29Z","value":80,"value2":4},
        {"key":"2022-09-22T21:33:23Z","value":9,"value2":6},
        {"key":"2022-08-04T00:12:35Z","value":65,"value2":4},
        {"key":"2022-03-16T13:47:39Z","value":70,"value2":1},
        {"key":"2022-07-21T10:43:24Z","value":2,"value2":13},
        {"key":"2022-05-02T00:46:45Z","value":47,"value2":93},
        {"key":"2022-08-02T21:56:06Z","value":62,"value2":8},
        {"key":"2022-10-13T15:27:07Z","value":55,"value2":42},
        {"key":"2022-08-27T05:35:00Z","value":94,"value2":90},
        {"key":"2022-08-28T21:55:39Z","value":79,"value2":3},
        {"key":"2021-12-11T14:28:57Z","value":96,"value2":44},
        {"key":"2022-06-27T22:34:18Z","value":53,"value2":40},
        {"key":"2022-08-05T14:42:16Z","value":94,"value2":24},
        {"key":"2022-06-20T19:04:43Z","value":29,"value2":84},
        {"key":"2022-07-09T04:05:58Z","value":52,"value2":43},
        {"key":"2022-05-06T00:12:15Z","value":75,"value2":13},
        {"key":"2022-09-02T12:36:35Z","value":90,"value2":64},
        {"key":"2022-08-28T02:14:35Z","value":80,"value2":23},
        {"key":"2022-02-14T11:31:50Z","value":15,"value2":4},
        {"key":"2022-04-03T17:31:42Z","value":67,"value2":4},
        {"key":"2021-12-04T07:17:04Z","value":44,"value2":4},
        {"key":"2022-02-13T03:28:56Z","value":21,"value2":4},
        {"key":"2021-12-13T06:14:09Z","value":97,"value2":4},
        {"key":"2022-04-03T02:58:43Z","value":96,"value2":4},
        {"key":"2021-11-29T04:51:38Z","value":19,"value2":4},
        {"key":"2022-09-01T10:53:32Z","value":1,"value2":4},
        {"key":"2022-03-05T04:44:58Z","value":39,"value2":4},
        {"key":"2022-02-17T11:35:56Z","value":12,"value2":4},
        {"key":"2022-04-18T21:59:15Z","value":31,"value2":4},
        {"key":"2022-07-02T02:50:13Z","value":98,"value2":4},
        {"key":"2022-03-12T14:25:05Z","value":9,"value2":4},
        {"key":"2022-02-05T13:05:43Z","value":6,"value2":4},
        {"key":"2022-03-05T10:08:22Z","value":22,"value2":4},
        {"key":"2022-10-21T22:47:12Z","value":3,"value2":4},
        {"key":"2022-03-25T04:37:36Z","value":78,"value2":4},
        {"key":"2021-12-20T15:22:36Z","value":32,"value2":4},
        {"key":"2022-08-19T00:14:39Z","value":40,"value2":4},
        {"key":"2021-12-27T17:26:09Z","value":7,"value2":4},
        {"key":"2022-04-04T11:04:49Z","value":51,"value2":4},
        {"key":"2022-05-23T23:53:18Z","value":100,"value2":4},
        {"key":"2022-02-26T00:44:13Z","value":24,"value2":4},
        {"key":"2022-03-07T11:47:40Z","value":7,"value2":4},
        {"key":"2022-07-22T06:26:30Z","value":83,"value2":4},
        {"key":"2022-06-01T22:46:07Z","value":93,"value2":4},
        {"key":"2022-08-21T05:54:09Z","value":2,"value2":4},
        {"key":"2022-03-25T00:12:52Z","value":84,"value2":34},
        {"key":"2022-02-14T14:20:15Z","value":93,"value2":4},
        {"key":"2022-01-16T18:34:16Z","value":12,"value2":57},
        {"key":"2022-06-21T15:50:55Z","value":69,"value2":4},
        {"key":"2022-01-27T21:47:37Z","value":65,"value2":4},
        {"key":"2022-04-24T03:29:50Z","value":49,"value2":4},
        {"key":"2022-04-23T21:57:58Z","value":78,"value2":4},
        {"key":"2022-05-10T16:13:33Z","value":45,"value2":4},
        {"key":"2022-01-10T08:17:58Z","value":74,"value2":4},
        {"key":"2022-06-07T06:21:17Z","value":71,"value2":4},
        {"key":"2022-07-10T15:00:59Z","value":5,"value2":4},
        {"key":"2022-06-05T15:46:44Z","value":48,"value2":0},
        {"key":"2022-04-08T04:59:48Z","value":82,"value2":0},
        {"key":"2022-04-18T20:10:47Z","value":38,"value2":0},
        {"key":"2022-07-14T01:03:42Z","value":32,"value2":0},
        {"key":"2022-02-05T18:52:17Z","value":13,"value2":0},
        {"key":"2022-11-09T08:27:57Z","value":84,"value2":0},
        {"key":"2022-03-05T03:37:39Z","value":55,"value2":0},
        {"key":"2022-01-09T09:38:36Z","value":28,"value2":0},
        {"key":"2021-12-31T18:27:23Z","value":77,"value2":0},
        {"key":"2022-06-14T09:48:26Z","value":70,"value2":0},
        {"key":"2022-01-24T01:42:51Z","value":17,"value2":0},
        {"key":"2021-12-17T17:34:39Z","value":74,"value2":0},
        {"key":"2021-12-12T06:55:32Z","value":81,"value2":0},
        {"key":"2022-07-23T03:15:21Z","value":22,"value2":0},
        {"key":"2021-12-08T06:05:47Z","value":53,"value2":0},
        {"key":"2022-08-13T09:44:22Z","value":37,"value2":0},
        {"key":"2022-06-07T03:36:57Z","value":36,"value2":0},
        {"key":"2022-01-22T05:26:32Z","value":71,"value2":0},
        {"key":"2022-02-13T19:56:07Z","value":45,"value2":0},
        {"key":"2022-06-19T06:03:30Z","value":7,"value2":4},
        {"key":"2022-09-18T02:26:16Z","value":68,"value2":4},
        {"key":"2022-02-20T22:58:36Z","value":56,"value2":4},
        {"key":"2021-11-25T06:35:07Z","value":13,"value2":4},
        {"key":"2022-03-28T21:20:53Z","value":80,"value2":4},
        {"key":"2022-05-24T13:28:08Z","value":29,"value2":4},
        {"key":"2021-12-07T06:32:56Z","value":17,"value2":4},
        {"key":"2022-06-09T21:38:42Z","value":85,"value2":4},
        {"key":"2022-07-31T18:14:25Z","value":58,"value2":4},
        {"key":"2022-06-14T02:09:04Z","value":7,"value2":4},
        {"key":"2022-09-07T08:55:24Z","value":12,"value2":4},
        {"key":"2022-10-31T16:37:01Z","value":94,"value2":4},
        {"key":"2022-06-07T08:07:52Z","value":78,"value2":4},
        {"key":"2022-10-10T08:06:12Z","value":23,"value2":4},
        {"key":"2022-07-08T04:04:16Z","value":93,"value2":4},
        {"key":"2022-04-09T02:46:59Z","value":93,"value2":4},
        {"key":"2022-02-17T07:24:22Z","value":2,"value2":4},
        {"key":"2022-05-20T09:15:50Z","value":57,"value2":23},
        {"key":"2022-09-14T12:32:08Z","value":89,"value2":23},
        {"key":"2022-11-11T05:25:17Z","value":52,"value2":23},
        {"key":"2022-01-21T20:51:02Z","value":35,"value2":23},
        {"key":"2022-03-11T03:38:20Z","value":68,"value2":23},
        {"key":"2021-11-15T19:53:11Z","value":59,"value2":23},
        {"key":"2022-01-25T13:03:02Z","value":35,"value2":23},
        {"key":"2022-04-27T16:29:50Z","value":80,"value2":23},
        {"key":"2021-12-25T19:14:50Z","value":5,"value2":4},
        {"key":"2022-07-26T23:35:19Z","value":18,"value2":4},
        {"key":"2022-01-20T11:36:09Z","value":19,"value2":4},
        {"key":"2022-05-15T19:49:25Z","value":98,"value2":4},
        {"key":"2022-10-23T08:46:07Z","value":79,"value2":4},

      ],
      dynamicData: [],
      options: {
        timeSeries: true,
        granularity: 'day',
        series: [
          {
            field: 'value',
            color: 'var(--vuestro-purple)'
          }
        ]
      },
      stackedOptions: {
        stacked: true,

        series: [
          {
            field: 'value',
            color: 'var(--vuestro-purple)'
          },
          {
            field: 'value2',
            color: 'var(--vuestro-plum)'
          }
        ]
      }
    };
  },
  beforeMount() {
    for (let i=300; i>0; i--) {
      this.dynamicData.push(this.getPoint(i));
    }
  },
  mounted() {
    setInterval(() => {
      this.dynamicData.push(this.getPoint());
      this.dynamicData.shift();
    }, 1000);
  },
  methods: {
    getPoint(i=0) {
      return {
        key: new Date(Date.now() - 1000*i),
        value: Math.floor(Math.random()*(100+1)),
      };
    }
  }
};

</script>


<style scoped>

.chart-wrapper {
  height: 300px;
}

</style>