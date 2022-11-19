# vue3笔记

## vue3项目创建

```cmd
npm i -g @vue/cli
//检测版本 cli4.5.0以上
vue -V 
vue create vue3
```

## setup与ref的基本使用

setup是组合api的入口函数

### 响应式数据

```vue
<div>哈哈</div>
<div>测试:{{ number }}</div>
<div><button @click="addOne">加一</button></div>
```

```vue
export default defineComponent({
  name: 'App',
  setup() {
    let number = ref(10)
    function addOne() {
      number.value++
    }
    return {
      number,
      addOne
    }
  }
})
```

### reactive的基本使用

#### 响应式数据

直接改变原对象的值不行,需要改变代理对象的值

```vue
<div>{{user.age}}</div>
<div>{{user.wife.cars}}</div>
<div><button @click="update">更新</button></div>
```

```vue
export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      name: '张三',
      age: 20,
      wife: {
        name: '王五',
        cars: ['宝马','奔驰']
      }
    })
    const update = ()=>{
      user.age++
      user.wife.cars.push('好车')
    }
    return {
      user,
      update
    }
  }
})
```

只有操作代理数据才会印象界面

### setup执行时机

setup在beforeCreate之前执行

setup在执行时当前组件还没有创建出来,组件实例对象this不能使用

不能通过this去调用相关内容

### setup返回值与参数

### 返回值

setup的返回值是给html模板中使用的

## props与context

props是一个对象有父组件传给子组件的属性

context是一个对象,attrs获取当前组件标签上所有的属性,emit分发事件

```vue
<template>
  <div>父组件</div>
  <div @click="update">{{msg}}</div>
  <Child :msg="msg" @upChild="upChild"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Child from './comopents/child.vue'
export default defineComponent({
  name: 'App',
  setup() {
    let msg = ref('测试')
    const update = ()=>{
      msg.value += '==='
    }
    const upChild = (txt: string)=>{
      console.log('11111111');
      msg.value += txt
    }
    return {
      msg,
      update,
      upChild
    }
  },
  components: {
    Child
  }
});
</script>

<style>
</style>
```

```vue
<template>
  <div>子组件</div>
  <div>{{msg}}</div>
  <button @click="add">分发事件</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'childSon',
  props: ['msg'],
  setup(props,context) {
    console.log(props,context);
    const add = ()=>{
      // console.log(context);
      context.emit('upChild','+++')
    }
    return {
      add
    }
  }
});
</script>

<style>
</style>
```

## reactive和ref的细节

```vue
<div>reactive和ref的细节</div>
<div>{{m1}}</div>
<div>{{m2}}</div>
<div>{{m3}}</div>
<button @click="update">更新数据</button>
```

```vue
export default defineComponent({
  name: 'App',
  setup() {
    const m1 = ref('abc')
    const m2 = reactive({
      name: '小明',
      wife: {
        name: '小红'
      }
    })
    const m3 = ref({
      name: '小明',
      wife: {
        name: '小红'
      }
    })
    const update = ()=>{
      m1.value += '==='
      m2.wife.name += '==='
      m3.value.wife.name += '==='
    }
    return {
      m1,
      m2,
      m3,
      update
    }
  }
});
</script>
```

## computed与watch与watchEffect

### 基本使用

```vue
<template>
  <div>计算属性和监视</div>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏: <input type="text" v-model="user.firstName">
    <br/>
    名字: <input type="text" v-model="user.lastName">
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    显示姓名: <input type="text" v-model="fullName1">
    显示姓名: <input type="text" v-model="fullName2">
    显示姓名: <input type="text" v-model="fullName3">
  </fieldset>
</template>
```

```vue
<script lang="ts">
import { defineComponent, reactive,computed, watch, ref, watchEffect } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      firstName: '东方',
      lastName: '不败'
    })
    // 计算属性如果只传入一个回调函数,表示的就是get
    const fullName1 = computed(()=>{
      return user.firstName + '_' + user.lastName
    })
    const fullName2 = computed({
      get(){
        return user.firstName + '_' + user.lastName
      },
      set(val: string){
        const names = val.split('_')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })
    // 监视
    const fullName3 = ref('')
    // watch(user,({firstName,lastName})=>{
    //   fullName3.value = firstName + '_' + lastName
    // },{immediate: true,deep: true})
    // watchEffect默认执行一次
    watchEffect(()=>{
      fullName3.value = user.firstName + '_' + user.lastName
    })
    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
});
</script>
```

