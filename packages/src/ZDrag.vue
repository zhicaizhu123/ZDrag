<template>
  <div class="z-drag">
    <transition-group
      name="flip"
      tag="div"
    >
      <div
        v-for="item in list"
        :key="item[sortId]"
        :class="[
          itemClass,
          immediate && src[sortId] === item[sortId] && draging
            ? ghostClass
            : '',
          item.disabled ? disabledClass : ''
        ]"
        :style="{
          ...itemStyle,
          ...(src[sortId] === item[sortId] && draging ? ghostStyle : {})
        }"
        @dragstart="onDragStart($event, item)"
        @dragover="onDragOver($event, item)"
        @dragleave="onDragLeave"
        @dragend="onDragEnd"
        @drop="onDrop($event, item)"
        draggable
      >
        <slot :data="item"></slot>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { throttle } from '../utils'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },

    // 元素的唯一标识
    sortId: {
      type: String,
      required: true
    },

    // 是否拖动排序，true-插入到目标元素位置，false-目标元素与被拖动元素位置互换
    isSort: {
      type: Boolean,
      default: true
    },

    // 是否拖动立即改变
    immediate: {
      type: Boolean,
      default: true
    },

    // 元素类样式
    itemClass: {
      type: String,
      default: 'z-drag-item'
    },

    // 元素样式
    itemStyle: {
      type: Object,
      default: () => { }
    },

    // 被拖动元素类样式
    ghostClass: {
      type: String,
      default: 'z-drag-item__ghost'
    },

    // 被拖动元素样式
    ghostStyle: {
      type: Object,
      default: () => { }
    },

    // 拖动到元素上方的样式
    dragOverClass: {
      type: String,
      default: 'z-drag-item__over'
    },

    // 禁止被拖动元素的样式
    disabledClass: {
      type: String,
      default: 'z-drag-item__disabled'
    }
  },

  data () {
    return {
      currentEl: null, // 当前拖动DOM元素
      src: {},
      target: {},
      list: [...this.value],
      draging: false // 是否正在拖拽
    }
  },

  watch: {
    value (val) {
      this.list = [...val]
    }
  },

  created () {
    // 使用节流方式，防止操作频繁
    this.onChange = throttle(this.dataChange, 210, false)
  },

  methods: {
    // 设置拖拽到目标元素的样式
    toggleTargetElStyle (e, status) {
      status
        ? e.classList.add(this.dragOverClass)
        : e.classList.remove(this.dragOverClass)
    },

    // 开始拖拽被拖拽元素
    onDragStart (e, src) {
      if (src.disabled) {
        e.preventDefault()
        return
      }
      this.currentEl = e.currentTarget
      this.src = { ...src }
      this.draging = true
    },

    // 拖拽结束
    onDragEnd () {
      this.draging = false
      if (JSON.stringify(this.list) !== JSON.stringify(this.value)) {
        this.$emit('input', this.list)
        this.$emit('change', this.list)
      }
    },

    // 数据互换
    replaceHandler (srcIndex, targetIndex) {
      const list = [...this.list]
      list[srcIndex] = this.target
      list[targetIndex] = this.src
      return list
    },

    // 数据插入到目标元素位置
    sortHanlder (srcIndex, targetIndex) {
      const list = [...this.list]
      const src = list.splice(srcIndex, 1)
      list.splice(targetIndex, 0, ...src)
      return list
    },

    // 触发数据变化
    dataChange (e, target) {
      // 数据监听时，当前元素可能为null
      if (!e.currentTarget) return
      this.target = { ...target }
      const srcIndex = this.list.findIndex(
        item => item[this.sortId] === this.src[this.sortId]
      )
      const targetIndex = this.list.findIndex(
        item => item[this.sortId] === this.target[this.sortId]
      )
      this.list = this.isSort
        ? this.sortHanlder(srcIndex, targetIndex)
        : this.replaceHandler(srcIndex, targetIndex)
    },

    // 拖拽到元素上面
    onDragOver (e, data) {
      e.preventDefault()
      if (e.currentTarget && e.currentTarget !== this.currentEl) {
        if (this.immediate) {
          this.onChange(e, data)
        } else {
          this.toggleTargetElStyle(e.currentTarget, true)
        }
      }
    },

    // 离开目标元素
    onDragLeave (e) {
      if (
        !this.immediate &&
        e.currentTarget &&
        e.currentTarget !== this.currentEl
      ) {
        this.toggleTargetElStyle(e.currentTarget, false)
      }
    },

    // 在目标元素释放元素
    onDrop (e, target) {
      e.preventDefault()
      this.dataChange(e, target)
      this.toggleTargetElStyle(e.currentTarget, false)
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-move {
  transition: transform 0.2s;
}
.z-drag {
  &-item {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &__ghost {
      background-color: #ecf8ff;
    }
    &__over {
      background-color: #ecf8ff;
    }
    &__disabled {
      cursor: no-drop;
      background-color: #f5f6f7;
    }
  }
}
</style>
