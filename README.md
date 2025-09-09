# vue-admin

> 基于vue-admin-template的二次定制脚手架，去掉了一些繁琐的东西，升级了一些包
**Live demo:** http://panjiachen.github.io/vue-admin-template

# 项目目录

固定的抽象方式： 语义化 + 增加可维护性

# 关键文件

1. package.json
    script 可执行的命令 自定义
    生产依赖 npm i axios 参与打包 运行浏览器
    开发依赖 npm i sass -D 不参与打包 开发阶段生效

2. main.js
    不写业务代码 全局初始化的事情 初始化第三方组件/样式初始化/store/router

3. 组件化的开发模式 组件树

4. vueRouter
    一级和二级如何配置

5. vuex
    1. 模块化 namespaced modules{子模块}
    2. 和数据相关的所有的操作都放到vuex中维护+组件只做一个事情触发action


# request.js + apis

1. request会产生一个实例对象给每个api函数使用 一对多的关系 request配置所有的api函数都会跟着生效

2. axios基础封装
    1. 实例化 baseURL+timeout
    2. 请求拦截器 token注入
    3. 响应拦截器 401状态判断+数据剥离

# 登录

1. 业务模式
    1. 表单基础校验
    2. 表单统一校验
    3. 后续的业务处理（调用接口-token-存入token-跳转首页-提示用户）

2. 表单校验
    1. 通过devtools查看双向绑定是否成功
    2. 对照接口文档查看和接口参数要求是否一致
    3. 校验时机实施校验和统一校验都需要

3. token管理
    1. 多模块共享 vuex维护
    2. 管理方式 vuex + cookie（localstorage保证刷新不丢失）
        2.1 cookie与ls区别
            存储空间大小
            是否允许后端操作
            是否跟随接口发送

