# 微信小程序

## 结构目录

1.pages 用来存放所有小程序的页面

2.utils 用来存放工具性质的模块

3.app.js 小程序项目的入口文件

4.app.json 小程序项目的全局配置文件

5.app.wxss 小程序项目的全局样式文件

6.project.config.json 项目的配置文件

7.sitemap.json 用来配置小程序及其页面是否允许被微信索引

### pages 文件夹

1.以.js 结尾的文件(存放页面数据，页面处理函数等)

2.以.json 结尾的文件(当前页面的配置文件，配置窗口的外观，表现)

3.以.wxml 结尾的文件(页面的结构模板文件)

4.以.wxss 结尾的文件(当前页面的样式表)

### app.json

```json
{
    "pages": ["pages/index/index", "pages/logs/logs"],
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "Weixin",
        "navigationBarTextStyle": "black"
    },
    "style": "v2",
    "sitemapLocation": "sitemap.json"
}
```

pages 存放所有页面的路径

window 定义所有页面的背景色，文字颜色

style 定义小程序所使用的样式版本

sitemaplocation 指明 sitemap.json 的位置

### 新增页面

app.json 中增加 pages 的路径，微信开发者工具会创建好

```json
"pages":[
    "pages/index/index",
    "pages/logs/logs",
    "pages/list/list"
  ],
```

### WXML

div view

span text

img image

a navigator

### WXSS

app.wxss 会在全局生效

局部的.wxss 仅对当前页面生效 全局和局部有同样样式时局部会覆盖全局的样式

## 组件的基本使用

效果图:

![1654071491608](C:\Users\Admin\AppData\Local\Temp\1654071491608.png)

wxml

```js
<!--pages/list/list.wxml-->
<view class="container1">
  <view>A</view>
  <view>B</view>
  <view>C</view>
</view>
<scroll-view class="container2" scroll-y>
  <view>A</view>
  <view>B</view>
  <view>C</view>
</scroll-view>
<!-- 轮播图 -->
<swiper class="swiper-container" indicator-dots="true" indicator-active-color="blue" indicator-color="white" autoplay="true" interval="1000" circular="true">
  <swiper-item class="item" style="background-color: red;">A</swiper-item>
  <swiper-item class="item" style="background-color: green;">B</swiper-item>
  <swiper-item class="item" style="background-color: yellow;">C</swiper-item>
</swiper>
<view>
  <text selectable>123456789</text>
  <rich-text nodes="<h1>标题</h1>"></rich-text>
</view>
<button size="mini" plain>普通按钮</button>
<button size="mini" type="primary" plain>主色调按钮</button>
<button size="mini" type="warn" plain>警告</button>
<image src="https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF" mode="heightFix"></image>
```

wxss

```css
/* pages/list/list.wxss */
.container1 view {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.container1 {
    display: flex;
    justify-content: space-around;
}
.container1 view:nth-child(1) {
    background-color: red;
}
.container1 view:nth-child(2) {
    background-color: green;
}
.container1 view:nth-child(3) {
    background-color: yellow;
}
.container2 view:nth-child(1) {
    background-color: red;
}
.container2 view:nth-child(2) {
    background-color: green;
}
.container2 view:nth-child(3) {
    background-color: yellow;
}
.container2 view {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.container2 {
    border: 1px solid red;
    width: 100px;
    height: 120px;
}
.swiper-container {
    height: 150px;
}
.item {
    height: 100%;
    line-height: 150px;
    text-align: center;
}
image {
    border: 1px solid red;
}
```

### 事件绑定传参与数据同步

```js
<!--index.wxml-->
<view>{{info}}</view>
<image mode="widthFix" src="{{img}}"></image>
<view>{{num >= 5 ? '大于等于五':'小于五'}}</view>
<view>{{num1 * 100}}</view>
<button size="mini" type="primary" bindtap="click">点击</button>
<view>{{count}}</view>
<button size="mini" type="primary" bindtap="click" data-info="{{2}}">+1</button>
<input value="{{msg}}" bindinput="handler" type="text" />
```

```js
// index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        info: 'hello word',
        img: 'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF',
        num: Math.random() * 10,
        num1: Math.random().toFixed(2),
        count: 0,
        msg: '123456',
    },
    click(e) {
        // console.log(e);
        this.setData({
            count: this.data.count + e.target.dataset.info,
        })
        console.log(e.target.dataset.info)
    },
    handler(e) {
        // console.log(e.detail.value);
        this.setData({
            msg: e.detail.value,
        })
    },
})
```

