# 快速上手
::: warning 前提条件
VuePress 需要 Node.js (opens new window)>= 8.6
:::
本文会帮助你从头搭建一个简单的 VuePress 文档。如果你想在一个现有项目中使用 VuePress 管理文档，

1. 创建并进入一个目录
``` sh
mkdir vuepress-starter && cd vuepress-starter
```
2. 使用你喜欢的包管理器进行初始化
``` sh
yarn init # npm init
```
3. 将VuePress安装为本地依赖<br>
我们已经不再推荐全局安装 VuePress
``` sh
yarn add -D vuepress # npm install -D vuepress
```
4. 创建你的第一篇文档
``` sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```
5. 在 package.json 中添加一些 scripts<br>
这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。
``` sh
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
6. 在本地启动服务器
``` sh
yarn docs:dev # npm run docs:dev
```
VuePress 会在 [MyBlog](http://localhost:8080 )启动一个热重载的开发服务器。

在 [github](https://github.com/ ) 上编辑此页