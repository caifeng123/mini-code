# 手写各类mini工具库

## 框架介绍
详细请看 [monorepo-frame](https://github.com/caifeng123/monorepo-frame)：`pnpm + monorepo + ts + eslint + prettier + lint-staged + git hook`

## mini-code列表

> 每个项目的关键点总结

### [mini-koa](https://github.com/caifeng123/mini-code/tree/master/packages/mini-koa)

- 使用原生http模块实现
- reduceRight中间件洋葱圈compose增强
- req、res注入信息

### [mini-webpack](https://github.com/caifeng123/mini-code/tree/master/packages/mini-webpack)

- tapable 插件机制
- 加载图构建
- plugin：entry、output实现
- 模板生成，`__webpack_require__ ` 浏览器端 cjs实现