## 生命周期

生命周期对比

```注释
Vue2--------------vue3
beforeCreate  -> setup()
created       -> setup()
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured
```

vue3的生命周期比vue2的生命周期快

父组件

```vue
<template>
  <div>父组件</div>
  <button @click="isShow=!isShow">切换显示隐藏</button>
  <Child v-if="isShow"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Child from './components/child.vue'
export default defineComponent({
  name: 'App',
  setup() {
    const isShow = ref(true)
    return {
      isShow
    }
  },
  components: {
    Child
  }
});
</script>
```

子组件

```vue
<template>
  <div>子组件</div>
  <div>{{msg}}</div>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue';

export default defineComponent({
  name: 'childTest',
  // vue2中的生命周期
  beforeCreate(){
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount');
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate');
    
  },
  updated(){
    console.log('updated');
  },
  beforeUnmount(){
    console.log('beforeUnmount');
  },
  unmounted() {
    console.log('unmounted');
  },
  setup() {
    console.log('setup');
    const msg = ref(0)
    const update= ()=>{
      msg.value += 5
    }
    onBeforeMount(()=>{
      console.log('onBeforeMount');
    })
    onMounted(()=>{
      console.log('onMounted');
    })
    onBeforeUpdate(()=>{
      console.log('onBeforeUpdate');
    })
    onUpdated(()=>{
      console.log('onUpdated');
    })
    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount');
    })
    onUnmounted(()=>{
      console.log('onUnmounted');
    })
    return {
      msg,
      update
    }
  }
});
</script>

```

异步操作请求在onMounted中

## 自定义hook函数

#### 示例1

```vue
<template>
  <div>自定义hook函数</div>
  <div>{{x}}</div>
  <div>{{y}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useMouse from './hooks/useMouse'
export default defineComponent({
  name: 'App',
  setup(){
    const {x,y} = useMouse()
    return {
      x,
      y
    }
  }
});
</script>
```

hook函数

```ts
import {  onBeforeUnmount, onMounted, ref } from 'vue';
export default function () {
  const x = ref(-1)
  const y = ref(-1)
  const clickHandle = (event:MouseEvent)=>{
    x.value = event.pageX
    y.value = event.pageY
  }
  onMounted(()=>{
    window.addEventListener('click',clickHandle)
  })
  onBeforeUnmount(()=>{
    window.removeEventListener('click',clickHandle)
  })
  return {
    x,
    y
  }
}
```

#### 示例2测试接口定义类型

接口代码 public下的data文件夹

address.json

```json
{
  "id": 1,
  "address": "北京市",
  "distance": "1000m"
}
```

production.json

```json
[
  {
    "id": "001",
    "title": "华为手机30",
    "price": 3219
  },
  {
    "id": "002",
    "title": "小米手机30",
    "price": 1982
  }
]
```

hook函数

```ts
import { ref } from 'vue';
import axios from 'axios'
export default function <T>(url:string) {
  const loading = ref(true)
  const data = ref(<T | null>null)
  const errMsg = ref('')
  axios.get(url).then(res=>{
    loading.value = false
    data.value = res.data
  }).catch((err)=>{
    loading.value = false
    errMsg.value = err || '未知错误'
  })
  return {
    loading,
    data,
    errMsg
  }
}
```

```vue
<template>
  <div>自定义hook函数</div>
  <div v-if="loading">正在加载中</div>
  <div v-else-if="errMsg">{{errMsg}}</div>
  <!-- <ui v-else>
    <li>{{data.id}}</li>
    <li>{{data.address}}</li>
    <li>{{data.distance}}</li>
  </ui> -->
  <!--数组-->
  <hr>
  <ul v-for="item in data" :key="item.id">
    <li>{{item.id}}</li>
    <li>{{item.title}}</li>
    <li>{{item.price}}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import useRequest from './hooks/useRequest'
// 定义接口
// interface addressData {
//   id:number
//   address: string
//   distance: string
// }
interface productionData {
  id:string
  title: string
  price: number
}
export default defineComponent({
  name: 'App',
  setup(){
    // const {loading,data,errMsg} = useRequest<addressData>('/data/address.json')
    const {loading,data,errMsg} = useRequest<productionData[]>('/data/production.json')
    // 监视
    watch(data,()=>{
      if(data.value){
        console.log(data.value.length);
      }
    })
    return {
      loading,
      data,
      errMsg
    }
  }
});
</script>
```

