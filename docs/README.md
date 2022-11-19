---
home: true
title: Home
heroImage: /logo.png
actionText: 快速上手→ 
actionLink: /guide/getstart.md
features:
  - title: 基础篇
    details: 帮你梳理常见的前端基础面试题
  - title: 进阶篇
    details: 提炼分析面试难点，助你快速理解
  - title: 高频篇
    details: 精心整理高频面试题型归类
  - title: 手写篇
    details: 高频常见手写题
  - title: 原理篇
    details: 面试题型原理解析
  - title: 面经篇
    details: 大厂面经真题整理
footer: MIT Licensed | Copyright © 2018-present Evan You
---

## 像数 1, 2, 3 一样容易
``` sh
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```
::: warning 警告
请确保你的 Node.js 版本 >= 8.6
:::