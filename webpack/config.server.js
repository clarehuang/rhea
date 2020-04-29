const path = require('path')
const nodeExternals = require('webpack-node-externals')
// const { getWebpackDefinePlugin } = require('./utils')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-warnings',
    target: 'node',
    watch: !isProd,
    externals: [nodeExternals()],
    entry: './src/components/app.tsx',
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'app.js',
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'ignore-loader',
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
                ['@babel/preset-env', { targets: { node: 'current' } }],
                ['@babel/preset-react'],
                [
                  '@babel/preset-typescript',
                  {
                    isTSX: true,
                    allExtensions: true,
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
  }
}
