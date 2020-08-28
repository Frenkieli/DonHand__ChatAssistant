/* webpack.config.js ： Webpack 的設定檔 */
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const serverConfig = {
  target: 'node',
  devtool: 'eval-source-map',
  node: {
    __dirname: false,
    __filename: true,
  },
  externals: [nodeExternals()],
  entry: {
    'index': path.join(__dirname, 'src/index.ts')
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
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // plugins: [
  //   new CopyPlugin({
  //     patterns: [
  //       { from: path.join(__dirname, 'src/client/views'), to: path.join(__dirname, 'dist/views') },
  //       { from: path.join(__dirname, 'src/client/static'), to: path.join(__dirname, 'dist/public') },
  //     ]
  //   })
  // ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@@': path.resolve('./src'),
      '@@config': path.resolve('./src/config'),
      '@@controller': path.resolve('./src/server/controller'),
      '@@models': path.resolve('./src/server/models'),
      '@@routes': path.resolve('./src/server/routes'),
      '@@interData': path.resolve('./src/server/interface/data'),
      '@@interModules': path.resolve('./src/server/interface/modules'),
    }
  },
}

const clientConfig = {
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    'index': './src/client/main.js',
  },
  output: {
    path: path.join(__dirname, 'dist/public/javascripts'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/client/views'), to: path.join(__dirname, 'dist/views') },
        { from: path.join(__dirname, 'src/client/static'), to: path.join(__dirname, 'dist/public') },
      ]
    })
  ],
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.vue$/,
        loader: [
          {
            loader: 'vue-loader',
            // options: {
            //   compilerOptions: {
            //     preserveWhitespace: false
            //   },
            // }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name][hash].[ext]',
          outputPath: path.join(__dirname, 'dist/public/images'),
          esModule: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.scss|\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: './src/client/scss/global.scss',
            },
          },
        ]
      },
    ],
  },
  resolve: {
    alias: {
      '@@': path.resolve('./src/client')
    },
    extensions: [
      ".webpack.js",
      ".web.js",
      ".js",
      // 上面是預設值
      ".vue",
      ".scss",
    ]
  },
  optimization: {
    minimize: true,
  }
}



module.exports = [serverConfig, clientConfig];
// module.exports = [serverConfig];