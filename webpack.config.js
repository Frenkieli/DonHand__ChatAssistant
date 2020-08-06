/* webpack.config.js ： Webpack 的設定檔 */
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const serverConfig = {
  target: 'node',
  devtool: 'eval-source-map',
  node: {
    __dirname: false,
    __filename: true,
  },
  externals: [nodeExternals()],
  entry: {
    'index': path.join(__dirname, 'src/index.js'),
    // 'public/javascripts/temibroad': './src/client/typescript/temibroad/temibroad.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/client/views'), to: path.join(__dirname, 'dist/views') },
        { from: path.join(__dirname, 'src/client/static'), to: path.join(__dirname, 'dist/public') },
      ]
    })
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    alias: {
      '@@': path.resolve('./src'),
    }
  },
}

// const clientConfig = {
//   target: 'web',
//   devtool: 'eval-source-map',
//   node: {
//     __dirname: false,
//     __filename: true,
//   },
//   externals: [nodeExternals()],
//   entry: {
//     // 'index': './src/index.js',
//     'public/javascripts/temibroad': './src/client/typescript/temibroad/temibroad.ts'
//   },
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name].bundle.js',
//     libraryTarget: 'commonjs2',
//   },
//   module: {   //設定你的檔案選項
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: 'babel-loader'
//       },
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ],
//   },
//   plugins: [
//     new CopyWebpackPlugin([
//       { from: 'src/client/views', to: 'views' },
//       { from: 'src/client/static', to: 'public' },
//     ])
//   ],
//   optimization: {
//     minimize: true,
//   }
// }



// module.exports = [serverConfig, clientConfig];
module.exports = [serverConfig];