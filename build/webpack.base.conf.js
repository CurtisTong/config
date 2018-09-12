'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const setting = require('../config');
const {
  env
} = require('process');

const isDev = env.NODE_ENV === 'development' ? true : false;

const config = {
  context: path.resolve('src'),
  entry: {
    polyfills: path.resolve('src/polyfills.jsx'),
    index: path.resolve('src/index.jsx'),
  },

  output: {
    publicPath: isDev ? setting.dev.publicPath : setting.build.publicPath,
    path: path.resolve('dist'),
    filename: 'js/[name].[hash:4].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          // 'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            }
          }  
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.s?css$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve('src'),
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Edog',
      path: path.resolve('dist'),
      template: path.resolve('src/index.html'),
    })
  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  optimization: {
    noEmitOnErrors: true,
    // splitChunks: {
    //   // runtimeChunk: 'single',
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     }
    //   }
    // },
  }
}

module.exports = config;