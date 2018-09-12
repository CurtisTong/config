const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:4].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJSPlugin({
      uglifyOptions: {
        ie8: true,
        keep_fnames: true
      }
    }),]
  }
}
const prodConfig = merge(baseConfig, config);
module.exports = prodConfig;