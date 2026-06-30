---
title: OpenCode GO 接入 CC Switch 指南
outline: deep
---

## 0x00 前置说明

> OpenCode GO 是什么？
- 是一项低成本订阅服务，**第一个月 5 美元**，之后每个月 10 美元。
- Pros：
  - 集合了国内顶尖模型，GLM-5.2，Kimi K2.7 Code，MiniMax M3，Qwen 3.7 系列，DeepSeek V4 系列
  - 不用自己去官网抢 Coding Plan
  - 计费按照「时间段+金额」来限制，类似 ChatGPT Plus
  - 支持支付宝付款（现在想要比较好的 Ai 订阅服务体验，可以自己办一张 visa/万事达卡，在校可以办工行星座卡校园版，在职可以办招行万事达普卡）
    ![支付宝付款入口](/opencode-go-ccw/01.png)
- Cons：
  - 国产模型没有 Opus、ChatGPT 聪明，但比较适合干枯燥、重复的日常工作

---

## 0x01 获取 OpenCode GO 套餐

我的注册邀请链接，通过链接**注册并且订阅**后，您和我都可以获得 $5，这样下个月续费也是 $5

> [https://opencode.ai/go?ref=NWXQQCNRB9](https://opencode.ai/go?ref=NWXQQCNRB9)

订阅时，可以选择支付宝支付

订阅完，获取到 API key

---

## 0x02 确保 CC Switch 是最新版

目前最新版 CC Switch 是 v3.16.3，「2026/06/26」

![CC Switch v3.16.3 版本](/opencode-go-ccw/02.png)

---

## 0x03 在 CC Switch 中配置本地路由

![CC Switch 本地路由配置](/opencode-go-ccw/03.png)

---

## 0x04 配置自己的 API key

点击 CC Switch 右上角添加按钮，选择 OpenCode Go 供应商

![选择 OpenCode Go 供应商](/opencode-go-ccw/04.png)

填入 API Key，API 格式选择 OpenAI Chat Completions 需要开启路由

![填入 API Key 并开启路由](/opencode-go-ccw/06.png)

配置对话模型，点击添加

![配置对话模型](/opencode-go-ccw/05.png)

---

## 0x05 开始使用

在左上角开启路由，使用 OpenCode Go，打开终端即可开始对话啦

![开启路由开始使用](/opencode-go-ccw/07.png)
