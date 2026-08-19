---
date: 2026-07-16 17:12
title: 如何参与开源项目
outline: deep
description: 面向零基础开发者，完整讲解开源贡献全流程：Fork、Clone、建分支、修改、推送、发 PR 到合并，附 PR 模板与提交规范，并以 first-contributions 仓库实操演示。
ogImage: /how-to-contribute-to-open-source/01.png
---
# 如何参与开源项目

## 0x00 起因
发现了两个比较好的新手入门开源仓库：

> ✨[first-contributions](https://github.com/firstcontributions/first-contributions)：
> 面向零基础贡献者，通过添加自己的名字带你完整走一遍 Fork、Clone、创建分支、提交和发起 PR 的流程。
>
> ✨[code-contributions](https://github.com/Roshanjossey/code-contributions)：
> 在完成首次 PR 后进一步练习真实代码修改，帮助新手熟悉向开源项目贡献代码的完整过程。

## 0x01 常见开源贡献流程

```text
Fork 原仓库
    ↓
Clone 自己的 Fork 到本地
    ↓
创建功能分支
    ↓
修改代码并运行测试
    ↓
Commit 并 Push 到自己的 Fork
    ↓
向原仓库提交 Pull Request
    ↓
根据评审意见继续修改
    ↓
维护者合并 PR
```

### 1. Fork 原仓库

`Fork` 可以理解为：把别人的 GitHub 仓库复制一份到自己的 GitHub 账号下。

例如原仓库是：

```text
majiayu000/profile-control-plane
```

Fork 后会得到：

```text
你的用户名/profile-control-plane
```

这两个仓库彼此独立。你可以在自己的 Fork 中创建分支、修改代码、提交和推送，而不会直接影响原仓库。修改完成后，再通过 Pull Request（PR）请求原作者合并。

在 GitHub 的原仓库页面点击右上角的 **Fork** 即可创建副本。

### 2. Clone 自己的 Fork

```bash
git clone https://github.com/你的用户名/profile-control-plane.git
cd profile-control-plane
```

### 3. 添加原仓库为 upstream

一般将自己的 Fork 称为 `origin`，将原仓库称为 `upstream`：

```bash
git remote add upstream https://github.com/majiayu000/profile-control-plane.git
git remote -v
```

对应关系如下：

```text
origin    自己的 Fork
upstream  原始仓库
```

### 4. 创建独立开发分支

不要直接在 `main` 分支上开发：

```bash
git switch -c fix/svg-rendering
```

常见分支命名示例：

```text
fix/svg-rendering
feat/new-theme
docs/improve-quickstart
test/config-validation
```

### 5. 修改并验证

开始修改前，应先阅读仓库中的 `README.md`、`CONTRIBUTING.md` 和相关开发文档。

不同项目的验证命令并不相同，应以项目贡献文档为准。本文前面提到的 `first-contributions` 只要求在 `Contributors.md` 中添加自己的名字，因此修改后可以先检查文件状态和差异：

```bash
git status
git diff -- Contributors.md
```

如果参与的是需要修改代码的项目，还应按照其 `CONTRIBUTING.md` 运行对应的格式检查、静态检查和自动化测试，确认全部通过后再提交。

尽量保持每次修改的范围足够小，不要在一个 PR 中混入无关重构。

### 6. 提交修改

```bash
git status
git diff
git add 具体文件
git commit -m "fix: handle invalid SVG references"
```

提交信息应说明「做了什么」，必要时在正文中解释「为什么」。

### 7. 推送到自己的 Fork

```bash
git push -u origin fix/svg-rendering
```

推送完成后，在 GitHub 页面点击 **Compare & pull request**。

### 8. 创建 Pull Request

Pull Request，简称 PR，表示：

> 我在自己的分支中完成了一组修改，请原仓库维护者评审并考虑合并。

PR 描述通常包含：

- 修改解决了什么问题；
- 采用了什么实现方式；
- 如何验证修改；
- 是否关联 Issue，例如 `Fixes #123`；
- 如果修改了界面，可以附上截图。


GitHub 官方建议让 PR 保持小而聚焦，并在描述中说明修改目的、改动概要、相关上下文和测试情况。下面是一份适合大多数开源项目、可直接复制使用的模板：

````markdown
## 修改说明

<!-- 用 1～3 句话说明这个 PR 做了什么，以及为什么需要这项修改。 -->

## 关联 Issue

<!-- 合并 PR 后需要自动关闭 Issue 时，使用：Closes #123 或 Fixes #123。 -->
Closes #123

## 主要改动

- 修改了……
- 新增了……
- 修复了……

## 验证方式

<!-- 写出评审者可以复现的命令或操作步骤。 -->

1. 执行 `...`
2. 打开 `...`
3. 确认 `...`

测试结果：

- [ ] 已通过现有自动化测试
- [ ] 已添加或更新相关测试
- [ ] 已完成手动验证
- [ ] 文档已同步更新（如需要）

## 截图或演示

<!-- 涉及 UI、终端输出或行为变化时提供；不适用可删除本节。 -->

修改前：

修改后：

## 兼容性与风险

<!-- 说明破坏性变更、兼容性影响、迁移方式或潜在风险；没有则填写「无」。 -->

无。

## 评审提示

<!-- 可选：指出希望评审者重点查看的文件、实现方案或待讨论问题。 -->

- 建议从 `src/...` 开始评审。
- 请重点确认……
````

使用模板时应删除无关章节和提示注释，避免为了填满模板而制造无效信息。标题也应直接描述结果，例如 `fix: prevent invalid SVG references`，不要只写 `fix bug` 或 `update code`。

补充说明：

- `Closes #123`、`Fixes #123` 或 `Resolves #123` 可以关联 Issue；当 PR 合并到默认分支时，GitHub 会自动关闭对应 Issue。
- 如果只是相关但不应自动关闭，可以写 `Related to #123`。
- 创建 PR 前先检查 base 仓库、base 分支以及 compare 分支是否正确。
- 提交 PR 后尽量避免强制推送，否则维护者较难看清你针对评审意见做了哪些增量修改。
- 仓库维护者可以把模板保存为 `.github/pull_request_template.md`，之后贡献者创建 PR 时会自动看到模板内容。

参考资料：

- [GitHub Docs：帮助他人评审你的修改](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/helping-others-review-your-changes)
- [GitHub Docs：将 Pull Request 关联到 Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
- [GitHub Docs：创建 Pull Request 模板](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

### 9. 响应代码评审

如果维护者要求调整，可以继续在原分支修改并推送：

```bash
git add 具体文件
git commit -m "fix: address review feedback"
git push
```

对应的 PR 会自动更新，通常不需要重新创建。

## 0x02 同步上游仓库

开始新的贡献前，可以将原仓库的最新代码同步到自己的 Fork：

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

再从更新后的 `main` 创建新分支：

```bash
git switch -c feat/my-change
```

## 0x03 实践 first-contributions
### 第一步：fork 项目
打开 ✨[first-contributions](https://github.com/firstcontributions/first-contributions) 项目，点击右上角 fork 到自己的账号下
![fork first-contributions 仓库](/how-to-contribute-to-open-source/01.png)
### 第二步：通过 git 拉取代码
在自己的 GitHub 主页找到刚刚 fork 的项目，然后复制代码仓库地址。在本地文件夹📂打开 git bash 把项目 clone 下来
```bash
git clone <代码仓库地址URL🔗>
```

![复制仓库地址并 git clone](/how-to-contribute-to-open-source/02.png)

### 第三步：新建代码分支
不要在 `main` 分支中进行开发

在窗口中 `cd` 切换到拉下来的项目目录下：
```bash
cd first-contributions/
```

使用 `git switch` 命令创建一个新的代码分支
```bash
git switch -c <代码分支名>

// 常见分支名
fix/svg-rendering
feat/new-theme
docs/improve-quickstart
test/config-validation
```

### 第四步：修改代码并提交修改
找到目录下的 `Contributors.md` 文件，在文件末尾加上你的名字和 GitHub Link

![在 Contributors.md 末尾添加名字](/how-to-contribute-to-open-source/03.png)

接下来就是 Git 三件套 `git status`、`git add .`、`git commit`
```bash
git status
git add Contributors.md
git commit -m "Add <你的名字> to Contributors list"
```

![git status / add / commit 提交修改](/how-to-contribute-to-open-source/04.png)

⚠️注意 `git commit -m 'massage'` 这里的 massage 其实是有提交规范的

📖相关参考资料 

>参考 http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
>
>完整提交类型列表: https://github.com/pvdlg/conventional-changelog-metahub#commit-types

### 第五步：将改动推送到仓库
使用 `git push` 命令推送代码：

```shell
git push -u origin <新分支的名称>
```

将 `<新分支的名称>` 替换为之前新建的分支名称。

![git push 推送新分支](/how-to-contribute-to-open-source/05.png)

在仓库上就可以看到这个分支了

![仓库中看到推送的分支](/how-to-contribute-to-open-source/06.png)

### 最后一步：提出 Pull Request 将你的修改供他人审阅
在仓库页面可以看到 `Compare & pull request` 按钮，点击按钮就可以创建 PR 啦~
![Compare & pull request 按钮](/how-to-contribute-to-open-source/07.png)

这里提 PR 的时候页面提示 `Can't automatically merge`，说明你的分支与当前 `main` 存在冲突。PR 仍然可以创建，但之后可能需要先同步上游代码并解决冲突。可以参考 Q&A 中的 Q3 来解决冲突，之后重新刷新页面提示就会消失。
![PR 提示存在冲突](/how-to-contribute-to-open-source/08.png)


### 等待 PR 审核 或者自动合并
first-contribution 这个仓库的 PR 是自动合并的，提交 PR 之后等一会就可以看到你的第一次 PR 啦🎉🎉🎉
![PR 自动合并成功](/how-to-contribute-to-open-source/09.png)
![第一次 PR 合并完成](/how-to-contribute-to-open-source/10.png)

### PR 合并后的收尾

当 PR 显示为 `Merged` 后，修改已经进入原仓库。此时可以把最新代码同步到本地 `main`，并更新自己 Fork 中的 `main`：

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

如果还没有配置 `upstream`，应先添加原仓库地址：

```bash
git remote add upstream https://github.com/firstcontributions/first-contributions.git
```

确认 PR 已合且当前位于 `main` 分支后，可以删除已经完成任务的本地分支：

```bash
git branch -d <新分支的名称>
```

远程分支也可以删除：

```bash
git push origin --delete <新分支的名称>
```

删除本地和远程开发分支是可选的，不会影响已经合并的 PR，也不会删除合并进原仓库的代码。保留干净的分支列表可以避免后续误用旧分支；开始下一次贡献时，应从最新的 `main` 重新创建分支。

## 0xFE Q&A

### Q1：Fork、Clone、Branch 和 Pull Request 有什么区别？

| 操作           | 发生位置       | 含义            |
| ------------ | ---------- | ------------- |
| Fork         | GitHub 服务器 | 在自己的账号下创建仓库副本 |
| Clone        | 本地电脑       | 将某个仓库下载到本地    |
| Branch       | 仓库内部       | 创建一条独立开发线     |
| Pull Request | GitHub 平台  | 请求维护者评审并合并修改  |

并非所有贡献都必须先 Fork。如果你是项目成员并拥有原仓库的写权限，通常可以直接在原仓库创建分支；外部贡献者一般采用 **Fork → Branch → Pull Request** 的方式。

### Q2：同步上游仓库的四条命令分别是什么意思？

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

这组命令用于把原仓库 `upstream` 的最新代码同步到本地 `main`，然后再更新自己的 Fork：

1. `git switch main`：切换到本地 `main` 分支，后续同步操作将在该分支上进行。
2. `git fetch upstream`：获取原仓库的最新提交和分支信息，但暂时不修改本地文件。
3. `git merge --ff-only upstream/main`：将 `upstream/main` 快进合并到本地 `main`。如果本地 `main` 有额外提交、无法快进，命令会直接失败，不会自动产生合并提交。
4. `git push origin main`：将同步后的本地 `main` 推送到自己的 Fork，即更新 `origin/main`。

整体数据流如下：

```text
原仓库 upstream/main
        ↓ fetch + merge
本地仓库 main
        ↓ push
自己的 Fork origin/main
```

执行前可用下面的命令确认远程仓库配置：

```bash
git remote -v
```

如果尚未配置 `upstream`，可以执行：

```bash
git remote add upstream https://github.com/原作者/仓库名.git
```

### Q3：开始新贡献前，原仓库更新了，而本地 `main` 和 PR 分支都是旧代码，怎么办？

先同步本地 `main`：

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

如果还没有开始修改，可以直接基于最新的 `main` 创建分支：

```bash
git switch -c feat/my-change
```

如果 PR 分支中已经有修改，则先切回该分支：

```bash
git switch feat/my-change
```

然后选择 `rebase` 或 `merge` 更新它。

#### 方案一：使用 rebase

个人独占的 PR 分支通常适合使用：

```bash
git rebase main
```

它会把 PR 分支的提交重新放到最新 `main` 后面，使提交历史保持线性。如果发生冲突，手动解决后继续：

```bash
git add 冲突文件
git rebase --continue
```

如果想取消本次 rebase：

```bash
git rebase --abort
```

如果分支此前已经推送过，由于 rebase 改写了提交历史，需要执行：

```bash
git push --force-with-lease origin feat/my-change
```

应使用 `--force-with-lease`，不要直接使用 `--force`。当前者发现远端出现本地未知的新提交时，会拒绝覆盖。

#### 方案二：使用 merge

多人共同开发的 PR 分支，或者不希望改写提交历史时，可以执行：

```bash
git merge main
git push origin feat/my-change
```

这种方式不需要强制推送，但可能产生额外的合并提交。

选择建议：

- 个人独占的 PR 分支：通常使用 `rebase`；
- 多人共同开发的 PR 分支：通常使用 `merge`；
- 项目贡献文档有明确要求：以项目规定为准；
- 不熟悉 rebase 或担心改写历史：优先使用 `merge`。

更新并推送原 PR 分支后，GitHub 上已有的 PR 会自动更新，不需要重新创建。如果上游变化与当前修改无关，并且 GitHub 显示 PR 仍可自动合并，通常不必频繁同步；出现冲突或维护者要求更新时再处理即可。

## 0xFF 总结
说来惭愧，这还是第一次参与开源项目的 PR 流程，中间也遇到过很多问题，所以想着记录下来方便大家完成人生的第一次开源项目 PR ，也是顺带复习 Git 操作了哈哈哈哈。看到自己的名字出现在开源项目中还是很有赛博留名的成就感的😊✨
