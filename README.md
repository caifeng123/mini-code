# 手写各类mini工具库

## 框架介绍
个人搭建的企业级monorepo框架

- 使用pnpm进行monorepo管理
  - 设定 `pnpm-workspace.yaml` 工作区
- ts编写，tsconfig进行总管全体配置
  - 各个项目中的 `tsconfig` 需要进行extends根目录配置，因为对于各个库的打包需求是不同的，因此需要进行配置
  - 需要根目录安装 `typescript` 
- 使用eslint进行代码校验统一，配合上 `*.code-workspace` 设置进行保存自动格式化
  - 理论上 `*.code-workspace` 不应该提交上git，但为后续可以直接搬，因此本项目提交
    - 关闭vscode自带设置的保存编辑 `editor.formatOnSave`
    - 开启 `editor.codeActionsOnSave:{source.fixAll.eslint}` 按照eslint规则进行自动格式化
  - 使用业内 `airbnb` 的eslint配置，可按要求替换为自己厂内/组内配置需求
  - 需要配置指向 根目录配置的 `tsconfig.json` 用于解析项目级ts规则
  - 需要根目录安装 ：
    - `eslint` eslint库
    - `@typescript-eslint/parser @typescript-eslint/eslint-plugin` 解析ts语法库
    - `eslint-config-airbnb-typescript` airbnb配置
    - `eslint-plugin-import` 检查 ES6 的 import/export 语法，并防止在项目中发生文件路径和导入名字的错误的 ESLint 插件