## toRefs的使用

### 基本使用

toRefs可以把一个响应式的对象转化为普通对象,该普通对象的每个property都是一个ref 

```vue
<template>
  <div>toRefs的使用</div>
  <div>{{name}}</div>
  <div>{{age}}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    const state = reactive({
      name: '张三',
      age: 40
    })
    // 定时器更新数据
    // toRefs可以把一个响应式的对象转化为普通对象,该普通对象的每个property都是一个ref
    const state2 = toRefs(state)
    setInterval(()=>{
      state2.name.value += '=='
    },1000)
    return {
      // 展开运算之后不是响应式数据
      // ...state
      // toRefs转化完展开后数据才是响应式的
      ...state2
    }
  }
});
</script>
```

主要应用场景是hook函数返回值

### 特点以及使用

用于hook函数传入类型为Ref,但是值是普通数据使用toRef转化为ref对象

父组件

```vue
<template>
  <div>toRef的特点以及使用</div>
  <div>{{state}}</div>
  <div>{{age}}</div>
  <div>{{money}}</div>
  <button @click="upData">更新数据</button>
  <hr>
  <Child :age="age"></Child>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from 'vue';
import Child from './components/child.vue'
export default defineComponent({
  name: 'App',
  setup(){
    const state = reactive({
      money: 100,
      age: 20
    })
    // 把state属性中的age变成ref对象
    const age = toRef(state,'age')
    // 相当于复制了一份数据，新数据变化原数据并不会发生变化
    const money = ref(state.money)
    const upData = ()=>{
      console.log('测试');
      state.age += 2
      age.value += 3
      money.value += 10
    }
    return {
      state,
      age,
      money,
      upData
    }
  },
  components: {
    Child
  }
});
</script>
```

子组件

```vue
<template>
  <div>子组件</div>
  <div>{{age}}</div>
  <div>{{length}}</div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';
function useGet(age:Ref){
  return computed(()=>{
    return age.value.toString().length
  })
}
export default defineComponent({
  name: 'ChildTest',
  props: {
    age: {
      type: Number,
      required: true
    }
  },
  setup(props){
    const length = useGet(toRef(props, 'age'))
    return {
      length
    }
  }
});
</script>
```

## ref获取元素

自动获取焦点

```vue
<template>
  <div>ref获取元素</div>
  <input ref="inputRef" type="text">
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    // 自动获取焦点
    const inputRef = ref<HTMLElement | null>(null)
    // 页面加载后的生命周期
    onMounted(()=>{
      inputRef.value && inputRef.value.focus()
    })
    return {
      inputRef
    }
  }
});
</script>
```

## shallowReactive与shallowRef 

```vue
<template>
  <div>shallowReactive与shallowRef</div>
  <div>{{m1}}</div>
  <div>{{m2}}</div>
  <div>{{m3}}</div>
  <div>{{m4}}</div>
  <button @click="upData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowReactive, shallowRef } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    const m1 = reactive({
      name: '张三',
      age: 20,
      car: {
        name: '宝马'
      }
    })
    const m2 = shallowReactive({
      name: '张三',
      age: 20,
      car: {
        name: '宝马'
      }
    })
    const m3 = ref({
      name: '张三',
      age: 20,
      car: {
        name: '宝马'
      }
    })
    const m4 = shallowRef({
      name: '张三',
      age: 20,
      car: {
        name: '宝马'
      }
    })
    const upData = ()=>{
      // reactive 深度响应式
      // m1.name += '=='
      // m1.car.name += '=='
      // shallowReactive 浅响应式
      // m2.name += '=='
      // m2.car.name += '=='
      // ref 深度响应式
      // m3.value.name += '=='
      // m3.value.car.name += '=='
      // shallRef 浅响应式 不会发生变化
      m4.value.name += '=='
      m4.value.car.name += '=='
    }
    return {
      m1,
      m2,
      m3,
      m4,
      upData
    }
  }
});
</script>
```