### 条件渲染

```js
<!--index.wxml-->
<view wx:if="{{type===1}}">男</view>
<view wx:elif="{{type===2}}">女</view>
<view wx:else="{{type===1}}">保密</view>
<button bindtap="add">+1</button>
<block wx:if="{{type===2}}">
  <view>view1</view>
  <view>view2</view>
</block>
<view hidden="{{show}}">条件为true是隐藏</view>
```

```js
// index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type: 1,
        show: true,
    },
    add() {
        this.setData({
            type: this.data.type + 1,
            show: !this.data.show,
        })
    },
})
```

block 与 template 模板类似

wx: if hidden 与 v-if v-show 类似

### 列表渲染

```wxml
<!--index.wxml-->
<view wx:for="{{arr}}" wx:key="index">
{{index}}---{{item}}
</view>
<view wx:for="{{arr}}" wx:for-index="index1" wx:for-item="item1" wx:key="index1">
{{index1}}---{{item1}}
</view>
```

```js
data: {
    arr: ['苹果', '华为', '小米']
}
```

## wxss 与 css

#### 样式导入

```css
//示例
@import '/common/common.wxss';
```

#### 全局样式与局部样式

1.当局部样式与全局样式冲突时，根据就近原则，局部样式会覆盖全局样式

2.当局部样式的权重大于或等于全局样式的权重时，才会覆盖全局的样式

## 全局配置

#### app.json-window 配置

1."navigationBarTitleText": "测试项目" //导航栏标题文本

2."navigationBarBackgroundColor": "#2b4b6b" //导航栏背景色 只支持 16 进制

3."navigationBarTextStyle":"white" //导航栏文字颜色 只支持 white 和 black

#### app.json-window 下拉刷新

1."enablePullDownRefresh": true //下拉刷新

#### app.json-window 下拉刷新时窗口背景色

1."backgroundColor": "#efefef" //下拉刷新时窗口背景色

#### app.json-window 下拉刷新时 loading 的样式

1."backgroundTextStyle":"dark" // light dark

#### app.json-window 上拉触底

1."onReachBottomDistance": 50 //默认 50

#### tabBar

基础配置

![1654654924290](C:\Users\Admin\AppData\Local\Temp\1654654924290.png)

```json
"tabBar": {
    "list": [{
      "pagePath": "pages/home/home",
      "text": "首页",
      "iconPath": "/images/home.png",
      "selectedIconPath": "/images/home-o.png"
    },{
      "pagePath": "pages/message/message",
      "text": "消息通知",
      "iconPath": "/images/category.png",
      "selectedIconPath": "/images/category-o.png"
    },
    {
      "pagePath": "pages/contact/contact",
      "text": "联系我们",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/my-o.png"
    }]
  }
```

## 页面配置

当页面配置与全局配置冲突时,根据就近原则,最终的效果以页面配置为准

"navigationBarBackgroundColor": "#ff0000" //当前页面导航栏的背景颜色
"navigationBarTextStyle": "black" //当前页面导航栏文字颜色

"backgroundColor": "#ff0000" //下拉背景颜色

"backgroundTextStyle": "light" //下拉框加载颜色

"enablePullDownRefresh": true //下拉刷新

## 声明式导航

```wxml
//跳转到tabBar页面
<navigator url="/pages/message/message" open-type="switchTab">导航到消息通知</navigator>
//跳转到非tabBar页面 open-type默认值是navigate 可省略
<navigator url="/pages/info/info" open-type="navigate">导航到info</navigator>
//后退 delta 默认值为1 可省略
<navigator open-type="navigateBack" delta="1">后退</navigator>
```

## 编程式导航

```js
//跳转到tab页面
goMessage(){
    wx.switchTab({
      url: '/pages/message/message'
    })
},
//跳转到非tab页面
goInfo(){
    wx.navigateTo({
      url: '/pages/info/info',
    })
},
// 后退
back(){
    wx.navigateBack()
},
```

## 导航传参

#### 声明式

```wxml
//示例
<navigator url="/pages/info/info?name=zs&age=19" open-type="navigate">导航到info</navigator>
```

#### 编程式

```js
//示例
wx.navigateTo({
  url: '/pages/info/info?name=ls&gender=男',
})
//对象转字符串方法
objToStr(obj){
  let arr = [];
  for(let attr in obj){
    arr.push(attr + '=' + obj[attr])
  }
  return arr.join('&')
},
```

#### 接收参数

