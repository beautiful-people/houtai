module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir:"dist",
    devServer: { // webpack 的一个插件，搭建本地服务器
    proxy: { // 反向代理
      '/api': {
        target: 'http://172.16.6.44:8080', // 服务器地址
        pathRewrite: {
          '^/': '' // 以 /api 开头的地址替换为 ''
        },
        changeOrigin: true // 本地会虚拟一个服务端接收你的请求并代你发送该请求
      }
    }
  }
}