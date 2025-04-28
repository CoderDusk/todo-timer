# Todo Timer 待办计时器

一个基于 Vue + uView UI 开发的待办事项计时器应用，支持单次计时和循环计时功能，并内置多种提示音效。

## ✨ 功能特点

- 🕒 单次计时器：设置单个任务的计时提醒
- 🔄 循环计时器：支持多个任务的循环计时
- 🌍 国际化支持：内置中英文语言切换
- 🎵 多种提示音效：包含鸟鸣、时钟、叮咚等音效
- 📱 响应式设计：完美适配移动端

## 🔍 预览

推荐使用移动端设备访问，或在桌面端以移动设备模拟模式查看：

[在线预览](https://tools.coderdusk.com/todo-timer/#/)

## 📸 界面预览

<table>
<tr>
<td><img src="https://camo.githubusercontent.com/907fcac83c48397a770cad00e5efcb66f4e921868e42be16abd3a45c9a37f9d2/68747470733a2f2f7778312e73696e61696d672e636e2f6c617267652f3030375a34317054677931676d65317168716d67766a3330753031726b646c712e6a7067" height="300" alt="设置单次计时器" /></td>
<td><img src="https://camo.githubusercontent.com/f8186e634211541292b93e9215974fe2fff4fb8ce1c792816b11681cd106da79/68747470733a2f2f7778332e73696e61696d672e636e2f6c617267652f3030375a34317054677931676d6531716b646e38366a3330753031726b307a332e6a7067" height="300" alt="循环计时器" /></td>
</tr>
</table>

## 🛠️ 技术栈

- Vue.js - 渐进式 JavaScript 框架
- uView UI - uni-app 生态优秀的 UI 框架
- uni-app - 跨平台前端应用框架
- Vue I18n - Vue.js 的国际化插件

## 📦 项目结构

```
├── common/          # 公共工具类
│   ├── lang.js      # 国际化语言配置
│   ├── time.js      # 时间处理工具
│   └── tools.js     # 通用工具函数
├── components/      # 组件目录
├── pages/          # 页面目录
├── static/         # 静态资源
│   └── ringtone/   # 提示音效文件
└── mixin/          # 混入功能
```

## 🚀 快速开始

1. 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 通过 HBuilderX 导入项目
3. 点击运行到内置浏览器或手机模拟器

## 📝 开发说明

- 项目使用 Vue.js 2.x 版本开发
- 使用 uView UI 组件库构建界面
- 支持 i18n 国际化
- 内置多种提示音效供选择

