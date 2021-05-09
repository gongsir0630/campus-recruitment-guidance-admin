<h1 align="center">柚子帮-校招指导服务平台</h1>
<p align="center">web后台管理端</p>

## 前言
这里是我的本科毕业设计,建设一个方便、快捷、能有效联系在校毕业生和已就业师兄师姐的在线校招指导服务平台——『柚子帮』，并完成系统的设计与开发.平台致力于为西柚学子提供校招指导服务，提高毕业生在校招季的求职效率。

整个平台包含`微信小程序端`和`web管理端`两部分,项目开发采用前后端分离,这里是微信小程序端项目工程,基于 `Uni-app` 搭建,使用 Vue 开发.

涉及的技术栈：
* element-ui 饿了么出品的vue2.0 pc UI框架
* axios 一个现在主流并且很好用的请求库 支持Promise
* js-cookie 一个轻量的JavaScript库来处理cookie
* normalize.css 格式化css
* nprogress 轻量的全局进度条控制
* vuex 官方状态管理
* vue-router 官方路由

## Build Setup

```bash
# 克隆项目
git clone https://github.com/gongsir0630/campus-recruitment-guidance-admin.git

# 进入项目目录
cd campus-recruitment-guidance-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
## 感谢
个人主攻 Java 后端研发领域，第一次真正意义上的做前端开发，一边学习一边推项目进度。特别感谢以下同学的指导和帮助：
* [粥里有勺糖](https://github.com/ATQQ)
