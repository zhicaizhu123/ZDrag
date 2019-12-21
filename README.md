# z-drag

> 基于 vue 开发的拖拽组件

### 安装

```
npm install --save z-drag
```

### 引入

- 全局引入

```js
import ZDrag from 'z-drag'
Vue.use(ZDrag)
...
<z-drag v-model="list"></z-drag>
```

- 局部引入

```js
import { ZDrag } from 'z-drag'
...
components: {
  ZDrag
}
...
<z-drag v-model="list"></z-drag>
```

### 配置项

### 属性

|     属性      |                                        描述                                         |      类型      |          默认值           |
| :-----------: | :---------------------------------------------------------------------------------: | :------------: | :-----------------------: |
|    sortId     |                                 每个元素的唯一标识                                  | String（必传） |             -             |
|    isSort     | 是否拖拽排序，true-被拖拽元素插入到目标元素位置，false-被拖拽元素与目标元素位置互换 |    Boolean     |           true            |
|   immediate   |                                拖拽是否立即改变排序                                 |    Boolean     |           true            |
|   itemClass   |                                   每个元素类样式                                    |     String     |       'z-drag-item'       |
|   itemStyle   |                                  每个元素内敛样式                                   |     Object     |            {}             |
|  ghostClass   |                                  被拖拽元素类样式                                   |     String     |  'z-drag-item\_\_ghost'   |
|  ghostStyle   |                                 被拖拽元素内敛样式                                  |     Object     |            {}             |
| dragOverClass |                              拖拽到元素上方的元素样式                               |     String     |   'z-drag-item\_\_over'   |
| disabledClass |                                禁止被拖动元素的样式                                 |     String     | 'z-drag-item\_\_disabled' |

### 事件

|  事件  |                                      描述                                      |     返回参数     |
| :----: | :----------------------------------------------------------------------------: | :--------------: |
| change | 列表排序发生变化时触发，说明：元素正在拖动中是不会触发该事件，只用释放才会触发 | 重排后的数据列表 |

### 举例

#### 是否立即变化

> immediate
>
> - true：立即变化
> - false：释放才变化

- 效果图  
  `immediate:true`  
   ![效果图](https://github.com/zhicaizhu123/ZImage/blob/master/components/z-drag/sort.gif?raw=true)

  `immediate:false`  
  ![效果图](https://github.com/zhicaizhu123/ZImage/blob/master/components/z-drag/no-immediate.gif?raw=true)

- 示例代码

```js
<z-drag
  class="drag-container"
  v-model="list"
  :immediate="true"
  sortId="id"
  itemClass="drag-item-class"
>
  <div slot-scope="scope">
    {{ scope.data.label }}
  </div>
</z-drag>
...
```

#### 是否拖拽排序

> isSort
>
> - true：排序
> - false：位置互换

- 效果图  
  `isSort:true`  
   ![效果图](https://github.com/zhicaizhu123/ZImage/blob/master/components/z-drag/sort.gif?raw=true)

  `isSort:false`  
  ![效果图](https://github.com/zhicaizhu123/ZImage/blob/master/components/z-drag/no-sort.gif?raw=true)

- 示例代码

```js
<z-drag
  class="drag-container"
  v-model="list"
  :isSort="true"
  sortId="id"
  itemClass="drag-item-class"
>
  <div slot-scope="scope">
    {{ scope.data.label }}
  </div>
</z-drag>
...
```

#### 指定元素不可拖拽

- 效果图
  ![效果图](https://github.com/zhicaizhu123/ZImage/blob/master/components/z-drag/disabled.gif?raw=true)

- 示例代码

```js
...
<z-drag
  class="drag-container"
  v-model="list"
  :isSort="true"
  sortId="id"
  itemClass="drag-item-class"
>
  <div slot-scope="scope">
    {{ scope.data.label }}
  </div>
</z-drag>
...
data () {
  return {
    list: [
      ...
      {
        id: 3,
        label: '选项3',
        disabled: true // 选项3设置为不可拖拽
      },
      ...
    ]
  }
}
...
```
