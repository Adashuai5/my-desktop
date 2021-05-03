const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: './src/index.tsx',
    typings: './typings/react-desktop.d.ts'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              query: {
                presets: ['esnext', 'react']
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ico|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              query: {
                // 阈值 单位byte
                limit: '8192',
                name: 'images/[name]_[hash:7].[ext]'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  devServer: {
    hot: true,
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    overlay: true, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true //是否启用 gzip 压缩
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      react: 'React',
      'react-dom': 'ReactDOM'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