reactive 深度响应式 

shallowReactive 浅响应式 

ref 深度响应式 

shallRef 浅响应式 不会发生变化

## readonly与shallowReadonly

```vue
<template>
  <div> readonly与shallowReadonly</div>
  <div>{{state2}}</div>
  <button @click="upData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    const state = reactive({
      name: '张三',
      age: 20,
      car: {
        name: '宝马'
      }
    })
    // const state2 = readonly(state)
    const state2 = shallowReadonly(state)
    const upData = ()=>{
      console.log('测试')
      // 只读数据 深度只读
      // state2.name += '=='
      // state2.car.name += '=='
      // 只读数据 浅只读 深层数据可以修改
      // state2.name += '=='
      state2.car.name += '=='
    }
    return {
      state2,
      upData,
    }
  }
});
</script>
```

readonly  只读数据 深度只读 

shallowReadonly  只读数据 浅只读 深层数据可以修改 

## toRaw与markRaw 

```vue
<template>
  <div> toRaw与markRaw</div>
  <div>{{state}}</div>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
interface User {
  name: string
  age: number
  link?: string[]
}
import { defineComponent, markRaw, reactive, toRaw } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    const state = reactive<User>({
      name: '张三',
      age: 20
    })
    const testToRaw = ()=>{
      console.log('测试')
      // toRaw把代理对象变为普通对象,数据发生变化页面不变化
      const user = toRaw(state)
      user.name += '=='
    }
    const testMarkRaw= ()=>{
      console.log('测试')
      // state.link = ['李四']
      // state.link[0] += '=='
      const link = ['李四']
      // markRaw标记的对象数据,不能成为代理对象
      state.link = markRaw(link)
      setInterval(()=>{
        state.link[0] += '==='
        console.log('1111111111');
        
      },1000)
    }
    return {
      state,
      testToRaw,
      testMarkRaw
    }
  }
});
</script>
```

toRaw把代理对象变为普通对象,数据发生变化页面不变化 

markRaw标记的对象数据,不能成为代理对象 

## customRef使用 

实现防抖效果

```vue
<template>
  <div>customRef使用</div>
  <input type="text" v-model="keyWord">
  <div>{{keyWord}}</div>
</template>

<script lang="ts">
import { customRef, defineComponent } from 'vue';
function useDisbouncedRef<T>(value: T, delay=200){
  let timeId: number
  return customRef((track,trigger)=>{
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeId)
        timeId = setTimeout(()=>{
          value = newValue
          trigger()
        },delay)
      }
    }
  })
}
export default defineComponent({
  name: 'App',
  setup(){
    // const keyWord = ref('abc')
    const keyWord = useDisbouncedRef('abc', 500)
    return {
      keyWord
    }
  }
});
</script>
```

customRef中有两个参数track,trigger 

track 告诉vue追踪数据

trigger 告诉vue更新界面

## provide与inject

使用场景多级组件间的嵌套

```vue
<template>
  <div>provide与inject</div>
  <div>{{color}}</div>
  <button @click="color='red'">红色</button>
  <button @click="color='yellow'">黄色</button>
  <button @click="color='green'">绿色</button>
  <Child />
</template>

<script lang="ts">
import {  defineComponent, provide, ref } from 'vue';
import Child from './components/child.vue'
export default defineComponent({
  name: 'App',
  setup(){
    const color = ref('red')
    provide('color',color)
    return {
      color
    }
  },
  components: {
    Child
  }
});
</script>
```

```vue
<template>
  <div>子组件</div>
  <hr>
  <GrandChild />
</template>

<script lang="ts">
import {  defineComponent } from 'vue';
import GrandChild from './grandchild.vue'
export default defineComponent({
  name: 'ChildTest',
  setup(){
    return {
      
    }
  },
  components: {
    GrandChild
  }
});
</script>
```

```vue
<template>
  <div :style="{color}">孙子组件</div>
  <hr>
</template>

<script lang="ts">
import {  defineComponent, inject } from 'vue';
export default defineComponent({
  name: 'grandChild',
  setup(){
    const color = inject('color')
    return {
      color
    }
  }
});
</script>
```

## 响应式数据的判断方法