```js
//转存到data中
onLoad(options) {
    // console.log(options);
    this.setData({
        query: options
    })
},
```

## 页面事件

#### 下拉刷新

```js
//示例  不会自动关闭下拉
onPullDownRefresh() {
    console.log('下拉刷新');
    this.setData({
        count: 0
    })
    //关闭下拉刷新
    wx.stopPullDownRefresh()
},
```

#### 上拉触底

```js
//上拉触底
onReachBottom() {
    console.log('上拉触底');
},
```

#### loading 加载

```js
//wx api   打开loading
wx.showLoading({
    title: '数据加载中...',
})
//关闭loading
wx.hideLoading()
```

## 生命周期

#### 应用生命周期

app.js

```js
App({
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        //数据初始化
        console.log('初始化')
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
        console.log('后台进入前台触发')
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {
        console.log('前台进入后台')
    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {},
})
```

#### 页面生命周期

app.js

```js
// pages/info/info.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载 一个页面只调用一次
     */
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面初次渲染完成 一个页面只调用一次
     */
    onReady() {
        //设置导航栏标题
        wx.setNavigationBarTitle({
            title: '个人信息',
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载 一个页面只调用一次
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
})
```

## wxs

一般当作过滤器使用

```wxml
<view>
    <view>{{m1.toUpper(name)}}</view>
</view>
<wxs module="m1">
    module.exports.toUpper = function(str){
        return str.toUpperCase()
    }
</wxs>
```

外联写法

```
<view>
    <view>{{m2.toLower(upper)}}</view>
</view>
<wxs src="/utils/tools.wxs" module="m2"></wxs>
```

.wxs 文件

```wxs
function toLower(str) {
    return str.toLowerCase()
}
module.exports = {
    toLower: toLower,
}
```

## 自定义组件

#### 局部引用

```json
{
    "usingComponents": {
        "my-test": "/components/test/test"
    }
}
```

在局部的.json 中配置
键值对方式，键为 wxml 中的标签名

#### 全局引用

```json
"usingComponents": {
    "my-test": "/components/test/test"
  }
```

在全局的 app.json 中配置

键值对方式，键为 wxml 中的标签名

#### 组件样式隔离

全局样式对组件无效

只有 class 受样式隔离的影响

#### 启用样式隔离

.js 文件中

```js
options: {
    styleIsolation: 'isolated'
}
```

.json 文件中

```json
{
    "component": true,
    "usingComponents": {},
    "styleIsolation": "isolated"
}
```

#### 基本使用

```wxml
<view>count值为:{{count}}</view>
<button bindtap="add">+1</button>
```

```js
// components/test/test.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        count: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        add() {
            this.setData({
                count: this.data.count + 1,
            })
            this._showAlert()
        },
        _showAlert() {
            wx.showToast({
                title: 'count是' + this.data.count,
                icon: 'none',
            })
        },
    },
    options: {
        styleIsolation: 'isolated',
    },
})
```

#### properties 属性

类似于 vue 中的父传子

```js
//接受
properties: {
    max: Number,
    min: {
        type: Number,
        value: 99
    }
},
//使用
add(){
    if(this.data.count > this.properties.max) return
    this.setData({
        count: this.data.count + 1
    })
    this._showAlert()
}
```

如需修改 properties 中的值直接使用 this.setData 即可

#### 数据监听器

```wxml
<view>{{n1}} + {{n2}} = {{sum}}</view>
<button bindtap="addn1">n1+</button>
<button bindtap="addn2">n2+</button>
```

```js
// components/test/test.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        n1: 0,
        n2: 0,
        sum: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addn1() {
            this.setData({ n1: this.data.n1 + 1 })
        },
        addn2() {
            this.setData({ n2: this.data.n2 + 1 })
        },
    },
    observers: {
        'n1,n2': function (new1, new2) {
            this.setData({
                sum: new1 + new2,
            })
        },
    },
    options: {
        styleIsolation: 'isolated',
    },
})
```

#### 数据监听基本案例

```wxml
<!--components/test/test.wxml-->
<view class="colorBox" style="background-color: rgb({{fullColor}});">{{fullColor}}</view>
<button size="mini" type="default" bindtap="edit1">R</button>
<button size="mini" type="primary" bindtap="edit2">G</button>
<button size="mini" type="warn" bindtap="edit3">B</button>
```

