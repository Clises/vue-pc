vue项目中资源路径问题

在引入资源时使用，别名alias，vue init webpack生成的项目在build/webpack.base.conf.js文件中进行更改,也可进行其他的定义
```javascript
alias: {
  'vue$': 'vue/dist/vue.esm.js', // 默认的
  '@': resolve('src'),  // 默认的，可自定义
}
```