```vue
<template>
  <div>响应式数据的判断方法</div>
</template>

<script lang="ts">
import {  defineComponent, isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    // isRef 检测一个值是否为一个ref对象
    console.log(isRef(ref({})))
    // isReactive 检测一个对象是否由reactive创建的
    console.log(isReactive(reactive({})))
    // isReadonly 检测一个对象是否由readonly创建的只读代理
    console.log(isReadonly(readonly({})))
    // isProxy 检测一个对象是否由reactive或readonly方法创建的代理
    console.log(isProxy(readonly({})))
    console.log(isProxy(reactive({})))
    return {
    }
  }
});
</script>
```

## fragment与Teleport组件

vue3中可以没有根标签,内部会将多个标签包含在一个fragment虚拟元素中，减少标签层级，减小内存占用

Teleport标签可以把Teleport标签内的标签放在父组件外的特定的标签中插入显示

父组件

```vue
<template>
  <div>Teleport</div>
  <div>父组件</div>
  <Child />
</template>

<script lang="ts">
import {  defineComponent } from 'vue';
import Child from './components/child.vue'
export default defineComponent({
  name: 'App',
  setup(){
    return {
      
    }
  },
  components: {
    Child
  }
});
</script>

```

子组件

```vue
<template>
  <div>子组件</div>
  <hr>
  <button @click="open=true">打开一个对话框</button>
  <Teleport to="body">
    <div v-if="open">
      <button @click="open=false">关闭</button>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {  defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ChildTest',
  setup(){
    const open = ref(false)
    return {
      open
    }
  }
});
</script>
```

## Suspense组件

异步操作加载组件时显示的默认数据

父组件

```
<template>
  <div>Suspense</div>
  <div>父组件</div>
  <Suspense>
    <template #default><Child /></template>
    <template #fallback>loading...</template>
  </Suspense>
</template>

<script lang="ts">
import {  defineAsyncComponent, defineComponent } from 'vue';
// vue3中这种动态方式引入不行
// const Child = ()=>import('./components/child.vue')
// vue3动态引入组件写法
// const Child = defineAsyncComponent(()=>import('./components/child.vue'))
import Child from './components/child.vue'
export default defineComponent({
  name: 'App',
  setup(){
    return {
      
    }
  },
  components: {
    Child
  }
});
</script>
```

子组件

```vue
<template>
  <div>子组件</div>
  <hr>
</template>

<script lang="ts">
import {  defineComponent } from 'vue';
export default defineComponent({
  name: 'ChildTest',
  setup(){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve({
          mag: '异步操作'
        })
      },2000)
    })
  }
});
</script>
```

## vite项目搭建

```cmd
//node版本要求 12.0以上
npm i vite -g
npm create vite

```

禁用vetur插件 vue3对应插件volar

```
//node 支持ts环境依赖
npm i @types/node --save-dev
```

#### vite.config.ts

https://www.vitejs.net/   参考文档

基础配置

#### router

```cmd
npm i vue-router@next
```

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
    component: layout,
    children: [{
      path: 'index',
      name: 'index',
      component: ()=>import('@/view/home.vue')
    }]
  },
  {
    path: '/user',
    component: layout,
    children: [{
      path: 'info',
      name: 'info',
      component: ()=>import('@/view/user/info.vue')
    }]
  }
]
const router = createRouter({
  history:createWebHashHistory(),
  routes: routes
})
export default router
```

#### vuex

```cmd
npm i vuex@next
```

```ts
import { createStore } from 'vuex'
interface State {
  token: number | null
}
export const store = createStore<State>({
  state() {
    return {
      token: null
    }
  },
  mutations: {
    setToken(state,token) {
      state.token = token
    }
  }
})
```


### element plus 与 sass

```cmd
npm i element-plus --save
npm i sass-loader sass -D
```

### 表格的基本使用

```vue
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.data }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名字" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="地区" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center"  v-for="(item,index) in scope.row.showAddress" :key="index">
            <span>{{ item }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="信息" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.information }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="修改" :destroy-on-close="true">
    <Edit :msg="msg" @closeDialog="closeDialog" />
  </el-dialog>
</template>