```js
// components/test/test.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        rgb: {
            r: 0,
            g: 0,
            b: 0,
        },
        fullColor: '0,0,0',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        edit1() {
            this.setData({
                'rgb.r': this.data.rgb.r + 5 > 255 ? 255 : this.data.rgb.r + 5,
            })
        },
        edit2() {
            this.setData({
                'rgb.g': this.data.rgb.g + 5 > 255 ? 255 : this.data.rgb.g + 5,
            })
        },
        edit3() {
            this.setData({
                'rgb.b': this.data.rgb.b + 5 > 255 ? 255 : this.data.rgb.b + 5,
            })
        },
    },
    observers: {
        'rgb.r,rgb.g,rgb.b': function (r, g, b) {
            this.setData({
                fullColor: `${r},${g},${b}`,
            })
        },
    },
    options: {
        styleIsolation: 'isolated',
    },
})
```

效果：

![1655953007421](C:\Users\Admin\AppData\Local\Temp\1655953007421.png)

#### 监听对象中的所有属性

```js
observers:{
    'rgb.**': function(rgb){
        this.setData({
            fullColor: `${rgb.r},${rgb.g},${rgb.b}`
        })
    }
}
```

#### 纯数据字段

```js
options: {
    pureDataPattern: /^_/ //纯数据字段
}
```

#### 组件生命周期

created 组件实例刚被创建时执行 主要 不能调用 setData

attached 在组件实例进入页面节点树时执行 主要 请求在这里

ready 在组件在视图层布局完成后执行

moved 在组件实例被移动到节点树另一个位置时执行

detached 在组件实例被页面节点树移除时执行 主要 退出页面会触发

error 每当组件方法抛出错误时执行

lifetimes 节点中定义生命周期函数

#### 组件所在页面的生命周期

show 组件所在页面被展示时执行

hide 组件所在页面被隐藏时执行

resize 组件所在页面发生尺寸变化时执行

pageLifetimes 节点中定义生命周期函数

#### 插槽

页面

```wxml
<my-test>
  <view slot="before">这是通过插槽填充的内容</view>
  <view slot="after">~~~~~~</view>
</my-test>
```

组件

```wxml
<view>
  <view>这里是组件的内部</view>
  <slot name="before"></slot>
  <slot name="after"></slot>
</view>
```

```js
//多个插槽需要开启这个属性
options: {
    multipleSlots: true
}
```

## 组件通信

#### 父传子

和 vue 中类似，绑定属性 properties 接收

#### 子传父

和 vue 中类似

```js
//调用父组件的方法
this.triggerEvent('setCount',{value: this.data.count})
//父组件接收
getCount(e){
  this.setData({
      count: e.detail.value
  })
}
```

#### 获取子组件的方法与属性

与 vue 中的 ref 用法类似

```js
getChild(){
      const child = this.selectComponent('.child')
    //   console.log(child);
    child.setData({
        count: child.properties.count + 100
    })
  }
```

### behaviors

类似于 vue 中的 mixins

```js
module.exports = Behavior({
    data: {
        username: '张三'
    }
})

//使用
//导入
const myBehaviores = require('../../behaviors/my-behaviors')
//注册
behaviors: [myBehaviores],
```

## 小程序中的 npm 包

1.不支持依赖于 node.js 内置库的包

2.不支持依赖于浏览器内置对象的包

3.不支持依赖于 c++插件的包

小程序能使用的包为数不多

https://youzan.github.io/vant-weapp/#/home

## css 变量

```wxss
page {
    --button-danger-background-color: #c00000;
    --button-danger-border-color: #d60000;
}
```

## API 的 promise 化

```js
npm i --save miniprogram-api-promise@1.0.4
```

```js
import { promisifyAll } from 'miniprogram-api-promise'
const wxp = (wx.p = {})
promisifyAll(wx, wxp)
```

```js
//示例
getinfo(){
  wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: 'GET'
  }).then(res=>{
      console.log(res);
  })
}
```

## 全局数据共享

