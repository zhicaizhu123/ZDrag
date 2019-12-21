<template>
  <div class="app">
    <z-drag
      class="drag-container"
      v-model="list"
      sortId="id"
      itemClass="drag-item-class"
      @change="onChange"
    >
      <div slot-scope="scope">
        {{ scope.data.label }}
      </div>
    </z-drag>
  </div>
</template>

<script>
/* eslint-disable */

import ZDrag from '../packages/src/ZDrag'

export default {
  components: {
    ZDrag
  },
  data () {
    return {
      list: [
        {
          id: 1,
          label: '选项1'
        },
        {
          id: 2,
          label: '选项2'
        },
        {
          id: 3,
          label: '选项3',
          disabled: true
        },
        {
          id: 4,
          label: '选项4'
        },
        {
          id: 5,
          label: '选项5'
        },
        {
          id: 6,
          label: '选项6'
        },
        {
          id: 7,
          label: '选项7'
        },
        {
          id: 8,
          label: '选项8'
        },
        {
          id: 9,
          label: '选项9'
        },
        {
          id: 10,
          label: '选项10'
        }
      ]
    }
  },

  methods: {
    onChange (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*,
*:after,
*:before {
  box-sizing: inherit;
}

.drag-container {
  width: 500px;
  margin: 0 auto;
  position: relative;
  .drag-item-class {
    display: inline-block;
    width: 100px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin: 10px;
    height: 40px;
    line-height: 38px;
    vertical-align: top;
    text-align: center;
  }
}
</style>