<script lang='ts'>
import { ref,onMounted,defineComponent } from 'vue'
import Edit from './components/dialog.vue'
import axios from 'axios'
interface User {
  date: string
  name: string
  address: string,
  id: string,
  information: string,
  showAddress?: string[]
}
export default defineComponent({
  name: 'myProj',
  setup() {
    let dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const tableData = ref([])
    const getList = async ()=>{
      const res = await axios.get('/data/table.json')
      // tableData = res.data
      res.data.forEach((item:any,index:number)=>{
        res.data[index].showAddress = item.address.split(',')
      })
      tableData.value = res.data
      // test.name = '李四'
    }
    let msg = ref({})
    const handleEdit = (index: number, row: User) => {
      // console.log(row)
      msg.value = row
      // console.log(msg)
      dialogFormVisible.value = true
    }
    const closeDialog = ()=>{
      dialogFormVisible.value = false
      getList()
    }
    onMounted(()=>{
      getList()
    })
    return {
      dialogFormVisible,
      formLabelWidth,
      msg,
      handleEdit,
      closeDialog,
      tableData
    }
  },
  components: {
    Edit
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
</style>
```

### 弹出层的基本使用

```vue
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.data }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名字" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="地区" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center"  v-for="(item,index) in scope.row.showAddress" :key="index">
            <span>{{ item }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="信息" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.information }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="修改" :destroy-on-close="true">
    <Edit :msg="msg" @closeDialog="closeDialog" />
  </el-dialog>
</template>

<script lang='ts'>
import { ref,onMounted,defineComponent } from 'vue'
import Edit from './components/dialog.vue'
import axios from 'axios'
interface User {
  date: string
  name: string
  address: string,
  id: string,
  information: string,
  showAddress?: string[]
}
export default defineComponent({
  name: 'myProj',
  setup() {
    let dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const tableData = ref([])
    const getList = async ()=>{
      const res = await axios.get('/data/table.json')
      // tableData = res.data
      res.data.forEach((item:any,index:number)=>{
        res.data[index].showAddress = item.address.split(',')
      })
      tableData.value = res.data
      // test.name = '李四'
    }
    let msg = ref({})
    const handleEdit = (index: number, row: User) => {
      // console.log(row)
      msg.value = row
      // console.log(msg)
      dialogFormVisible.value = true
    }
    const closeDialog = ()=>{
      dialogFormVisible.value = false
      getList()
    }
    onMounted(()=>{
      getList()
    })
    return {
      dialogFormVisible,
      formLabelWidth,
      msg,
      handleEdit,
      closeDialog,
      tableData
    }
  },
  components: {
    Edit
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
</style>
```

```vue
<template>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="日期">
      <el-input v-model="formLabelAlign.data" />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="地区">
      <el-input v-model="formLabelAlign.address" />
    </el-form-item>
    <el-form-item label="信息">
      <el-input v-model="formLabelAlign.information" />
    </el-form-item>
  </el-form>
  <div class="submit">
    <el-button type="primary" @click="submit"
      >提交</el-button
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent,reactive,ref } from 'vue'
export default defineComponent({
  name: 'dialogEdit',
  props: ['msg'],
  setup(props,content) {
    // console.log(props.msg)
    const labelPosition = ref('right')
    let formLabelAlign = reactive({
    })
    formLabelAlign = props.msg
    const submit = ()=>{
      console.log(formLabelAlign)
      content.emit('closeDialog')
    }
    return {
      formLabelAlign,
      labelPosition,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.submit{
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### setup语法糖的使用

```vue
<template>
  <!-- <div style="padding: 10px 0 10px 0"><el-button type="primary" @click="setList">列表配置项</el-button></div> -->
  <div>
    <el-table :data="tableList" border style="width: 100%" height="400">
      <el-table-column prop="name" label="产品名称" width="250" sortable fixed="left" />
      <el-table-column label="产品简称" width="180" sortable>
        <template #default="scope">
          <div>{{ initName(scope.row.name) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="englishShortName" label="英文简称" width="180" sortable />
      <el-table-column prop="code" label="产品代码" width="180" sortable />
      <el-table-column prop="managerName" label="管理人名称" width="180" sortable />
      <el-table-column prop="marketPerson" label="市场部对接人" width="180" sortable show-overflow-tooltip />
      <el-table-column prop="createDate" label="创建时间" width="180" />
      <el-table-column label="操作" fixed="right" width="250">
        <template #default="scope">
          <div>
            <span
              ><el-button type="primary" plain size="mini" @click="setDetail(scope.$index, scope.row)"
                >设置详情</el-button
              ></span
            >
            <span style="padding: 0 10px 0 10px"
              ><el-button type="success" plain @click="copy(scope.$index, scope.row)">复制</el-button></span
            >
            <span><el-button type="danger" plain @click="del(scope.$index, scope.row)">删除</el-button></span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="设置详情" :destroy-on-close="true">
      <Detail :msg="msg" @close="close" />
    </el-dialog>
    <!-- <el-dialog v-model="showList" title="列表配置">
      <Transfer></Transfer>
    </el-dialog> -->
  </div>
</template>

<script setup lang='ts'>
import { fbsProductList, getAllFieldSetting } from '@/api/product'
import Transfer from '@/components/Transfer/index.vue'
import { ref, provide } from 'vue'
import Detail from './detail.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { VNode, VNodeProps } from 'vue'
let listRequest: Function = fbsProductList
let list: Function = getAllFieldSetting
let tableList = ref<[]>([])
listRequest({ page: 1, pageSize: 999999999 }, false).then((res: any) => {
  tableList.value = res.list
  // console.log(res)
})
const initName = (name: string) => {
  if (name.length > 8) {
    return name.slice(0, 8) + '...'
  } else {
    return name
  }
}
let msg = ref<number>(0)
let date = ref<string>('')
let dialogFormVisible = ref<boolean>(false)
const setDetail = (index: number, row: any) => {
  // console.log(row)
  date.value = row.createDate
  msg.value = row.legalEntityId
  dialogFormVisible.value = true
}
const close = () => {
  dialogFormVisible.value = false
}
const copy = (index: number, row: any) => {
  copyText(row.name)
}
const copyText = (text: string) => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage({
    message: '复制成功',
    type: 'success'
  })
}
const del = (index: number, row: any) => {
  ElMessageBox.confirm('是否要删除', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      tableList.value.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {})
}
let showList = ref<boolean>(false)
const setList = () => {
  list({ formType: '014' }).then((res: any) => {
    console.log(res)
  })
  showList.value = true
}
provide('date', date)
</script>

<style lang="scss" scoped>
</style>
```

```vue
<template>
  <div>
    <div class="center">
      <el-form size="mini" :label-position="labelPosition" label-width="150px" :model="form" style="max-width: 460px">
        <el-form-item label="registrationNumber">
          <el-input v-model="form.registrationNumber" placeholder="Please input" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="groupNameMap">
          <el-select v-model="form.groupNameMap" multiple collapse-tags placeholder="Select" style="width: 200px">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="fundId">
          <el-input v-model="form.fundId" placeholder="Please input" clearable :disabled="true" style="width: 200px" />
        </el-form-item>
        <el-form-item label="managerName">
          <el-input v-model="form.managerName" placeholder="Please input" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="registeredAddress">
          <el-input v-model="form.registeredAddress" placeholder="Please input" clearable style="width: 200px" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" style="padding-left: 10px" plain @click="submit">提交</el-button>
      <el-button type="primary" plain @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getFbyProductDetail } from '@/api/product'
import { defineProps, defineEmits, ref, reactive, inject } from 'vue'
const props = defineProps<{
  msg: number
}>()
const emits = defineEmits(['close'])
const labelPosition = ref('right')
const form = reactive({
  registrationNumber: '',
  date: '',
  groupNameMap: [],
  fundId: null,
  managerName: '',
  registeredAddress: ''
})
const date = inject('date') as string
// console.log(date)
form.date = date
let detailRequest: Function = getFbyProductDetail
const options = ref([])
detailRequest(props.msg).then((res: any) => {
  console.log(res)
  options.value = res.groupNameMap
  form.fundId = res.fundId
  if (res.tcompanys.length !== 0) {
    form.registrationNumber = res.tcompanys[0].administratorRegistrationNumber
    form.managerName = res.tcompanys[0].managerName
    form.registeredAddress = res.tcompanys[0].registeredAddress
  }
})

const submit = () => {
  console.log(form)
  console.log('提交')
}
const cancel = () => {
  console.log('取消')
  emits('close')
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## vue3和element plus 踩坑中...

父传子reactive传对象丢失值问题，踩坑中...