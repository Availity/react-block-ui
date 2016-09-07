var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  target: 'node',
  context: path.join(__dirname, './src'),
  devtool: '#cheap-module-source-map',
  entry: {
    'react-block-ui': ['./index.js']
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(json)$/,
        loaders: [
          'json-loader?cacheDirectory'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory'
        ]
      },
    ]
  },
  resolve: {
    alias: {
      'react-block-ui': path.resolve('./src')
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  output: {
    devtoolModuleFilenameTemplate        : '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  webpackServer: {
    noInfo: true,
  },
};

module.exports = webpackConfig;
