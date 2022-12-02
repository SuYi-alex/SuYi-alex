# Git

## 配置

- name

```bash
  git config --global user.name "名字"
```

- email

```bash
  git config --global user.email "邮箱"
```

- 查看用户名

```bash
 git config user.name
```

- 查看密码

```bash
 git config user.password
```

- 查看邮箱

```bash
 git config user.email
```

- 查看配置信息

```bash
   git config --list

```

## 使用 git

### 基本操作

- 初始化仓库

```bash
git init
```

- 暂存 （未跟踪--->暂存）

```bash
  git add <filename>

```

- 提交（暂存---->未修改）

```bash
 git commit -m "描述内容", #将文件提交到仓库
 git commit -a -m === git add +git commit #提交所有已修改文件
```

- 重置文件

```bash
 git restore <filename>
 git restore --staged <filename> #取消暂存状态
```

- 删除文件

```bash
  git rm <filename>
  git rm <filename> -f #强制删除
```

- 移动文件

```bash
git mv from to # 移动文件 重命名文件
```

- 查看所有提交历史版本

```bash
 git log
```

- 回退版本

```bash
  git reset --hard HEAD^
```

- 版本之间的跳转

```bash
  git reset --hard 版本名称
```

- 管理空文件

```bash
 .gitkeep
```

- 管理黑名单文件夹

```bash
  .gitignore
```

- 将暂存区的东西放回工作区

```bash
git reset HEAD-- 文件名

```

- 将暂存区的所有内容放回工作区

```bash
  git reset HEAD-- .

```

### 分支操作

- 查看所有分支

```bash
  git branch
```

- 新建分支

```bash
  git branch 分支名
```

- 删除分支

```bash
  git branch -d 被删除的分支
  #注意：（不能删除当前分支，master 可以被删）
```

- 切换分支

```bash
  git checkout 分支名
  git switch 分支名 #（最新版 git 才可以使用）
```

- 新建并切换到新分支

```bash
  git checkout -b 分支名
  git switch -c 分支名 #（最新版 git 才可以使用）
```

- 合并分支

```bash
 git merge 被合并的分支
  ○ 快速合并
  ○ 自动合并（有可能产生冲突）
```

- 重命名分支

```bash
  git branch -m <当前分支名> <新的分支名>

```

### 变基（rebase）

git rebase 要变基到分支分支（例如：git rebase master）
在开发中除了使用 merge 合并，还可以使用变基完成分支合并
通过 merge 合并分支时，在提交记录中会将所有的分支创建和分支合并的过程全部显示出来，当项目比较复杂，开发周期比较长，我们必须要反复的创建，合并，删除分支，这样一来将会使得我们提交记录变得较为混乱。

**原理（变基时发生了什么）**：

1. 当我们发起变基时，git 首先会找到两条分支最近的共同的祖先
2. 对比当前分支相对于祖先分支的历史提交，并且将他们提取出来存到一个临时文件中
3. 将当前部分指向目标基底
4. 以当前基底开始，重新执行历史操作
   变基和 merge 对于合并分支来说最终结果是一样的，但是变基会使得我们的提交记录更整洁更清晰！
   注意：大部分情况下合并和变基可以互换的，但是如果分支已经提交到了远程仓库，那么这时尽量不要使用变基。

### 远程仓库（remote）

- 列出当前关联的远程库

```bash
  git remote
```

- 查看你刚新建的连接

```bash
  git remote -v
```

- 关联远程仓库

```bash
  git remote add gitee https://gitee.com/anker_111/zhimeng.git
  关联多个远程仓库
  git remote add origin git@github.com:SuYi-alex/git-demo.git
```

- 修改分支名字

```bash
 git branch -M main
```

- 删除远程库

```bash
  git remote rm origin #（删除关联的 origin 的远程库）
```

- 推送远程仓库

```bash
  git push origin master
  git push -u origin master #向远程库推送代码，并和当前分支关联
  git push <远程库> <本地分支>:<远程分支> #推送到指 定的远程分支
```

- 克隆下载

```bash
  git clone 远程库名称
  git clone 远程库名称 文件夹名称 #克隆并修改下载的文件夹名称
```

> 如果本地的版本低于远程库，push 默认是推送不上去的
> 一定确保本地和远程库版本一致
> 推送代码之前，一定先从远程库拉取最新的代码

- 同步拉取

```bash
  1.git fetch #fetch 他会从远程仓库下载所有代码，但是他不会将代码和当前分支自动合并
  #使用 fetch 拉取代码后，必须手动进行合并
  git merge origin/master #合并远程分支到当前分支
```

```bash
  2.git pull #从远程库拉取代码，并自动合并

```

### tag 标签

- 回到某个历史版本

  ```bash
  git switch <提交 id> --detach #（修改头指针位置）
  ```

  > 当头指针没有指向某个分支的头部时，这种状态称之为分离头指针（HEAD detached），分离头指针的状态下也可以操作代码，但是这些操作不会出现在热任何分支上，所以不要在分离头指针状态下操作仓库

  > 如果非得要回到指定的节点操作，则可以选择创建分支后操作（例如：git switch -c test d12be2【创建一个 test 分支，并指向 d12be2 节点】）
  >
  > **git switch -c <分支名> <提交 id>**

**可以为提交记录设置标签，设置标签以后，可以通过标签快速识别出不同的开发节点**

- 查看标签

```bash
  git tag
```

- 设置标签

```bash
  git tag <版本>【例如：git tag v1.0】
  git tag <版本> <提交 id> #给指定的节点设置标签【例如：git tag v1.0 7d3c4】
```

- 推送标签到远程仓库

```bash
  git push origin <标签名>
  git push origin --tags #推送所有标签到远程仓库
```

- 删除标签

```bash
  git tag -d <标签名>
  git push origin --delete <标签名> # 删除远程仓库标签
```

### github 部署静态页面

- 在 github 中，可以将自己的静态页面直接部署到 github 上，他会给我们提供一个地址使得我们的页面变成一个真正的网站，可以供用户访问
- 要求：
  - 静态页面的分支必须叫做：gh-pages
  - 如果希望页面可以通过 xxxx.github.io 访问，则需要将库的名字配置为 xxxx.github.io

### docusaurus

- facebook 推出的开源的静态内容管理系统，通过它可以快速部署一个静态网站
- 使用
  - 网址
    - https://www.docusaurus.cn/
  - 安装
    - npx create-docusaurus@latest my-website classic
  - 启动项目
    - npm start 或 yarn start
  - 构建项目
    - npm run build 或 yarn build
  - 配置项目
    - docusaurus.config.js:项目配置文件
  - 添加页面
    - 在 docusaurus 框架中，页面分为三种：1.page，2.blog，3.doc
