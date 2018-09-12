const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const setting = require('../config');

const config = {
  devtool: setting.dev.devtool,
  mode: 'development',
  devServer: {
    compress: true,
    hot: true,
    port: setting.dev.port || 8080,
    proxy: setting.dev.proxy || {},
    host: setting.dev.host || 'localhost',
    open: setting.dev.autoOpenBrowser || true, // open browser
    overlay: setting.dev.errorOverlay ? { warnings: false, errors: true } : false, // 错误遮罩警告
    quiet: true,
    watchOptions: {
      poll: setting.dev.poll
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
const devConfig = merge(baseConfig, config);
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 设置新端口
      process.env.PORT = port
      // 端口占用设置新端口
      devConfig.devServer.port = port
      // 错误信息错误展示
      devConfig.plugins.push(new FriendlyErrors({
        compilationSuccessInfo: {
          messages: [`项目运行地址: http://${devConfig.devServer.host}:${port}`],
        }
      }))
      resolve(devConfig)
    }
  })
})