```js
npm i --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

```js
// 创建store的实例对象
import { observable, action } from 'mobx-miniprogram'
export const store = observable({
    name: '张三',
    age: 18,
    num: 1,
    //计算属性
    get sum() {
        return this.age + this.num
    },
    //actions方法
    updateName: action(function (name) {
        this.name = name
    }),
    updateAge: action(function (age) {
        this.age = age
    }),
})
```

### 在页面中使用 store

```wxml
<view>{{name}}</view>
<view>{{age}}</view>
<view>{{sum}}</view>
<van-button type="danger" bindtap="setage">设置年龄</van-button>
<van-button type="danger" bindtap="setname">设置名字</van-button>
```

```js
// pages/message/message.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['name', 'age', 'sum'],
            actions: ['updateName', 'updateAge'],
        })
    },
    setage() {
        this.updateAge(200)
    },
    setname() {
        this.updateName('李四')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.storeBindings.detroyStoreBinds()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
})
```

### 在组件中使用 store

```wxml
<view>测试</view>
<view>{{name}}</view>
<view>{{age}}</view>
<view>{{sum}}</view>
<van-button type="primary" bindtap="setage">设置年龄</van-button>
<van-button type="primary" bindtap="setname">设置名字</van-button>

```

```js
// components/test/test.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            name: 'name',
            age: 'age',
            sum: 'sum',
        },
        actions: {
            updateName: 'updateName',
            updateAge: 'updateAge',
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        setname() {
            this.updateName('王五')
        },
        setage() {
            this.updateAge(100000)
        },
    },
})
```

## 分包

单个分包不超过 2m

#### 分包基础配置

在全局的 app.json 中

```json
"subpackages": [
      {
          "root": "pkgA",
          "name": "p1",
          "pages": [
              "pages/cat/cat",
              "pages/dog/dog"
          ]
      },
      {
          "root": "pkgB",
          "name": "p2",
          "pages": [
              "pages/apple/apple"
          ]
      }
  ]
```

name 属性为别名

#### 独立分包

普通分包必须依赖于主包才能运行

独立分包可以在不下载主包的情况下，独立运行

一个小程序中可以有多个独立分包

```json
"subpackages": [
      {
          "root": "pkgA",
          "name": "p1",
          "pages": [
              "pages/cat/cat",
              "pages/dog/dog"
          ]
      },
      {
          "root": "pkgB",
          "name": "p2",
          "pages": [
              "pages/apple/apple"
           ],
           "independent": true
      }
  ]
```

"independent": true 为独立分包设置

#### 分包预下载

```json
"preloadRule": {
      "pages/contact/contact": {
          "packages": ["p1"],
          "network": "all"
      }
  }
```

#### 分包预下载的限制

同一个分包中的页面享有共同的预下载大小限额 2m

### 自定义 tabBar

#### 组件样式覆盖

```js
options: {
    styleIsolation: 'shared'
}
```

#### 基本案例

store 配置

```js
// 创建store的实例对象
import { observable, action } from 'mobx-miniprogram'
export const store = observable({
    name: '张三',
    age: 18,
    num: 1,
    activeTarBarIndex: 0,
    //计算属性
    get sum() {
        return this.age + this.num
    },
    //actions方法
    updateName: action(function (name) {
        this.name = name
    }),
    updateAge: action(function (age) {
        this.age = age
    }),
    updateActive: action(function (index) {
        this.activeTarBarIndex = index
    }),
})
```

```wxml
<van-tabbar active="{{active}}" bind:change="onChange" active-color="#13A7A0">
  <van-tabbar-item wx:for="{{list}}" wx:key="index" info="{{item.info?item.info:''}}">
    <image
      slot="icon"
      src="{{item.iconPath}}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
    />
    <image
      slot="icon-active"
      src="{{item.selectedIconPath}}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
    />
    {{item.text}}
  </van-tabbar-item>
</van-tabbar>

```

```js
// custom/index.
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'
Component({
    /**
     * 组件的属性列表
     */
    options: {
        styleIsolation: 'shared',
    },
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            age: 'age',
            active: 'activeTarBarIndex',
        },
        actions: {
            updateActive: 'updateActive',
        },
    },
    observers: {
        age: function (val) {
            this.setData({
                'list[1].info': val,
            })
        },
    },
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        list: [
            {
                pagePath: '/pages/home/home',
                text: '首页',
                iconPath: '/images/tabs/home.png',
                selectedIconPath: '/images/tabs/home-active.png',
            },
            {
                pagePath: '/pages/message/message',
                text: '消息',
                iconPath: '/images/tabs/message.png',
                selectedIconPath: '/images/tabs/message-active.png',
                info: '2',
            },
            {
                pagePath: '/pages/contact/contact',
                text: '联系我们',
                iconPath: '/images/tabs/contact.png',
                selectedIconPath: '/images/tabs/contact-active.png',
            },
        ],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            // event.detail 的值为当前选中项的索引
            this.updateActive(event.detail)
            wx.switchTab({
                url: this.data.list[event.detail].pagePath,
            })
        },
    },
})
```
