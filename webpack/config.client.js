const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  const mainEntry = ['./src/client/index.tsx']

  if (!isProd) {
    mainEntry.unshift(
      'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&noInfo=true'
    )
  }
  return {
    mode: 'development',
    target: 'web',
    entry: {
      main: mainEntry,
    },
    output: {
      path: path.resolve(__dirname, '../dist/client'),
      filename: 'bundle-[hash].js',
      chunkFilename: '[id][chunkhash].js',
      publicPath: 'http://localhost:3001/',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: !isProd,
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  // modifyVars: require('./antd.global'),
                  javascriptEnabled: true,
                  paths: [path.resolve(__dirname, 'node_modules')],
                  sourceMap: !isProd,
                },
              },
            },
          ],
        },
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: '> 0.5%, not dead', useBuiltIns: 'entry', corejs: 3 },
                ],
                ['@babel/preset-react'],
                [
                  '@babel/preset-typescript',
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true, // `style: true` 会加载 less 文件
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new AssetsPlugin({
        filename: './dist/server/assets.json',
        // fileTypes: ['js', 'css', 'jpg'],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: !isProd ? 'cheap-module-source-map' : 'hidden-cheap-module-source-map',
  }
}
