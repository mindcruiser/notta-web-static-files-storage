# notta-web-static-files-storage
用于Notta Web项目存放静态文件，提供CDN链接



使用 jsdelivr 转为外部**CDN**链接 👉 https://www.jsdelivr.com/?docs=gh



jsdelivr：

- 加载任何 GitHub 版本、提交或分支
- 建议支持 npm 的项目使用 npm

用法：

```js
// https://cdn.jsdelivr.net/gh/user/repo@version/file

// 示例：用于PDF的字体文件
// https://cdn.jsdelivr.net/gh/mindcruiser/notta-web-static-files-storage@v1.0.0/js/mplus1p-regular-normal.js
```

分为： jsdelivr域名地址 + 组织名 + 项目名 + 版本号 + 目录名 + 文件名
