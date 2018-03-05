const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BUILD_DIR = path.join(__dirname, '../public/dist');
const publicPath = '/dist';


module.exports = {
  entry: {
    app: './src/js/App.jsx',
    react: [
      'react',
      'react-dom',
      'react-router',
    ],
    vendor: [
      'react-redux',
      'redux-thunk',
      'redux'
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  output: {
    path: BUILD_DIR,
    filename: "js/[name]-[chunkhash].js",
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'webpack-conditional-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'webpack-conditional-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR], {
      verbose: true,
      exclude: ['json'],
      allowExternal: true,
      beforeEmit: true
    }),
    new HTMLPlugin({
      title: 'findPool',
      filename: 'index.html',
      inject: true,
      hash: true,
      xhtml: true,
      template: './index.ejs',
      chunks: ['react', 'vendor', 'app'],
    }),
  ]
};
