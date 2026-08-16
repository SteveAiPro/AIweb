大家好，我是AI搞钱Hacker

---

用 AI 写代码接 Google Search Console API，从零到跑通，踩了 6 个坑，全程没写一行手写 Google 文档。

先说结论：**AI 写代码不是魔法，但用对方法，效率和体验是质的飞跃。**

我做的事很简单——让 AI 帮我在本地搭一套 GSC API，实现「聊天式数据分析」。我跟 AI 说「分析一下最近 28 天的搜索数据」，它后台拉数据，直接分析给我。

听起来简单对吧？实际过程是这样的 👇

---

**坑 1 —— OAuth 不是有 credentials 就行**

我手头只有一个 `credentials.json`（OAuth 客户端凭据），以为有了它就能直接拉数据。AI 明确告诉我：不行，这只是应用身份，没有 `refresh_token`，等于有钥匙坯没配钥匙。

需要真人用 Google 账号授权一次，才能拿到 token。

**很多人卡在这一步就开始蒙了。** AI 直接帮我写好了完整的 OAuth 授权脚本，包括本地服务器捕获回调、token 存取、自动刷新。我只需要在浏览器里点一下「同意」就行。

---

**坑 2 —— Google 403，因为测试用户没加**

打开授权链接，Google 报 `access_denied`。AI 一眼看出：这个应用是 Testing 模式，`gaoqian2580@gmail.com` 不在测试用户白名单里。

让我去 Google Cloud Console → OAuth consent screen → Test users 里加上这个邮箱。

**这里有个细节很容易漏：** 新版 Google Auth Platform 把「测试用户」功能藏在了「受众群体」页面里，而不是设置页。AI 一步步截图告诉我点哪里，每次我发截图，它都能对着界面告诉我要点哪个按钮。

这就是 AI 调试的魅力——**不需要翻文档，直接把问题甩给它，它能对着你的实际页面给出答案。**

---

**坑 3 —— 国内网络，oauth2.googleapis.com 连不上**

授权回调拿到了验证码，但换 token 的时候超时：
```
ConnectTimeoutError: oauth2.googleapis.com:443, timeout: 10000ms
```

根因：国内直连 Google API 被墙。

AI 的方案：用 `HTTPS_PROXY` 环境变量走代理。我的 Clash 端口是 7897，直接 `HTTPS_PROXY=http://127.0.0.1:7897 node xxx`。

---

**坑 4 —— Node.js 原生 fetch + undici ProxyAgent 不兼容**

加上代理后还是超时。AI 意识到 Node.js 26 把 `undici` 内置了但**不导出为独立模块**，`require('undici')` 实际上找不到包。`catch` 悄悄吞掉了错误，代理根本没生效。

解法：安装 `npm install undici`，用 `createRequire` 在 ESM 环境下加载。

终于通了——代理生效了，但返回的是乱码 `"��"`。

---

**坑 5 —— undici ProxyAgent 和 Clash HTTP 代理不兼容**

这是最隐蔽的一个坑。undici 的 ProxyAgent 走 HTTPS CONNECT 隧道时，和 Clash 的 HTTP 代理配合有问题，返回二进制乱码。

AI 的方案：**放弃 undici，改用 `https-proxy-agent` + Node 原生 `https` 模块。**

这意味着要重写整个请求层——从 `fetch(url, { dispatcher })` 改成 `https.request({ agent })` 的 Promise 封装。AI 在几个文件里做了完整替换，一个函数调用都没漏。

这要是自己改，光翻文档就得半小时——AI 10 秒搞完。

---

**坑 6 —— 端口冲突**

回调端口 3000 被 Next.js 开发服务器占了，改成 8787 还要记得在 Google Cloud Console 里也加上这个 redirect URI。

---

**跑了 30 分钟，终于通了。**

这是我的真实 GSC 数据（拉取成功的第一个查询）：

```
站点: gaoqian2580.com
权限: siteOwner

最近 28 天：
  xianyu-slang 工具页: 4 次点击, 平均排名 18
  video-downloader: 14 次展示, 平均排名 67
  echo-studio / pixel-bloom / red-generator 等 AI 工具: 有展示无点击
```

一个刚起步的 AI 工具导航站，数据还很小，但有了这套系统，以后每次想分析数据，我跟 AI 说一句就行了：

> 「最近一周哪个页面排名在涨？」
> 「对比一下这个月和上个月的点击量」
> 「哪些关键词有展示但排名太差需要优化？」

**不需要打开 GSC 网页，不需要手动翻报表，聊天就能搞定。**

---

**几个关键 takeaways：**

1. **把 AI 当搭档，不是搜索引擎。** 不要说「GSC API 怎么接」，要说「我有这个 credentials.json，帮我搭一套能聊天拉数据的系统」。前者给你文档链接，后者给你能跑的代码。

2. **遇到报错，截图 + 复制错误信息一起给 AI。** 这个 403 debug 如果有截图没复制错误文本，AI 能蒙对一半；只有文本没有截图，AI 不知道你点到了哪个页面。两样一起给，定位速度快 10 倍。

3. **代理问题是国内开发的基建问题，不要让 AI 猜你用什么代理。** 直接说「我用 Clash，端口 7897」，它能针对性地选方案，不会在 SOCKS5、HTTP、PAC 之间浪费来回。

4. **undici ProxyAgent 这个坑，我估计 90% 的人都会踩。** 如果你在国内用 Node.js 走代理调 Google API，直接用 `https-proxy-agent`，别纠结 undici。

5. **数据连接到 AI 之后，分析就变成了对话。** 这是最有价值的部分——不是「查数据」，而是「聊数据」。你的一句需求，AI 转化为 API 查询 + 数据分析，输出你直接就看。

---

整个过程中，我做的事情：
- 复制粘贴 OAuth 凭据文件
- 在 Google Cloud Console 加了测试用户 + redirect URI
- 在终端执行了几条命令
- 告诉了 AI 我的代理端口

**仅此而已。** 其余所有代码——OAuth 流程、token 管理、API 封装、代理适配、命令行工具——都是 AI 写的。

这不是 AI 替代程序员，这是**一个懂技术的人配上 AI，效率翻了 10 倍。**

AI 时代的开发者，最值钱的能力不是记住 API 参数，而是**精准描述需求 + 快速诊断问题 + 知道该问什么。**

---

看到这里的朋友，觉得有用可以点个关注，后续会持续更新 AI 实用教程，搞钱干货。

有任何配置问题、使用问题，都可以在评论区留言，我看到都会一一回复！
